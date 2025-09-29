import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Avatar,
  Divider,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as PendingIcon,
  Circle as InProgressIcon,
  Flag as FlagIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

interface Milestone {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
  progress: number;
  category: string;
  assignedTo?: string;
  dependencies?: string[];
}

const Timeline: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [milestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'Pozwolenie na budowę',
      description: 'Uzyskanie wszystkich niezbędnych pozwoleń i zgód',
      startDate: '2024-01-01',
      endDate: '2024-01-15',
      status: 'completed',
      progress: 100,
      category: 'Administracja',
    },
    {
      id: '2',
      title: 'Przygotowanie terenu',
      description: 'Usunięcie drzew, wyrównanie terenu, oznaczenie granic',
      startDate: '2024-01-16',
      endDate: '2024-01-30',
      status: 'completed',
      progress: 100,
      category: 'Przygotowanie',
    },
    {
      id: '3',
      title: 'Fundamenty',
      description: 'Wykopy, zbrojenie, wylewanie fundamentów',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      status: 'completed',
      progress: 100,
      category: 'Stan zerowy',
      assignedTo: 'Jan Kowalski',
    },
    {
      id: '4',
      title: 'Stan surowy zamknięty',
      description: 'Ściany, stropy, dach, okna, drzwi',
      startDate: '2024-03-01',
      endDate: '2024-05-31',
      status: 'in-progress',
      progress: 65,
      category: 'Stan surowy',
      assignedTo: 'Jan Kowalski',
    },
    {
      id: '5',
      title: 'Instalacje',
      description: 'Elektryka, hydraulika, wentylacja, ogrzewanie',
      startDate: '2024-04-15',
      endDate: '2024-06-30',
      status: 'in-progress',
      progress: 40,
      category: 'Instalacje',
      assignedTo: 'Anna Nowak',
    },
    {
      id: '6',
      title: 'Tynki i wylewki',
      description: 'Tynkowanie ścian, wylewki posadzek',
      startDate: '2024-06-01',
      endDate: '2024-07-15',
      status: 'not-started',
      progress: 0,
      category: 'Wykończenie',
    },
    {
      id: '7',
      title: 'Stolarka',
      description: 'Montaż drzwi wewnętrznych, szaf, mebli kuchennych',
      startDate: '2024-07-16',
      endDate: '2024-08-31',
      status: 'not-started',
      progress: 0,
      category: 'Wykończenie',
      assignedTo: 'Marek Lewandowski',
    },
    {
      id: '8',
      title: 'Malowanie i wykończenia',
      description: 'Malowanie ścian, układanie płytek, paneli',
      startDate: '2024-09-01',
      endDate: '2024-10-15',
      status: 'not-started',
      progress: 0,
      category: 'Wykończenie',
    },
    {
      id: '9',
      title: 'Odbiór końcowy',
      description: 'Przegląd, odbiory, dokumentacja',
      startDate: '2024-10-16',
      endDate: '2024-10-31',
      status: 'not-started',
      progress: 0,
      category: 'Finalizacja',
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon sx={{ color: '#10B981' }} />;
      case 'in-progress':
        return <InProgressIcon sx={{ color: '#2563EB' }} />;
      case 'delayed':
        return <WarningIcon sx={{ color: '#EF4444' }} />;
      default:
        return <PendingIcon sx={{ color: '#6B7280' }} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'in-progress':
        return '#2563EB';
      case 'delayed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Zakończony';
      case 'in-progress':
        return 'W trakcie';
      case 'delayed':
        return 'Opóźniony';
      default:
        return 'Zaplanowany';
    }
  };

  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const inProgressCount = milestones.filter(m => m.status === 'in-progress').length;
  const totalProgress = Math.round(milestones.reduce((acc, m) => acc + m.progress, 0) / milestones.length);

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Harmonogram Budowy
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
        >
          Dodaj kamień milowy
        </Button>
      </Box>

      {/* Overview Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Postęp ogólny
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2563EB' }}>
                  {totalProgress}%
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#EEF2FF', color: '#2563EB' }}>
                <TrendingUpIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Zakończone
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#10B981' }}>
                  {completedCount}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#ECFDF5', color: '#10B981' }}>
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
                  W trakcie
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2563EB' }}>
                  {inProgressCount}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#EEF2FF', color: '#2563EB' }}>
                <InProgressIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Wszystkie etapy
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#6B7280' }}>
                  {milestones.length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#F3F4F6', color: '#6B7280' }}>
                <FlagIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Active Milestones Alert */}
      {inProgressCount > 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>W trakcie realizacji:</strong> {inProgressCount} {inProgressCount === 1 ? 'etap' : 'etapy'}
        </Alert>
      )}

      {/* Timeline */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Oś czasu projektu
        </Typography>

        <Box sx={{ position: 'relative', pl: 4 }}>
          {/* Vertical line */}
          <Box
            sx={{
              position: 'absolute',
              left: 20,
              top: 0,
              bottom: 0,
              width: 3,
              bgcolor: '#E5E7EB',
            }}
          />

          {milestones.map((milestone, index) => (
            <Box key={milestone.id} sx={{ position: 'relative', mb: 4, pb: 4 }}>
              {/* Timeline dot */}
              <Box
                sx={{
                  position: 'absolute',
                  left: -28,
                  top: 8,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: getStatusColor(milestone.status),
                  border: '3px solid white',
                  boxShadow: '0 0 0 3px ' + getStatusColor(milestone.status) + '40',
                  zIndex: 1,
                }}
              />

              <Card
                sx={{
                  border: '2px solid',
                  borderColor: milestone.status === 'in-progress' ? '#2563EB' : '#E5E7EB',
                  boxShadow: milestone.status === 'in-progress' ? '0 4px 12px rgba(37, 99, 235, 0.15)' : 'none',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        {getStatusIcon(milestone.status)}
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {milestone.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {milestone.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Chip
                          label={milestone.category}
                          size="small"
                          sx={{ bgcolor: '#F3F4F6', fontWeight: 600 }}
                        />
                        <Chip
                          label={getStatusLabel(milestone.status)}
                          size="small"
                          sx={{
                            bgcolor: `${getStatusColor(milestone.status)}20`,
                            color: getStatusColor(milestone.status),
                            fontWeight: 600,
                          }}
                        />
                        {milestone.assignedTo && (
                          <Chip
                            label={`Wykonawca: ${milestone.assignedTo}`}
                            size="small"
                            sx={{ bgcolor: '#EEF2FF', color: '#2563EB', fontWeight: 600 }}
                          />
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                      <IconButton size="small" sx={{ color: '#2563EB' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#EF4444' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Data rozpoczęcia
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {new Date(milestone.startDate).toLocaleDateString('pl-PL')}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary">
                        Data zakończenia
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {new Date(milestone.endDate).toLocaleDateString('pl-PL')}
                      </Typography>
                    </Box>
                  </Box>

                  {milestone.status === 'in-progress' && (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          Postęp: {milestone.progress}%
                        </Typography>
                        {getDaysRemaining(milestone.endDate) > 0 ? (
                          <Typography variant="caption" color="text.secondary">
                            Pozostało {getDaysRemaining(milestone.endDate)} dni
                          </Typography>
                        ) : (
                          <Typography variant="caption" sx={{ color: '#EF4444', fontWeight: 600 }}>
                            Przekroczono termin!
                          </Typography>
                        )}
                      </Box>
                      <Box
                        sx={{
                          width: '100%',
                          height: 8,
                          borderRadius: 4,
                          bgcolor: '#E5E7EB',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            width: `${milestone.progress}%`,
                            height: '100%',
                            bgcolor: '#2563EB',
                            borderRadius: 4,
                            transition: 'width 0.3s ease',
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Add Milestone Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Dodaj nowy kamień milowy</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField label="Tytuł" fullWidth />
            <TextField label="Opis" fullWidth multiline rows={3} />
            <TextField
              label="Kategoria"
              select
              fullWidth
            >
              <MenuItem value="Administracja">Administracja</MenuItem>
              <MenuItem value="Przygotowanie">Przygotowanie</MenuItem>
              <MenuItem value="Stan zerowy">Stan zerowy</MenuItem>
              <MenuItem value="Stan surowy">Stan surowy</MenuItem>
              <MenuItem value="Instalacje">Instalacje</MenuItem>
              <MenuItem value="Wykończenie">Wykończenie</MenuItem>
              <MenuItem value="Finalizacja">Finalizacja</MenuItem>
            </TextField>
            <TextField
              label="Data rozpoczęcia"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Data zakończenia"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField label="Przypisz wykonawcę (opcjonalnie)" fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Anuluj</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
          >
            Dodaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Timeline;
