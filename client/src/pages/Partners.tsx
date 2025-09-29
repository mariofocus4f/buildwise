import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import Footer from '../components/Footer';
import { Handshake as HandshakeIcon } from '@mui/icons-material';

const Partners: React.FC = () => {
  const partners = [
    { name: 'Leroy Merlin', category: 'Hurtownia budowlana', logo: '🏢' },
    { name: 'Castorama', category: 'Hurtownia budowlana', logo: '🏪' },
    { name: 'OBI', category: 'Hurtownia budowlana', logo: '🏗️' },
    { name: 'Polskie Stowarzyszenie Budowlane', category: 'Organizacja branżowa', logo: '🏛️' },
  ];

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          align="center"
          sx={{ fontWeight: 800, mb: 2, color: '#1F2937' }}
        >
          Nasi Partnerzy
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
        >
          Współpracujemy z najlepszymi firmami i organizacjami w branży budowlanej
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 6 }}>
          {partners.map((partner, index) => (
            <Card key={index} sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Typography variant="h1" sx={{ mb: 2 }}>{partner.logo}</Typography>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  {partner.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {partner.category}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <HandshakeIcon sx={{ fontSize: 64, color: '#2563EB', mb: 2 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Zostań naszym partnerem
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Szukasz partnerstwa z rozwijającą się platformą? Skontaktuj się z nami!
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' }, px: 4 }}
          >
            Skontaktuj się
          </Button>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Partners;
