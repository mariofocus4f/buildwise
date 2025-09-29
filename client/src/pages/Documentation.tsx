import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import Footer from '../components/Footer';
import {
  MenuBook as BookIcon,
  PlayCircleOutline as VideoIcon,
  Code as CodeIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

const Documentation: React.FC = () => {
  const sections = [
    {
      title: 'Pierwsze kroki',
      icon: <BuildIcon color="primary" />,
      items: [
        'Rejestracja i konfiguracja konta',
        'Tworzenie pierwszego projektu',
        'Dodawanie członków zespołu',
        'Podstawowa nawigacja',
      ],
    },
    {
      title: 'Zarządzanie projektami',
      icon: <BookIcon color="primary" />,
      items: [
        'Tworzenie harmonogramu',
        'Kontrola budżetu',
        'Zarządzanie dokumentami',
        'Współpraca z wykonawcami',
      ],
    },
    {
      title: 'Tutoriale wideo',
      icon: <VideoIcon color="primary" />,
      items: [
        'Szybki start (5 min)',
        'Zaawansowane funkcje budżetu',
        'Zarządzanie zespołem',
        'Aplikacja mobilna',
      ],
    },
    {
      title: 'API Developers',
      icon: <CodeIcon color="primary" />,
      items: [
        'Dokumentacja API',
        'Autentykacja',
        'Przykładowe zapytania',
        'Limity i rate limiting',
      ],
    },
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
          Dokumentacja
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
        >
          Wszystko czego potrzebujesz aby zacząć korzystać z BuildWise
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          {sections.map((section, index) => (
            <Paper key={index} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {section.icon}
                <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
                  {section.title}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List dense>
                {section.items.map((item, itemIndex) => (
                  <ListItem 
                    key={itemIndex}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#F3F4F6' },
                      borderRadius: 1,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#2563EB' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item}
                      primaryTypographyProps={{ fontSize: '0.95rem' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
        </Box>

        <Paper sx={{ p: 4, mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Potrzebujesz pomocy?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Napisz do nas na: <strong style={{ color: '#2563EB' }}>help@buildwise.pl</strong>
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Documentation;
