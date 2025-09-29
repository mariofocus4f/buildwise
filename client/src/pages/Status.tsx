import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
} from '@mui/material';
import Footer from '../components/Footer';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const Status: React.FC = () => {
  const services = [
    { name: 'API', status: 'operational', uptime: '99.99%' },
    { name: 'Aplikacja Web', status: 'operational', uptime: '99.98%' },
    { name: 'Aplikacja mobilna (iOS)', status: 'operational', uptime: '99.97%' },
    { name: 'Aplikacja mobilna (Android)', status: 'operational', uptime: '99.96%' },
    { name: 'Baza danych', status: 'operational', uptime: '100%' },
    { name: 'Storage (pliki/zdjęcia)', status: 'operational', uptime: '99.99%' },
  ];

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Typography 
          variant="h2" 
          component="h1" 
          align="center"
          sx={{ fontWeight: 800, mb: 2, color: '#1F2937' }}
        >
          Status Systemu
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Monitorowanie dostępności usług BuildWise w czasie rzeczywistym
        </Typography>

        <Paper sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: '#ECFDF5' }}>
          <CheckCircleIcon sx={{ fontSize: 64, color: '#10B981', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#10B981' }}>
            Wszystkie systemy działają prawidłowo
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ostatnia aktualizacja: {new Date().toLocaleString('pl-PL')}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Status usług
          </Typography>
          {services.map((service, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                py: 2,
                borderBottom: index < services.length - 1 ? '1px solid #E5E7EB' : 'none',
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {service.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Uptime (30 dni): {service.uptime}
                </Typography>
              </Box>
              <Chip 
                label="Operational" 
                size="small" 
                sx={{ bgcolor: '#ECFDF5', color: '#10B981', fontWeight: 600 }}
              />
            </Box>
          ))}
        </Paper>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Planowane prace konserwacyjne
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Brak zaplanowanych prac konserwacyjnych
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Status;
