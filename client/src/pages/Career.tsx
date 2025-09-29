import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import Footer from '../components/Footer';
import {
  WorkOutline as WorkIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const Career: React.FC = () => {
  const jobs = [
    {
      title: 'Senior Full Stack Developer',
      location: 'Warszawa / Remote',
      type: 'Pełny etat',
      description: 'Szukamy doświadczonego programisty do rozwoju platformy BuildWise. Praca z React, Node.js, MongoDB.',
      requirements: ['React', 'Node.js', 'MongoDB', 'TypeScript', '5+ lat doświadczenia'],
    },
    {
      title: 'UX/UI Designer',
      location: 'Remote',
      type: 'Pełny etat',
      description: 'Projektowanie intuicyjnych interfejsów dla branży budowlanej. Doświadczenie w Figma i design systems.',
      requirements: ['Figma', 'Adobe XD', 'Design Systems', 'User Research', '3+ lat doświadczenia'],
    },
    {
      title: 'Customer Success Manager',
      location: 'Warszawa',
      type: 'Pełny etat',
      description: 'Wsparcie klientów w wykorzystaniu platformy. Kontakt z inwestorami i kierownikami budowy.',
      requirements: ['Doświadczenie w CS', 'Znajomość branży budowlanej', 'Komunikatywność', 'Język polski i angielski'],
    },
  ];

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          align="center"
          sx={{ 
            fontWeight: 800, 
            mb: 2,
            color: '#1F2937',
          }}
        >
          Kariera w BuildWise
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
        >
          Dołącz do zespołu, który zmienia branżę budowlaną w Polsce. 
          Rozwijaj się z nami i twórz przyszłość konstrukcji!
        </Typography>

        {/* Values Section */}
        <Paper sx={{ p: 4, mb: 6, bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Dlaczego BuildWise?
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                💼 Konkurencyjne wynagrodzenie
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Godziwe stawki + premie + opcje na akcje dla kluczowych pracowników
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                🏠 Praca zdalna
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Elastyczne godziny pracy i możliwość pracy z dowolnego miejsca
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                📚 Rozwój
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Budżet na szkolenia, konferencje i certyfikaty
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                🎯 Wpływ
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Realny wpływ na produkt używany przez tysiące użytkowników
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Open Positions */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          Otwarte pozycje
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {jobs.map((job, index) => (
            <Card key={index} sx={{ '&:hover': { boxShadow: 6 }, transition: 'box-shadow 0.3s' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      {job.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                      <Chip icon={<LocationIcon />} label={job.location} size="small" />
                      <Chip icon={<ScheduleIcon />} label={job.type} size="small" color="primary" />
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: '#2563EB',
                      '&:hover': { bgcolor: '#1D4ED8' },
                    }}
                  >
                    Aplikuj
                  </Button>
                </Box>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {job.description}
                </Typography>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                  Wymagania:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {job.requirements.map((req, i) => (
                    <Chip key={i} label={req} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Spontaneous Application */}
        <Paper sx={{ p: 4, mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Nie widzisz pasującej pozycji?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Wyślij nam swoje CV i portfol io. Zawsze szukamy utalentowanych ludzi!
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: '#2563EB',
              color: '#2563EB',
              '&:hover': { borderColor: '#1D4ED8', bgcolor: '#EEF2FF' },
              px: 4,
            }}
          >
            Aplikacja spontaniczna
          </Button>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Career;
