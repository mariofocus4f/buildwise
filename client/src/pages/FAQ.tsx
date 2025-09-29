import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
} from '@mui/material';
import Footer from '../components/Footer';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: 'Ogólne',
      questions: [
        {
          question: 'Czym jest BuildWise?',
          answer: 'BuildWise to platforma SaaS dedykowana zarządzaniu projektami budowlanymi dla inwestorów indywidualnych i kierowników budowy w Polsce. Oferujemy kompleksowe narzędzia do kontroli budżetu, zarządzania wykonawcami, harmonogramowania prac i dokumentacji cyfrowej.',
        },
        {
          question: 'Czy mogę korzystać z BuildWise za darmo?',
          answer: 'Tak! Oferujemy darmowy plan z podstawowymi funkcjami, który pozwala na zarządzanie jednym projektem. Plan premium z pełnymi funkcjonalnościami kosztuje od 29 PLN/miesiąc.',
        },
        {
          question: 'Czy potrzebuję specjalistycznej wiedzy technicznej?',
          answer: 'Nie! BuildWise jest zaprojektowany z myślą o prostocie użytkowania. Interfejs jest intuicyjny, a proces onboardingu zajmuje zaledwie 5 minut. Oferujemy również video tutoriale po polsku.',
        },
      ],
    },
    {
      category: 'Funkcje',
      questions: [
        {
          question: 'Jak działa kontrola budżetu?',
          answer: 'System pozwala na planowanie budżetu z podziałem na etapy budowy, śledzenie wydatków w czasie rzeczywistym vs. plan, oraz otrzymywanie alertów przy przekroczeniu budżetu. Możesz również integrować faktury i rachunki poprzez zdjęcia z funkcją OCR.',
        },
        {
          question: 'Czy mogę zarządzać wykonawcami?',
          answer: 'Tak! Mamy bazę zweryfikowanych wykonawców z ocenami i portfolio. Możesz monitorować status prac, komunikować się z wykonawcami i przechowywać dokumentację umów i gwarancji.',
        },
        {
          question: 'Czy BuildWise działa na telefonie?',
          answer: 'Tak! Oferujemy aplikację mobilną na iOS i Android z pełną funkcjonalnością, w tym trybem offline dla podstawowych funkcji. Możesz robić zdjęcia z geolokalizacją i timestampem bezpośrednio w aplikacji.',
        },
      ],
    },
    {
      category: 'Płatności',
      questions: [
        {
          question: 'Jakie są dostępne plany cenowe?',
          answer: 'Oferujemy: Plan Darmowy (podstawowe funkcje), Plan Start (29 PLN/mies.), Plan Pro (49 PLN/mies.), oraz Plan Enterprise (indywidualna wycena). Możliwa jest również jednorazowa opłata za projekt (199-299 PLN).',
        },
        {
          question: 'Czy mogę zmienić plan w dowolnym momencie?',
          answer: 'Tak, możesz zmienić plan w każdej chwili. Przy przejściu na wyższy plan, różnica zostanie przeliczona proporcjonalnie. Przy downgrade, nowy plan zacznie obowiązywać od następnego okresu rozliczeniowego.',
        },
        {
          question: 'Jakie metody płatności akceptujecie?',
          answer: 'Akceptujemy karty płatnicze (Visa, Mastercard), BLIK, przelewy bankowe oraz PayPal.',
        },
      ],
    },
    {
      category: 'Bezpieczeństwo',
      questions: [
        {
          question: 'Czy moje dane są bezpieczne?',
          answer: 'Tak! Wszystkie dane są szyfrowane (SSL/TLS), przechowywane w chmurze z automatycznym backupem. Jesteśmy zgodni z RODO i stosujemy najlepsze praktyki bezpieczeństwa.',
        },
        {
          question: 'Gdzie przechowywane są moje dokumenty?',
          answer: 'Dokumenty są przechowywane w bezpiecznej chmurze z automatycznym backupem i redundancją danych. Masz pełną kontrolę nad dostępem do swoich dokumentów.',
        },
      ],
    },
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
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
          Często zadawane pytania
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Znajdź odpowiedzi na najczęściej zadawane pytania
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Szukaj pytania..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* FAQ Sections */}
        {filteredFaqs.map((category, categoryIndex) => (
          <Box key={categoryIndex} sx={{ mb: 4 }}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                color: '#2563EB',
              }}
            >
              {category.category}
            </Typography>
            {category.questions.map((faq, index) => (
              <Accordion 
                key={index}
                sx={{
                  mb: 2,
                  '&:before': { display: 'none' },
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  borderRadius: 2,
                  '&:first-of-type': { borderRadius: 2 },
                  '&:last-of-type': { borderRadius: 2 },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      my: 2,
                    },
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}

        {filteredFaqs.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Nie znaleziono pytań pasujących do "{searchTerm}"
            </Typography>
          </Box>
        )}

        {/* Contact Section */}
        <Box sx={{ textAlign: 'center', mt: 8, p: 4, bgcolor: 'white', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
            Nie znalazłeś odpowiedzi?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Skontaktuj się z nami, chętnie pomożemy!
          </Typography>
          <Typography variant="body2" sx={{ color: '#2563EB', fontWeight: 600 }}>
            kontakt@buildwise.pl
          </Typography>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default FAQ;
