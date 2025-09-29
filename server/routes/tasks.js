const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { 
      project, 
      status, 
      priority, 
      assignedTo, 
      category,
      page = 1, 
      limit = 10,
      search 
    } = req.query;
    
    // Build query
    let query = { isActive: true };
    
    if (project) query.project = project;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;
    if (category) query.category = category;
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    // User can only see tasks from projects they're involved in (unless admin)
    if (req.user.role !== 'admin') {
      const userProjects = await Project.find({
        $or: [
          { projectManager: req.user._id },
          { 'team.user': req.user._id },
          { createdBy: req.user._id }
        ]
      }).select('_id');
      
      const projectIds = userProjects.map(p => p._id);
      query.project = { $in: projectIds };
    }

    const tasks = await Task.find(query)
      .populate('project', 'name status')
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('dependencies', 'title status')
      .sort({ dueDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Task.countDocuments(query);

    res.json({
      success: true,
      count: tasks.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: tasks
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'name status projectManager team')
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .populate('dependencies', 'title status dueDate')
      .populate('comments.user', 'firstName lastName email');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user has access to this task's project
    if (req.user.role !== 'admin') {
      const project = task.project;
      const hasAccess = 
        project.projectManager._id.toString() === req.user._id.toString() ||
        project.team.some(member => member.user._id.toString() === req.user._id.toString()) ||
        project.createdBy._id.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this task'
        });
      }
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
router.post('/', protect, [
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('description').optional().trim(),
  body('project').isMongoId().withMessage('Valid project ID is required'),
  body('assignedTo').isMongoId().withMessage('Valid assigned user ID is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('dueDate').isISO8601().withMessage('Valid due date is required'),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('category').optional().isIn(['foundation', 'structure', 'electrical', 'plumbing', 'hvac', 'finishing', 'inspection', 'safety', 'other'])
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Verify project exists and user has access
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user can create tasks for this project
    if (req.user.role !== 'admin') {
      const hasAccess = 
        project.projectManager.toString() === req.user._id.toString() ||
        project.team.some(member => member.user.toString() === req.user._id.toString()) ||
        project.createdBy.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to create tasks for this project'
        });
      }
    }

    const taskData = {
      ...req.body,
      createdBy: req.user._id
    };

    const task = await Task.create(taskData);

    await task.populate('project', 'name status');
    await task.populate('assignedTo', 'firstName lastName email');
    await task.populate('createdBy', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during task creation'
    });
  }
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id).populate('project');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user can update this task
    if (req.user.role !== 'admin') {
      const project = task.project;
      const hasAccess = 
        project.projectManager._id.toString() === req.user._id.toString() ||
        project.team.some(member => member.user._id.toString() === req.user._id.toString()) ||
        task.assignedTo.toString() === req.user._id.toString() ||
        task.createdBy.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this task'
        });
      }
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .populate('project', 'name status')
    .populate('assignedTo', 'firstName lastName email')
    .populate('createdBy', 'firstName lastName email')
    .populate('dependencies', 'title status');

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during task update'
    });
  }
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user can delete this task
    if (req.user.role !== 'admin') {
      const project = task.project;
      const hasAccess = 
        project.projectManager._id.toString() === req.user._id.toString() ||
        project.team.some(member => member.user._id.toString() === req.user._id.toString()) ||
        task.createdBy.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this task'
        });
      }
    }

    // Soft delete
    task.isActive = false;
    await task.save();

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during task deletion'
    });
  }
});

// @desc    Add comment to task
// @route   POST /api/tasks/:id/comments
// @access  Private
router.post('/:id/comments', protect, [
  body('text').trim().notEmpty().withMessage('Comment text is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const task = await Task.findById(req.params.id).populate('project');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user has access to this task
    if (req.user.role !== 'admin') {
      const project = task.project;
      const hasAccess = 
        project.projectManager._id.toString() === req.user._id.toString() ||
        project.team.some(member => member.user._id.toString() === req.user._id.toString()) ||
        task.assignedTo.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to comment on this task'
        });
      }
    }

    task.comments.push({
      user: req.user._id,
      text: req.body.text
    });

    await task.save();

    await task.populate('comments.user', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Comment added successfully',
      data: task.comments
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update task progress
// @route   PUT /api/tasks/:id/progress
// @access  Private
router.put('/:id/progress', protect, [
  body('progress').isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user can update progress
    if (req.user.role !== 'admin' && 
        task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task progress'
      });
    }

    task.progress = req.body.progress;
    
    // Auto-complete task if progress is 100%
    if (req.body.progress === 100 && task.status !== 'completed') {
      task.status = 'completed';
      task.completedDate = new Date();
    }

    await task.save();

    res.json({
      success: true,
      message: 'Task progress updated successfully',
      data: task
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
