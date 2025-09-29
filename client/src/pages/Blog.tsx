import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
} from '@mui/material';
import Footer from '../components/Footer';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const Blog: React.FC = () => {
  const posts = [
    {
      title: '10 najczęstszych błędów przy budowie domu',
      excerpt: 'Poznaj pułapki, których możesz uniknąć przy budowie własnego domu. Praktyczne porady od ekspertów.',
      category: 'Poradniki',
      date: '15 marca 2024',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
    },
    {
      title: 'Jak kontrolować budżet budowy? Kompletny przewodnik',
      excerpt: 'Szczegółowy poradnik jak nie przekroczyć budżetu i efektywnie zarządzać finansami projektu budowlanego.',
      category: 'Finanse',
      date: '10 marca 2024',
      image: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=800',
    },
    {
      title: 'Nowe przepisy budowlane 2024 - co musisz wiedzieć?',
      excerpt: 'Przegląd najważniejszych zmian w prawie budowlanym, które weszły w życie w 2024 roku.',
      category: 'Prawo',
      date: '5 marca 2024',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
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
          Blog BuildWise
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '700px', mx: 'auto' }}
        >
          Praktyczne porady, nowości branżowe i inspiracje dla budowniczych
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
          {posts.map((post, index) => (
            <Card key={index} sx={{ display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 }, transition: 'box-shadow 0.3s' }}>
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2 }}>
                  <Chip label={post.category} size="small" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    {post.date}
                  </Typography>
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>
                  {post.excerpt}
                </Typography>
                <Button 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ alignSelf: 'flex-start', color: '#2563EB' }}
                >
                  Czytaj więcej
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body1" color="text.secondary" paragraph>
            Więcej artykułów wkrótce...
          </Typography>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default Blog;
