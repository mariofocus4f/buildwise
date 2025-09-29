import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Construction as ConstructionIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
  Smartphone as SmartphoneIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    // Close mobile drawer if open
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const features = [
    {
      icon: <ConstructionIcon sx={{ fontSize: 48, color: '#2563EB' }} />,
      title: 'Zarządzanie Projektami',
      description: 'Harmonogram Gantt, timeline etapów, śledzenie postępów w czasie rzeczywistym',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: '#059669' }} />,
      title: 'Kontrola Budżetu',
      description: 'Plan vs rzeczywiste vs prognoza, alerty przekroczeń, raporty finansowe',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: '#EA580C' }} />,
      title: 'Dokumentacja',
      description: 'Dziennik budowy, protokoły odbioru, RFI, e-podpis zgodny z prawem polskim',
    },
    {
      icon: <SmartphoneIcon sx={{ fontSize: 48, color: '#7C3AED' }} />,
      title: 'Asystent AI',
      description: 'Baza wiedzy polskiego prawa budowlanego, odpowiedzi techniczne, rekomendacje',
    },
  ];

  const plans = [
    {
      name: 'Inwestor Basic',
      price: '49',
      period: 'zł/mies',
      description: 'Dla inwestorów indywidualnych',
      features: ['1 projekt', 'Timeline etapów', 'Kontrola budżetu', 'Portal klienta', 'E-podpis'],
      color: '#2563EB',
    },
    {
      name: 'Inwestor Pro',
      price: '99',
      period: 'zł/mies',
      description: 'Dla aktywnych inwestorów',
      features: ['3 projekty', 'Wszystkie funkcje Basic', 'Change Orders', 'Punch List', 'Priority Support'],
      color: '#059669',
      popular: true,
    },
    {
      name: 'Kierownik Pro',
      price: '149',
      period: 'zł/mies',
      description: 'Dla kierowników budowy',
      features: ['Nieograniczone projekty', 'Harmonogram Gantt', 'RFI Management', 'Dziennik budowy', 'API Access'],
      color: '#EA580C',
    },
  ];

  const stats = [
    { number: '15,000+', label: 'Kierowników budowy' },
    { number: '200,000+', label: 'Domów rocznie w Polsce' },
    { number: '50,000+', label: 'Firm budowlanych' },
    { number: '99.9%', label: 'Dostępność platformy' },
  ];

  const testimonials = [
    {
      name: 'Marek Kowalski',
      role: 'Kierownik budowy',
      company: 'ABC Construction',
      content: 'BuildWise zrewolucjonizowało sposób zarządzania moimi projektami. Oszczędzam 3 godziny dziennie na administracji.',
      avatar: 'MK',
      rating: 5,
    },
    {
      name: 'Anna Nowak',
      role: 'Inwestor',
      company: 'Dom jednorodzinny',
      content: 'Wreszcie mam pełną kontrolę nad budową mojego domu. Transparentność kosztów i postępów to game-changer.',
      avatar: 'AN',
      rating: 5,
    },
  ];

  const drawer = (
    <Box sx={{ width: 250, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2563EB' }}>
          BuildWise
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Stack spacing={2}>
        <Button
          fullWidth
          onClick={() => scrollToSection('features')}
          sx={{ 
            justifyContent: 'flex-start',
            color: 'text.primary',
            fontWeight: 600,
            '&:hover': { bgcolor: '#F3F4F6' },
          }}
        >
          Funkcje
        </Button>
        <Button
          fullWidth
          onClick={() => scrollToSection('pricing')}
          sx={{ 
            justifyContent: 'flex-start',
            color: 'text.primary',
            fontWeight: 600,
            '&:hover': { bgcolor: '#F3F4F6' },
          }}
        >
          Cennik
        </Button>
        <Button
          fullWidth
          onClick={() => scrollToSection('about')}
          sx={{ 
            justifyContent: 'flex-start',
            color: 'text.primary',
            fontWeight: 600,
            '&:hover': { bgcolor: '#F3F4F6' },
          }}
        >
          O nas
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{ 
            bgcolor: '#2563EB', 
            '&:hover': { bgcolor: '#1D4ED8' },
            mt: 2,
            fontWeight: 600,
          }}
        >
          Zaloguj się
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Box>
      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: 'white', 
          color: 'text.primary', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              color: '#2563EB',
              fontSize: '1.5rem',
            }}
          >
            BuildWise
          </Typography>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button 
                color="inherit" 
                onClick={() => scrollToSection('features')}
                sx={{ 
                  fontWeight: 600,
                  '&:hover': { color: '#2563EB' },
                }}
              >
                Funkcje
              </Button>
              <Button 
                color="inherit" 
                onClick={() => scrollToSection('pricing')}
                sx={{ 
                  fontWeight: 600,
                  '&:hover': { color: '#2563EB' },
                }}
              >
                Cennik
              </Button>
              <Button 
                color="inherit" 
                onClick={() => scrollToSection('about')}
                sx={{ 
                  fontWeight: 600,
                  '&:hover': { color: '#2563EB' },
                }}
              >
                O nas
              </Button>
              <Button 
                variant="contained" 
                onClick={handleLogin}
                sx={{ 
                  bgcolor: '#2563EB', 
                  '&:hover': { bgcolor: '#1D4ED8' },
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
              >
                Zaloguj się
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          pt: 8,
          pb: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '4rem' },
              mb: 3,
              lineHeight: 1.1,
            }}
          >
            Zarządzaj projektami budowlanymi
            <br />
            <span style={{ color: '#FBBF24' }}>jak nigdy dotąd</span>
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              opacity: 0.9, 
              maxWidth: '800px', 
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Platforma SaaS dedykowana polskiemu rynkowi budowlanemu. 
            Dla kierowników budowy i inwestorów indywidualnych.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: '#FBBF24',
                color: '#1F2937',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                '&:hover': { bgcolor: '#F59E0B' },
                boxShadow: '0 4px 14px 0 rgba(251, 191, 36, 0.4)',
              }}
            >
              Rozpocznij darmowy trial
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                borderWidth: 2,
                '&:hover': { 
                  borderColor: 'white', 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderWidth: 2,
                },
              }}
            >
              Zobacz demo
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {stats.map((stat, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' }, textAlign: 'center' }}>
              <Typography 
                variant="h2" 
                component="div" 
                sx={{ 
                  fontWeight: 800, 
                  color: '#2563EB',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                {stat.number}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Features Section */}
      <Box id="features" sx={{ bgcolor: '#F9FAFB', py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 800, 
                color: '#1F2937',
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 3,
              }}
            >
              Wszystko czego potrzebujesz
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: '600px', 
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              Kompleksowa platforma do zarządzania projektami budowlanymi
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    p: 4,
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    borderRadius: 3,
                    '&:hover': {
                      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#1F2937',
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      lineHeight: 1.6,
                      fontSize: '1.1rem',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Container id="pricing" maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 800, 
              color: '#1F2937',
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 3,
            }}
          >
            Wybierz plan dla siebie
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            Elastyczne plany dostosowane do Twoich potrzeb
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {plans.map((plan, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' }, maxWidth: { md: '360px' } }}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: plan.popular ? 3 : 1,
                  borderColor: plan.popular ? plan.color : '#E5E7EB',
                  borderRadius: 3,
                  overflow: 'visible',
                  boxShadow: plan.popular ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  transform: plan.popular ? 'scale(1.05)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {plan.popular && (
                  <Chip
                    label="Najpopularniejszy"
                    sx={{ 
                      position: 'absolute', 
                      top: -12, 
                      left: '50%', 
                      transform: 'translateX(-50%)',
                      bgcolor: plan.color,
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                )}
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 700,
                      color: '#1F2937',
                    }}
                  >
                    {plan.name}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{ mb: 3 }}
                  >
                    {plan.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', my: 3 }}>
                    <Typography 
                      variant="h2" 
                      component="span" 
                      sx={{ 
                        fontWeight: 800, 
                        color: plan.color,
                        fontSize: { xs: '2.5rem', md: '3rem' },
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      component="span" 
                      color="text.secondary" 
                      sx={{ ml: 1, fontWeight: 500 }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>
                  <List dense sx={{ py: 0 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon sx={{ color: '#059669' }} fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          sx={{ 
                            '& .MuiListItemText-primary': { 
                              fontWeight: 500,
                              fontSize: '1rem',
                            } 
                          }} 
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <Box sx={{ p: 4, pt: 0 }}>
                  <Button
                    variant={plan.popular ? 'contained' : 'outlined'}
                    fullWidth
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: plan.popular ? plan.color : 'transparent',
                      color: plan.popular ? 'white' : plan.color,
                      borderColor: plan.color,
                      borderWidth: 2,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: plan.popular ? plan.color : plan.color,
                        color: 'white',
                        borderColor: plan.color,
                        borderWidth: 2,
                      },
                    }}
                  >
                    Wybierz plan
                  </Button>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Testimonials Section */}
      <Box id="about" sx={{ bgcolor: '#F9FAFB', py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              sx={{ 
                fontWeight: 800, 
                color: '#1F2937',
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 3,
              }}
            >
              Co mówią nasi klienci
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {testimonials.map((testimonial, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
                <Paper 
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: '#2563EB', 
                        mr: 2,
                        width: 56,
                        height: 56,
                        fontSize: '1.2rem',
                        fontWeight: 600,
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h6" 
                        component="h4" 
                        sx={{ 
                          fontWeight: 700,
                          color: '#1F2937',
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                      >
                        {testimonial.role} • {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      fontSize: '1.1rem',
                      mb: 2,
                    }}
                  >
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: '#FBBF24' }} fontSize="small" />
                    ))}
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 800, 
              fontSize: { xs: '2rem', md: '3rem' },
              mb: 3,
            }}
          >
            Gotowy na rewolucję?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              opacity: 0.9,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Dołącz do tysięcy kierowników budowy i inwestorów, którzy już używają BuildWise
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: '#FBBF24',
                color: '#1F2937',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                '&:hover': { bgcolor: '#F59E0B' },
                boxShadow: '0 4px 14px 0 rgba(251, 191, 36, 0.4)',
              }}
            >
              Rozpocznij darmowy trial
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                borderWidth: 2,
                '&:hover': { 
                  borderColor: 'white', 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderWidth: 2,
                },
              }}
            >
              Skontaktuj się z nami
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1F2937', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33%' } }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 800,
                  color: '#2563EB',
                  mb: 3,
                }}
              >
                BuildWise
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8, 
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Platforma SaaS do zarządzania projektami budowlanymi. 
                Dedykowana polskiemu rynkowi.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ color: '#6B7280' }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  tech@buildwise.pl
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 15%' } }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                }}
              >
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
                <ListItem sx={{ px: 0, py: 0.5, cursor: 'pointer' }}>
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
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 15%' } }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Wsparcie
              </Typography>
              <List dense sx={{ py: 0 }}>
                <ListItem 
                  sx={{ px: 0, py: 0.5, cursor: 'pointer' }}
                  onClick={() => navigate('/documentation')}
                >
                  <ListItemText 
                    primary="Dokumentacja" 
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
                  onClick={() => navigate('/contact')}
                >
                  <ListItemText 
                    primary="Kontakt" 
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
                  onClick={() => navigate('/status')}
                >
                  <ListItemText 
                    primary="Status" 
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
                  onClick={() => navigate('/faq')}
                >
                  <ListItemText 
                    primary="FAQ" 
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
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 15%' } }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                }}
              >
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
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 15%' } }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                }}
              >
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
          <Box sx={{ borderTop: '1px solid #374151', mt: 6, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © 2024 BuildWise. Wszystkie prawa zastrzeżone.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;