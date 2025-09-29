import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Chip,
} from '@mui/material';
import Footer from '../components/Footer';
import { Code as CodeIcon } from '@mui/icons-material';

const APIPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          align="center"
          sx={{ fontWeight: 800, mb: 2, color: '#1F2937' }}
        >
          BuildWise API
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
        >
          Zintegruj BuildWise ze swoimi narzędziami i systemami
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Dokumentacja API
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            BuildWise oferuje RESTful API, które pozwala na integrację z zewnętrznymi systemami i automatyzację procesów.
          </Typography>

          <Box sx={{ mt: 3, p: 3, bgcolor: '#1F2937', borderRadius: 2, color: 'white', fontFamily: 'monospace' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Base URL:
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              https://api.buildwise.pl/v1
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              Example Request:
            </Typography>
            <Box sx={{ bgcolor: '#111827', p: 2, borderRadius: 1 }}>
              <pre style={{ margin: 0, fontSize: '0.9rem' }}>
{`curl -X GET "https://api.buildwise.pl/v1/projects" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </pre>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
          <Paper sx={{ p: 3 }}>
            <CodeIcon sx={{ fontSize: 40, color: '#2563EB', mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              RESTful API
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Standardowe REST endpoints z dokumentacją OpenAPI/Swagger
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ color: '#10B981', mb: 2 }}>⚡</Typography>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Rate Limiting
            </Typography>
            <Typography variant="body2" color="text.secondary">
              1000 żądań / godzinę dla planu Pro, 10000 dla Enterprise
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ color: '#F59E0B', mb: 2 }}>🔒</Typography>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Bezpieczeństwo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              OAuth 2.0, API Keys, HTTPS, rate limiting
            </Typography>
          </Paper>
        </Box>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Dostępne Endpoints
          </Typography>
          <Box sx={{ mt: 3 }}>
            {[
              { method: 'GET', endpoint: '/projects', description: 'Lista wszystkich projektów' },
              { method: 'POST', endpoint: '/projects', description: 'Utwórz nowy projekt' },
              { method: 'GET', endpoint: '/tasks', description: 'Lista zadań' },
              { method: 'POST', endpoint: '/documents', description: 'Upload dokumentu' },
              { method: 'GET', endpoint: '/budget', description: 'Pobranie danych budżetu' },
            ].map((endpoint, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 2,
                  borderBottom: '1px solid #E5E7EB',
                }}
              >
                <Chip 
                  label={endpoint.method}
                  size="small"
                  sx={{ 
                    bgcolor: endpoint.method === 'GET' ? '#DBEAFE' : '#DCFCE7',
                    color: endpoint.method === 'GET' ? '#1E40AF' : '#166534',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                  }}
                />
                <Typography variant="body1" sx={{ fontFamily: 'monospace', flex: 1 }}>
                  {endpoint.endpoint}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {endpoint.description}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' }, px: 4 }}
            >
              Pełna dokumentacja API
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default APIPage;
