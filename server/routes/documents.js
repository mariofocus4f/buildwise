const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { body, validationResult } = require('express-validator');
const Document = require('../models/Document');
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'text/plain',
      'application/zip'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// @desc    Get all documents
// @route   GET /api/documents
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { 
      project, 
      category, 
      type,
      page = 1, 
      limit = 10,
      search 
    } = req.query;
    
    // Build query
    let query = { isActive: true };
    
    if (project) query.project = project;
    if (category) query.category = category;
    if (type) query['file.mimeType'] = { $regex: type, $options: 'i' };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // User can only see documents from projects they're involved in (unless admin)
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

    const documents = await Document.find(query)
      .populate('project', 'name status')
      .populate('uploadedBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Document.countDocuments(query);

    res.json({
      success: true,
      count: documents.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: documents
    });
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single document
// @route   GET /api/documents/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id)
      .populate('project', 'name status projectManager team')
      .populate('uploadedBy', 'firstName lastName email');

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if user has access to this document's project
    if (req.user.role !== 'admin') {
      const project = document.project;
      const hasAccess = 
        project.projectManager._id.toString() === req.user._id.toString() ||
        project.team.some(member => member.user._id.toString() === req.user._id.toString()) ||
        project.createdBy._id.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this document'
        });
      }
    }

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Upload document
// @route   POST /api/documents/upload
// @access  Private
router.post('/upload', protect, upload.single('file'), [
  body('title').trim().notEmpty().withMessage('Document title is required'),
  body('project').isMongoId().withMessage('Valid project ID is required'),
  body('category').isIn(['plans', 'permits', 'contracts', 'invoices', 'photos', 'reports', 'certificates', 'manuals', 'other'])
    .withMessage('Valid category is required'),
  body('description').optional().trim()
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

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
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

    // Check if user can upload documents to this project
    if (req.user.role !== 'admin') {
      const hasAccess = 
        project.projectManager.toString() === req.user._id.toString() ||
        project.team.some(member => member.user.toString() === req.user._id.toString()) ||
        project.createdBy.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to upload documents to this project'
        });
      }
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: `buildwise/documents/${req.body.project}`,
          public_id: `${Date.now()}_${req.file.originalname.split('.')[0]}`
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    // Create document record
    const documentData = {
      title: req.body.title,
      description: req.body.description,
      project: req.body.project,
      uploadedBy: req.user._id,
      category: req.body.category,
      type: req.file.mimetype.split('/')[1] || 'other',
      file: {
        filename: result.public_id,
        originalName: req.file.originalname,
        url: result.secure_url,
        size: req.file.size,
        mimeType: req.file.mimetype
      },
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
    };

    const document = await Document.create(documentData);

    await document.populate('project', 'name status');
    await document.populate('uploadedBy', 'firstName lastName email');

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      data: document
    });
  } catch (error) {
    console.error('Upload document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during document upload'
    });
  }
});

// @desc    Update document
// @route   PUT /api/documents/:id
// @access  Private
router.put('/:id', protect, [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim(),
  body('category').optional().isIn(['plans', 'permits', 'contracts', 'invoices', 'photos', 'reports', 'certificates', 'manuals', 'other'])
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

    let document = await Document.findById(req.params.id).populate('project');

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if user can update this document
    if (req.user.role !== 'admin') {
      const project = document.project;
      const hasAccess = 
        project.projectManager._id.toString() === req.user._id.toString() ||
        project.team.some(member => member.user._id.toString() === req.user._id.toString()) ||
        document.uploadedBy.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this document'
        });
      }
    }

    document = await Document.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .populate('project', 'name status')
    .populate('uploadedBy', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Document updated successfully',
      data: document
    });
  } catch (error) {
    console.error('Update document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during document update'
    });
  }
});

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate('project');

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if user can delete this document
    if (req.user.role !== 'admin') {
      const project = document.project;
      const hasAccess = 
        project.projectManager._id.toString() === req.user._id.toString() ||
        project.team.some(member => member.user._id.toString() === req.user._id.toString()) ||
        document.uploadedBy.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this document'
        });
      }
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(document.file.filename);
    } catch (cloudinaryError) {
      console.error('Cloudinary deletion error:', cloudinaryError);
    }

    // Soft delete
    document.isActive = false;
    await document.save();

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during document deletion'
    });
  }
});

// @desc    Download document
// @route   GET /api/documents/:id/download
// @access  Private
router.get('/:id/download', protect, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate('project');

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if user has access to this document
    if (req.user.role !== 'admin') {
      const project = document.project;
      const hasAccess = 
        project.projectManager._id.toString() === req.user._id.toString() ||
        project.team.some(member => member.user._id.toString() === req.user._id.toString()) ||
        project.createdBy._id.toString() === req.user._id.toString();

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to download this document'
        });
      }
    }

    // Increment download count
    await document.incrementDownload();

    res.json({
      success: true,
      downloadUrl: document.file.url,
      filename: document.file.originalName
    });
  } catch (error) {
    console.error('Download document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during document download'
    });
  }
});

module.exports = router;
