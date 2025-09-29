import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
          Skontaktuj się z nami
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
        >
          Masz pytania? Chętnie pomożemy! Skontaktuj się z nami przez formularz lub bezpośrednio.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {/* Contact Info Cards */}
          <Box>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <CardContent>
                <Box sx={{ 
                  width: 64, 
                  height: 64, 
                  borderRadius: '50%', 
                  bgcolor: '#EEF2FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}>
                  <EmailIcon sx={{ fontSize: 32, color: '#2563EB' }} />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  Email
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Napisz do nas
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#2563EB' }}>
                  kontakt@buildwise.pl
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  tech@buildwise.pl
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <CardContent>
                <Box sx={{ 
                  width: 64, 
                  height: 64, 
                  borderRadius: '50%', 
                  bgcolor: '#F0FDF4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}>
                  <PhoneIcon sx={{ fontSize: 32, color: '#10B981' }} />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  Telefon
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Zadzwoń do nas
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#10B981' }}>
                  +48 123 456 789
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pn-Pt: 9:00 - 17:00
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <CardContent>
                <Box sx={{ 
                  width: 64, 
                  height: 64, 
                  borderRadius: '50%', 
                  bgcolor: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}>
                  <LocationIcon sx={{ fontSize: 32, color: '#F59E0B' }} />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  Adres
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Odwiedź nas
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ul. Budowlana 123
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  00-001 Warszawa
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Contact Form */}
          <Box sx={{ gridColumn: '1 / -1' }}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Wyślij wiadomość
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
                  <Box>
                    <TextField
                      fullWidth
                      label="Imię i nazwisko"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <TextField
                      fullWidth
                      label="Temat"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <TextField
                      fullWidth
                      label="Wiadomość"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ gridColumn: '1 / -1' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<SendIcon />}
                      sx={{
                        bgcolor: '#2563EB',
                        '&:hover': { bgcolor: '#1D4ED8' },
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      Wyślij wiadomość
                    </Button>
                  </Box>
                </Box>
              </form>
            </Paper>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Contact;
