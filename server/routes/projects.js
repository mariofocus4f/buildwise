const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;
    
    // Build query
    let query = { isActive: true };
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'client.name': { $regex: search, $options: 'i' } }
      ];
    }
    
    // User can only see projects they're involved in (unless admin)
    if (req.user.role !== 'admin') {
      query.$or = [
        { projectManager: req.user._id },
        { 'team.user': req.user._id },
        { createdBy: req.user._id }
      ];
    }

    const projects = await Project.find(query)
      .populate('projectManager', 'firstName lastName email')
      .populate('team.user', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      count: projects.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('projectManager', 'firstName lastName email phone')
      .populate('team.user', 'firstName lastName email phone')
      .populate('createdBy', 'firstName lastName email')
      .populate('documents')
      .populate('tasks');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user has access to this project
    if (req.user.role !== 'admin') {
      const hasAccess = 
        project.projectManager._id.toString() === req.user._id.toString() ||
        project.team.some(member => member.user._id.toString() === req.user._id.toString()) ||
        project.createdBy._id.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this project'
        });
      }
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
router.post('/', protect, [
  body('name').trim().notEmpty().withMessage('Project name is required'),
  body('description').optional().trim(),
  body('address.street').trim().notEmpty().withMessage('Street address is required'),
  body('address.city').trim().notEmpty().withMessage('City is required'),
  body('address.postalCode').trim().notEmpty().withMessage('Postal code is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('projectManager').isMongoId().withMessage('Valid project manager is required'),
  body('client.name').trim().notEmpty().withMessage('Client name is required')
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

    const projectData = {
      ...req.body,
      createdBy: req.user._id
    };

    const project = await Project.create(projectData);

    await project.populate('projectManager', 'firstName lastName email');
    await project.populate('createdBy', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during project creation'
    });
  }
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user can update this project
    if (req.user.role !== 'admin' && 
        project.projectManager.toString() !== req.user._id.toString() &&
        project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this project'
      });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .populate('projectManager', 'firstName lastName email')
    .populate('team.user', 'firstName lastName email')
    .populate('createdBy', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during project update'
    });
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin or Project Manager)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user can delete this project
    if (req.user.role !== 'admin' && 
        project.projectManager.toString() !== req.user._id.toString() &&
        project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this project'
      });
    }

    // Soft delete
    project.isActive = false;
    await project.save();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during project deletion'
    });
  }
});

// @desc    Add team member to project
// @route   POST /api/projects/:id/team
// @access  Private
router.post('/:id/team', protect, [
  body('user').isMongoId().withMessage('Valid user ID is required'),
  body('role').isIn(['architect', 'engineer', 'contractor', 'supervisor', 'worker'])
    .withMessage('Valid role is required')
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

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user can modify team
    if (req.user.role !== 'admin' && 
        project.projectManager.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify team'
      });
    }

    const { user, role } = req.body;

    // Check if user is already in team
    const existingMember = project.team.find(member => 
      member.user.toString() === user
    );

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'User is already in the team'
      });
    }

    project.team.push({ user, role });
    await project.save();

    await project.populate('team.user', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Team member added successfully',
      data: project.team
    });
  } catch (error) {
    console.error('Add team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Remove team member from project
// @route   DELETE /api/projects/:id/team/:userId
// @access  Private
router.delete('/:id/team/:userId', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user can modify team
    if (req.user.role !== 'admin' && 
        project.projectManager.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify team'
      });
    }

    project.team = project.team.filter(member => 
      member.user.toString() !== req.params.userId
    );

    await project.save();

    res.json({
      success: true,
      message: 'Team member removed successfully',
      data: project.team
    });
  } catch (error) {
    console.error('Remove team member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

