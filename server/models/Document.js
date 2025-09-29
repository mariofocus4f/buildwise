const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a document title'],
    trim: true,
    maxlength: [100, 'Document title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [true, 'Please specify a project']
  },
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: [
      'plans', 'permits', 'contracts', 'invoices', 'photos', 
      'reports', 'certificates', 'manuals', 'other'
    ],
    required: [true, 'Please specify a document category']
  },
  type: {
    type: String,
    enum: [
      'pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 
      'png', 'gif', 'dwg', 'dwt', 'dxf', 'txt', 'zip', 'other'
    ],
    required: true
  },
  file: {
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    }
  },
  version: {
    type: String,
    default: '1.0'
  },
  isLatest: {
    type: Boolean,
    default: true
  },
  previousVersions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Document'
  }],
  tags: [{
    type: String,
    trim: true
  }],
  metadata: {
    author: String,
    createdDate: Date,
    modifiedDate: Date,
    keywords: [String],
    language: {
      type: String,
      default: 'pl'
    }
  },
  access: {
    isPublic: {
      type: Boolean,
      default: false
    },
    allowedUsers: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }],
    allowedRoles: [{
      type: String,
      enum: ['user', 'manager', 'admin']
    }]
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  lastDownloaded: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
DocumentSchema.index({ project: 1, category: 1 });
DocumentSchema.index({ uploadedBy: 1 });
DocumentSchema.index({ 'file.mimeType': 1 });
DocumentSchema.index({ tags: 1 });
DocumentSchema.index({ title: 'text', description: 'text' });

// Virtual for file size in human readable format
DocumentSchema.virtual('fileSizeFormatted').get(function() {
  const bytes = this.file.size;
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
});

// Virtual for days since upload
DocumentSchema.virtual('daysSinceUpload').get(function() {
  return Math.floor((new Date() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Ensure virtual fields are serialized
DocumentSchema.set('toJSON', { virtuals: true });

// Pre-save middleware to update download tracking
DocumentSchema.methods.incrementDownload = function() {
  this.downloadCount += 1;
  this.lastDownloaded = new Date();
  return this.save();
};

module.exports = mongoose.model('Document', DocumentSchema);

