import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // If we're not on homepage, navigate there first
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1F2937',
        color: 'white',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 4,
          }}
        >
          {/* Company Info */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              BuildWise
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
              Nowoczesne zarządzanie projektami budowlanymi
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © 2025 BuildWise
            </Typography>
          </Box>

          {/* Product */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Produkt
            </Typography>
            <List dense sx={{ py: 0 }}>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => scrollToSection('features')}
              >
                <ListItemText
                  primary="Funkcje"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => scrollToSection('pricing')}
              >
                <ListItemText
                  primary="Cennik"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => navigate('/login')}
              >
                <ListItemText
                  primary="Demo"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => navigate('/api')}
              >
                <ListItemText
                  primary="API"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
            </List>
          </Box>

          {/* Company */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Firma
            </Typography>
            <List dense sx={{ py: 0 }}>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => scrollToSection('about')}
              >
                <ListItemText
                  primary="O nas"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => navigate('/career')}
              >
                <ListItemText
                  primary="Kariera"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => navigate('/blog')}
              >
                <ListItemText
                  primary="Blog"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => navigate('/partners')}
              >
                <ListItemText
                  primary="Partnerzy"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
            </List>
          </Box>

          {/* Legal */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Prawne
            </Typography>
            <List dense sx={{ py: 0 }}>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => navigate('/rodo')}
              >
                <ListItemText
                  primary="RODO"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => navigate('/terms')}
              >
                <ListItemText
                  primary="Regulamin"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
              <ListItem
                sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                onClick={() => navigate('/privacy')}
              >
                <ListItemText
                  primary="Polityka prywatności"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      '&:hover': { opacity: 1 },
                    }
                  }}
                />
              </ListItem>
            </List>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            Wszystkie prawa zastrzeżone
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography
              variant="body2"
              sx={{ opacity: 0.6, cursor: 'pointer', '&:hover': { opacity: 1 } }}
              onClick={() => navigate('/contact')}
            >
              Kontakt
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.6, cursor: 'pointer', '&:hover': { opacity: 1 } }}
              onClick={() => navigate('/documentation')}
            >
              Dokumentacja
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.6, cursor: 'pointer', '&:hover': { opacity: 1 } }}
              onClick={() => navigate('/faq')}
            >
              FAQ
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.6, cursor: 'pointer', '&:hover': { opacity: 1 } }}
              onClick={() => navigate('/status')}
            >
              Status
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
