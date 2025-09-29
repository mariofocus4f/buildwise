import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  Rating,
  TextField,
  InputAdornment,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Star as StarIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Message as MessageIcon,
} from '@mui/icons-material';

interface Contractor {
  id: string;
  name: string;
  company: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  email: string;
  location: string;
  avatar?: string;
  status: 'active' | 'completed' | 'pending';
  projectsCount: number;
  verified: boolean;
  currentTask?: string;
  progress?: number;
}

const Contractors: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);

  const [contractors] = useState<Contractor[]>([
    {
      id: '1',
      name: 'Jan Kowalski',
      company: 'Kowalski Budowa',
      specialty: 'Murarz',
      rating: 4.8,
      reviewsCount: 24,
      phone: '+48 123 456 789',
      email: 'jan@kowalski.pl',
      location: 'Warszawa',
      status: 'active',
      projectsCount: 156,
      verified: true,
      currentTask: 'Stan surowy - ściany',
      progress: 75,
    },
    {
      id: '2',
      name: 'Anna Nowak',
      company: 'Instalacje Nowak',
      specialty: 'Instalacje elektryczne',
      rating: 4.9,
      reviewsCount: 31,
      phone: '+48 234 567 890',
      email: 'anna@nowak.pl',
      location: 'Kraków',
      status: 'active',
      projectsCount: 203,
      verified: true,
      currentTask: 'Instalacja elektryczna',
      progress: 40,
    },
    {
      id: '3',
      name: 'Piotr Wiśniewski',
      company: 'Wiśniewski Hydraulika',
      specialty: 'Instalacje hydrauliczne',
      rating: 4.7,
      reviewsCount: 18,
      phone: '+48 345 678 901',
      email: 'piotr@wisniewski.pl',
      location: 'Wrocław',
      status: 'pending',
      projectsCount: 124,
      verified: true,
    },
    {
      id: '4',
      name: 'Marek Lewandowski',
      company: 'Stolarka Premium',
      specialty: 'Stolarka',
      rating: 5.0,
      reviewsCount: 42,
      phone: '+48 456 789 012',
      email: 'marek@stolarka.pl',
      location: 'Poznań',
      status: 'completed',
      projectsCount: 287,
      verified: true,
    },
    {
      id: '5',
      name: 'Tomasz Dąbrowski',
      company: 'Dąbrowski Wykończenia',
      specialty: 'Wykończenia',
      rating: 4.6,
      reviewsCount: 15,
      phone: '+48 567 890 123',
      email: 'tomasz@dabrowski.pl',
      location: 'Gdańsk',
      status: 'pending',
      projectsCount: 98,
      verified: false,
    },
  ]);

  const filteredContractors = contractors.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeContractors = filteredContractors.filter(c => c.status === 'active');
  const pendingContractors = filteredContractors.filter(c => c.status === 'pending');
  const completedContractors = filteredContractors.filter(c => c.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'completed':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktywny';
      case 'pending':
        return 'Oczekuje';
      case 'completed':
        return 'Zakończony';
      default:
        return status;
    }
  };

  const handleContractorClick = (contractor: Contractor) => {
    setSelectedContractor(contractor);
    setOpenDialog(true);
  };

  const renderContractorCard = (contractor: Contractor) => (
    <Card 
      key={contractor.id} 
      sx={{ 
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
        transition: 'box-shadow 0.3s',
      }}
      onClick={() => handleContractorClick(contractor)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: '#2563EB',
                fontSize: '1.5rem',
                fontWeight: 600,
              }}
            >
              {contractor.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {contractor.name}
                </Typography>
                {contractor.verified && (
                  <CheckCircleIcon sx={{ fontSize: 20, color: '#10B981' }} />
                )}
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {contractor.company}
              </Typography>
              <Chip 
                label={contractor.specialty} 
                size="small" 
                sx={{ bgcolor: '#EEF2FF', color: '#2563EB', fontWeight: 600 }}
              />
            </Box>
          </Box>
          <Chip
            label={getStatusLabel(contractor.status)}
            size="small"
            sx={{
              bgcolor: `${getStatusColor(contractor.status)}20`,
              color: getStatusColor(contractor.status),
              fontWeight: 600,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating value={contractor.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {contractor.rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({contractor.reviewsCount} opinii)
          </Typography>
        </Box>

        {contractor.currentTask && contractor.status === 'active' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Obecne zadanie: <strong>{contractor.currentTask}</strong>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={contractor.progress || 0}
                sx={{
                  flex: 1,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#E5E7EB',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#10B981',
                    borderRadius: 3,
                  },
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 40 }}>
                {contractor.progress}%
              </Typography>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon sx={{ fontSize: 18, color: '#6B7280' }} />
            <Typography variant="body2" color="text.secondary">
              {contractor.phone}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon sx={{ fontSize: 18, color: '#6B7280' }} />
            <Typography variant="body2" color="text.secondary">
              {contractor.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon sx={{ fontSize: 18, color: '#6B7280' }} />
            <Typography variant="body2" color="text.secondary">
              {contractor.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WorkIcon sx={{ fontSize: 18, color: '#6B7280' }} />
            <Typography variant="body2" color="text.secondary">
              {contractor.projectsCount} zrealizowanych projektów
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<MessageIcon />}
            fullWidth
            sx={{ borderColor: '#2563EB', color: '#2563EB' }}
          >
            Wiadomość
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<PhoneIcon />}
            fullWidth
            sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
          >
            Zadzwoń
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Zarządzanie Wykonawcami
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
        >
          Dodaj wykonawcę
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Aktywni wykonawcy
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#10B981' }}>
                  {activeContractors.length}
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
                  Oczekujący
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#F59E0B' }}>
                  {pendingContractors.length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: '#FEF3C7', color: '#F59E0B' }}>
                <WarningIcon />
              </Avatar>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="text.secondary" gutterBottom>
                  Średnia ocena
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2563EB' }}>
                    4.8
                  </Typography>
                  <StarIcon sx={{ fontSize: 32, color: '#FBBF24' }} />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Szukaj wykonawcy po nazwisku, specjalności lub firmie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label={`Aktywni (${activeContractors.length})`} />
          <Tab label={`Oczekujący (${pendingContractors.length})`} />
          <Tab label={`Zakończeni (${completedContractors.length})`} />
          <Tab label="Wszyscy" />
        </Tabs>
      </Paper>

      {/* Contractors Grid */}
      <Grid container spacing={3}>
        {tabValue === 0 && activeContractors.map(renderContractorCard)}
        {tabValue === 1 && pendingContractors.map(renderContractorCard)}
        {tabValue === 2 && completedContractors.map(renderContractorCard)}
        {tabValue === 3 && filteredContractors.map(renderContractorCard)}
      </Grid>

      {filteredContractors.length === 0 && (
        <Paper sx={{ p: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Nie znaleziono wykonawców
          </Typography>
        </Paper>
      )}

      {/* Contractor Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        {selectedContractor && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: '#2563EB',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                  }}
                >
                  {selectedContractor.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {selectedContractor.name}
                    </Typography>
                    {selectedContractor.verified && (
                      <CheckCircleIcon sx={{ color: '#10B981' }} />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {selectedContractor.company}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Ocena
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={selectedContractor.rating} precision={0.1} readOnly />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {selectedContractor.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({selectedContractor.reviewsCount} opinii)
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Dane kontaktowe
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemAvatar>
                        <PhoneIcon sx={{ color: '#2563EB' }} />
                      </ListItemAvatar>
                      <ListItemText primary={selectedContractor.phone} secondary="Telefon" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <EmailIcon sx={{ color: '#2563EB' }} />
                      </ListItemAvatar>
                      <ListItemText primary={selectedContractor.email} secondary="Email" />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <LocationIcon sx={{ color: '#2563EB' }} />
                      </ListItemAvatar>
                      <ListItemText primary={selectedContractor.location} secondary="Lokalizacja" />
                    </ListItem>
                  </List>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Informacje dodatkowe
                  </Typography>
                  <Typography variant="body2">
                    • Specjalność: <strong>{selectedContractor.specialty}</strong>
                  </Typography>
                  <Typography variant="body2">
                    • Zrealizowane projekty: <strong>{selectedContractor.projectsCount}</strong>
                  </Typography>
                  <Typography variant="body2">
                    • Status: <strong>{getStatusLabel(selectedContractor.status)}</strong>
                  </Typography>
                  {selectedContractor.currentTask && (
                    <Typography variant="body2">
                      • Obecne zadanie: <strong>{selectedContractor.currentTask}</strong>
                    </Typography>
                  )}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Zamknij</Button>
              <Button
                variant="outlined"
                startIcon={<MessageIcon />}
                sx={{ borderColor: '#2563EB', color: '#2563EB' }}
              >
                Wyślij wiadomość
              </Button>
              <Button
                variant="contained"
                startIcon={<PhoneIcon />}
                sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
              >
                Zadzwoń
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Contractors;
