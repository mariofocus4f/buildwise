import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Avatar,
  Grid,
  Button,
} from '@mui/material';
import {
  Construction as ConstructionIcon,
  Assignment as AssignmentIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  AccountBalance as BudgetIcon,
  Group as GroupIcon,
  Description as DocumentIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { projectsAPI, tasksAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch projects
  const { data: projectsData } = useQuery({
    queryKey: ['projects', 'dashboard'],
    queryFn: () => projectsAPI.getProjects({ limit: 5 }),
  });

  // Fetch tasks
  const { data: tasksData } = useQuery({
    queryKey: ['tasks', 'dashboard'],
    queryFn: () => tasksAPI.getTasks({ limit: 10 }),
  });

  const projects = projectsData?.data.data || [];
  const tasks = tasksData?.data.data || [];

  // Calculate statistics
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const overdueTasks = tasks.filter(t => t.daysOverdue && t.daysOverdue > 0).length;

  // Mock data for budget (będzie później pobierane z API)
  const totalBudget = 450000;
  const spentBudget = 287500;
  const budgetProgress = (spentBudget / totalBudget) * 100;

  // Mock data for contractors
  const activeContractors = 5;
  const totalDocuments = 24;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'planning':
        return 'info';
      case 'on-hold':
        return 'warning';
      case 'completed':
        return 'default';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'in-progress':
        return <ScheduleIcon color="primary" />;
      case 'pending':
        return <WarningIcon color="warning" />;
      default:
        return <AssignmentIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Dashboard
      </Typography>

      {/* Welcome Message */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h5" gutterBottom>
          Witaj, {user?.firstName}! 👋
        </Typography>
        <Typography variant="body1">
          Oto przegląd Twoich projektów i zadań na dziś.
        </Typography>
      </Paper>

      {/* Statistics Cards */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3, 
        mb: 3,
        '& > *': {
          flex: '1 1 250px',
          minWidth: '250px'
        }
      }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Aktywne projekty
                </Typography>
                <Typography variant="h4" component="div">
                  {activeProjects}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <ConstructionIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Ukończone zadania
                </Typography>
                <Typography variant="h4" component="div">
                  {completedTasks}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <CheckCircleIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Oczekujące zadania
                </Typography>
                <Typography variant="h4" component="div">
                  {pendingTasks}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'warning.main' }}>
                <ScheduleIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Przeterminowane
                </Typography>
                <Typography variant="h4" component="div" color="error">
                  {overdueTasks}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'error.main' }}>
                <WarningIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ cursor: 'pointer' }} onClick={() => navigate('/budget')}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Budżet wydany
                </Typography>
                <Typography variant="h4" component="div">
                  {budgetProgress.toFixed(0)}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {spentBudget.toLocaleString('pl-PL')} / {totalBudget.toLocaleString('pl-PL')} PLN
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#10B981' }}>
                <BudgetIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ cursor: 'pointer' }} onClick={() => navigate('/contractors')}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Aktywni wykonawcy
                </Typography>
                <Typography variant="h4" component="div">
                  {activeContractors}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#8B5CF6' }}>
                <GroupIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ cursor: 'pointer' }} onClick={() => navigate('/documents')}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Dokumenty
                </Typography>
                <Typography variant="h4" component="div">
                  {totalDocuments}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#F59E0B' }}>
                <DocumentIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Budget Progress Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Kontrola Budżetu
          </Typography>
          <Button 
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/budget')}
          >
            Zobacz szczegóły
          </Button>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={budgetProgress} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            mb: 1,
            bgcolor: '#E5E7EB',
            '& .MuiLinearProgress-bar': {
              bgcolor: budgetProgress > 90 ? '#EF4444' : budgetProgress > 75 ? '#F59E0B' : '#10B981'
            }
          }} 
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Wydano: {spentBudget.toLocaleString('pl-PL')} PLN
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pozostało: {(totalBudget - spentBudget).toLocaleString('pl-PL')} PLN
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3,
        '& > *': {
          flex: '1 1 400px',
          minWidth: '400px'
        }
      }}>
        {/* Recent Projects */}
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ConstructionIcon />
            Ostatnie projekty
          </Typography>
          <List>
            {projects.length > 0 ? (
              projects.map((project) => (
                <ListItem key={project.id} divider>
                  <ListItemIcon>
                    <ConstructionIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={project.name}
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {project.client.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Chip
                            label={project.status}
                            size="small"
                            color={getStatusColor(project.status) as any}
                          />
                          <LinearProgress
                            variant="determinate"
                            value={project.progress}
                            sx={{ flexGrow: 1, height: 6, borderRadius: 3 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {project.progress}%
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary="Brak projektów"
                  secondary="Nie masz jeszcze żadnych projektów"
                />
              </ListItem>
            )}
          </List>
        </Paper>

        {/* Recent Tasks */}
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AssignmentIcon />
            Ostatnie zadania
          </Typography>
          <List>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <ListItem key={task.id} divider>
                  <ListItemIcon>
                    {getTaskStatusIcon(task.status)}
                  </ListItemIcon>
                  <ListItemText
                    primary={task.title}
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {task.project.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <Chip
                            label={task.priority}
                            size="small"
                            color={getPriorityColor(task.priority) as any}
                          />
                          {task.daysOverdue && task.daysOverdue > 0 && (
                            <Chip
                              label={`${task.daysOverdue} dni spóźnienia`}
                              size="small"
                              color="error"
                            />
                          )}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary="Brak zadań"
                  secondary="Nie masz jeszcze żadnych zadań"
                />
              </ListItem>
            )}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;