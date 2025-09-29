export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'manager' | 'admin';
  company?: string;
  phone?: string;
  avatar?: string;
  preferences?: UserPreferences;
  lastLogin?: string;
  createdAt: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  budget?: number;
  currency: string;
  projectManager: User;
  team: TeamMember[];
  client: {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  progress: number;
  phases: ProjectPhase[];
  documents: string[];
  tasks: string[];
  createdBy: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  duration?: number;
}

export interface TeamMember {
  user: User;
  role: 'architect' | 'engineer' | 'contractor' | 'supervisor' | 'worker';
  joinedAt: string;
}

export interface ProjectPhase {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
  progress: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  project: Project;
  assignedTo: User;
  createdBy: User;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'foundation' | 'structure' | 'electrical' | 'plumbing' | 'hvac' | 'finishing' | 'inspection' | 'safety' | 'other';
  startDate: string;
  dueDate: string;
  completedDate?: string;
  estimatedHours?: number;
  actualHours: number;
  progress: number;
  location?: string;
  materials: Material[];
  attachments: Attachment[];
  comments: TaskComment[];
  dependencies: string[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  duration?: number;
  daysOverdue?: number;
}

export interface Material {
  name: string;
  quantity: number;
  unit: string;
  cost?: number;
}

export interface Attachment {
  filename: string;
  originalName: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export interface TaskComment {
  user: User;
  text: string;
  createdAt: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  project: Project;
  uploadedBy: User;
  category: 'plans' | 'permits' | 'contracts' | 'invoices' | 'photos' | 'reports' | 'certificates' | 'manuals' | 'other';
  type: string;
  file: {
    filename: string;
    originalName: string;
    url: string;
    size: number;
    mimeType: string;
  };
  version: string;
  isLatest: boolean;
  previousVersions: string[];
  tags: string[];
  metadata?: {
    author?: string;
    createdDate?: string;
    modifiedDate?: string;
    keywords?: string[];
    language?: string;
  };
  access: {
    isPublic: boolean;
    allowedUsers: string[];
    allowedRoles: string[];
  };
  downloadCount: number;
  lastDownloaded?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  fileSizeFormatted?: string;
  daysSinceUpload?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  pages?: number;
  currentPage?: number;
  errors?: any[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string;
  phone?: string;
}

export interface ProjectFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface TaskFilters {
  project?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface DocumentFilters {
  project?: string;
  category?: string;
  type?: string;
  page?: number;
  limit?: number;
  search?: string;
}
