const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name'],
    trim: true,
    maxlength: [100, 'Project name cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please add a street address'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
      trim: true
    },
    postalCode: {
      type: String,
      required: [true, 'Please add a postal code'],
      trim: true
    },
    country: {
      type: String,
      default: 'Poland',
      trim: true
    }
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'on-hold', 'completed', 'cancelled'],
    default: 'planning'
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date']
  },
  budget: {
    type: Number,
    min: [0, 'Budget cannot be negative']
  },
  currency: {
    type: String,
    default: 'PLN'
  },
  projectManager: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please assign a project manager']
  },
  team: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['architect', 'engineer', 'contractor', 'supervisor', 'worker'],
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  client: {
    name: {
      type: String,
      required: [true, 'Please add a client name'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true
    }
  },
  progress: {
    type: Number,
    min: [0, 'Progress cannot be negative'],
    max: [100, 'Progress cannot exceed 100%'],
    default: 0
  },
  phases: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed', 'delayed'],
      default: 'not-started'
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  }],
  documents: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Document'
  }],
  tasks: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Task'
  }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
ProjectSchema.index({ name: 'text', description: 'text' });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ projectManager: 1 });
ProjectSchema.index({ 'client.name': 1 });

// Virtual for project duration in days
ProjectSchema.virtual('duration').get(function() {
  if (this.startDate && this.endDate) {
    return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Ensure virtual fields are serialized
ProjectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Project', ProjectSchema);

