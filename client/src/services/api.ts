import axios, { AxiosResponse } from 'axios';
import { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData, 
  User, 
  Project, 
  Task, 
  Document,
  ApiResponse,
  ProjectFilters,
  TaskFilters,
  DocumentFilters
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/login', credentials),
  
  register: (data: RegisterData): Promise<AxiosResponse<AuthResponse>> =>
    api.post('/auth/register', data),
  
  getMe: (): Promise<AxiosResponse<{ success: boolean; user: User }>> =>
    api.get('/auth/me'),
  
  updateProfile: (data: Partial<User>): Promise<AxiosResponse<AuthResponse>> =>
    api.put('/auth/profile', data),
  
  changePassword: (data: { currentPassword: string; newPassword: string }): Promise<AxiosResponse<{ success: boolean; message: string }>> =>
    api.put('/auth/change-password', data),
};

// Projects API
export const projectsAPI = {
  getProjects: (filters?: ProjectFilters): Promise<AxiosResponse<ApiResponse<Project[]>>> =>
    api.get('/projects', { params: filters }),
  
  getProject: (id: string): Promise<AxiosResponse<ApiResponse<Project>>> =>
    api.get(`/projects/${id}`),
  
  createProject: (data: Partial<Project>): Promise<AxiosResponse<ApiResponse<Project>>> =>
    api.post('/projects', data),
  
  updateProject: (id: string, data: Partial<Project>): Promise<AxiosResponse<ApiResponse<Project>>> =>
    api.put(`/projects/${id}`, data),
  
  deleteProject: (id: string): Promise<AxiosResponse<{ success: boolean; message: string }>> =>
    api.delete(`/projects/${id}`),
  
  addTeamMember: (projectId: string, data: { user: string; role: string }): Promise<AxiosResponse<ApiResponse<any>>> =>
    api.post(`/projects/${projectId}/team`, data),
  
  removeTeamMember: (projectId: string, userId: string): Promise<AxiosResponse<ApiResponse<any>>> =>
    api.delete(`/projects/${projectId}/team/${userId}`),
};

// Tasks API
export const tasksAPI = {
  getTasks: (filters?: TaskFilters): Promise<AxiosResponse<ApiResponse<Task[]>>> =>
    api.get('/tasks', { params: filters }),
  
  getTask: (id: string): Promise<AxiosResponse<ApiResponse<Task>>> =>
    api.get(`/tasks/${id}`),
  
  createTask: (data: Partial<Task>): Promise<AxiosResponse<ApiResponse<Task>>> =>
    api.post('/tasks', data),
  
  updateTask: (id: string, data: Partial<Task>): Promise<AxiosResponse<ApiResponse<Task>>> =>
    api.put(`/tasks/${id}`, data),
  
  deleteTask: (id: string): Promise<AxiosResponse<{ success: boolean; message: string }>> =>
    api.delete(`/tasks/${id}`),
  
  addComment: (taskId: string, text: string): Promise<AxiosResponse<ApiResponse<any>>> =>
    api.post(`/tasks/${taskId}/comments`, { text }),
  
  updateProgress: (taskId: string, progress: number): Promise<AxiosResponse<ApiResponse<Task>>> =>
    api.put(`/tasks/${taskId}/progress`, { progress }),
};

// Documents API
export const documentsAPI = {
  getDocuments: (filters?: DocumentFilters): Promise<AxiosResponse<ApiResponse<Document[]>>> =>
    api.get('/documents', { params: filters }),
  
  getDocument: (id: string): Promise<AxiosResponse<ApiResponse<Document>>> =>
    api.get(`/documents/${id}`),
  
  uploadDocument: (formData: FormData): Promise<AxiosResponse<ApiResponse<Document>>> =>
    api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  updateDocument: (id: string, data: Partial<Document>): Promise<AxiosResponse<ApiResponse<Document>>> =>
    api.put(`/documents/${id}`, data),
  
  deleteDocument: (id: string): Promise<AxiosResponse<{ success: boolean; message: string }>> =>
    api.delete(`/documents/${id}`),
  
  downloadDocument: (id: string): Promise<AxiosResponse<{ success: boolean; downloadUrl: string; filename: string }>> =>
    api.get(`/documents/${id}/download`),
};

// Users API
export const usersAPI = {
  getUsers: (filters?: { page?: number; limit?: number; search?: string; role?: string }): Promise<AxiosResponse<ApiResponse<User[]>>> =>
    api.get('/users', { params: filters }),
  
  getUser: (id: string): Promise<AxiosResponse<ApiResponse<User>>> =>
    api.get(`/users/${id}`),
  
  updateUserRole: (id: string, role: string): Promise<AxiosResponse<ApiResponse<User>>> =>
    api.put(`/users/${id}/role`, { role }),
  
  deactivateUser: (id: string): Promise<AxiosResponse<ApiResponse<User>>> =>
    api.put(`/users/${id}/deactivate`),
  
  activateUser: (id: string): Promise<AxiosResponse<ApiResponse<User>>> =>
    api.put(`/users/${id}/activate`),
};

export default api;
