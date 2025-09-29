import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import Footer from '../components/Footer';
import { Shield as ShieldIcon } from '@mui/icons-material';

const RODO: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <ShieldIcon sx={{ fontSize: 64, color: '#2563EB', mb: 2 }} />
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ fontWeight: 800, mb: 2, color: '#1F2937' }}
          >
            Informacje RODO
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ostatnia aktualizacja: 1 stycznia 2024
          </Typography>
        </Box>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Informacja o przetwarzaniu danych osobowych
          </Typography>

          <Typography variant="body1" paragraph>
            Zgodnie z art. 13 i 14 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 
            z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem 
            danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 
            95/46/WE (ogólne rozporządzenie o ochronie danych - RODO), informujemy, że:
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            1. Administrator danych osobowych
          </Typography>
          <Typography variant="body1" paragraph>
            Administratorem Państwa danych osobowych jest BuildWise Sp. z o.o. z siedzibą w Warszawie, 
            ul. Budowlana 123, 00-001 Warszawa, NIP: 1234567890, REGON: 123456789.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Kontakt: kontakt@buildwise.pl, tel. +48 123 456 789
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            2. Cele i podstawy przetwarzania danych
          </Typography>
          <Typography variant="body1" paragraph>
            Przetwarzamy Państwa dane osobowe w następujących celach:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1" paragraph>
                <strong>Świadczenie usług platformy BuildWise</strong> - na podstawie zawartej umowy 
                (art. 6 ust. 1 lit. b RODO)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                <strong>Marketing</strong> - na podstawie Państwa zgody (art. 6 ust. 1 lit. a RODO) 
                lub naszego prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                <strong>Wypełnienie obowiązków prawnych</strong> - w tym podatkowych i księgowych 
                (art. 6 ust. 1 lit. c RODO)
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                <strong>Dochodzenie lub obrona roszczeń</strong> - na podstawie naszego prawnie 
                uzasadnionego interesu (art. 6 ust. 1 lit. f RODO)
              </Typography>
            </li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            3. Kategorie przetwarzanych danych
          </Typography>
          <Typography variant="body1" paragraph>
            Przetwarzamy następujące kategorie danych osobowych:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Dane identyfikacyjne (imię, nazwisko)</Typography></li>
            <li><Typography variant="body1">Dane kontaktowe (e-mail, telefon, adres)</Typography></li>
            <li><Typography variant="body1">Dane dotyczące projektów budowlanych</Typography></li>
            <li><Typography variant="body1">Dane dotyczące płatności</Typography></li>
            <li><Typography variant="body1">Dane techniczne (adres IP, logi systemowe)</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            4. Okres przechowywania danych
          </Typography>
          <Typography variant="body1" paragraph>
            Państwa dane osobowe będą przechowywane przez okres:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Trwania umowy oraz przez okres przedawnienia roszczeń</Typography></li>
            <li><Typography variant="body1">Wymagany przepisami prawa (np. przepisy podatkowe - 5 lat)</Typography></li>
            <li><Typography variant="body1">Do momentu cofnięcia zgody (w przypadku przetwarzania na podstawie zgody)</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            5. Odbiorcy danych
          </Typography>
          <Typography variant="body1" paragraph>
            Państwa dane mogą być przekazywane następującym kategoriom odbiorców:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Dostawcom usług IT (hosting, poczta elektroniczna)</Typography></li>
            <li><Typography variant="body1">Dostawcom systemów płatności</Typography></li>
            <li><Typography variant="body1">Kancelariom prawnym i biurom rachunkowym</Typography></li>
            <li><Typography variant="body1">Organom państwowym na podstawie przepisów prawa</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            6. Państwa prawa
          </Typography>
          <Typography variant="body1" paragraph>
            Przysługuje Państwu prawo do:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Dostępu do swoich danych osobowych</Typography></li>
            <li><Typography variant="body1">Sprostowania danych</Typography></li>
            <li><Typography variant="body1">Usunięcia danych ("prawo do bycia zapomnianym")</Typography></li>
            <li><Typography variant="body1">Ograniczenia przetwarzania</Typography></li>
            <li><Typography variant="body1">Przenoszenia danych</Typography></li>
            <li><Typography variant="body1">Wniesienia sprzeciwu wobec przetwarzania</Typography></li>
            <li><Typography variant="body1">Cofnięcia zgody w dowolnym momencie</Typography></li>
            <li><Typography variant="body1">Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            7. Informacja o wymogach podania danych
          </Typography>
          <Typography variant="body1" paragraph>
            Podanie danych osobowych jest dobrowolne, ale niezbędne do zawarcia i wykonania umowy 
            oraz korzystania z naszych usług.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            8. Zautomatyzowane podejmowanie decyzji
          </Typography>
          <Typography variant="body1" paragraph>
            Państwa dane nie będą przetwarzane w sposób zautomatyzowany, w tym w formie profilowania.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            W sprawach dotyczących ochrony danych osobowych prosimy o kontakt: rodo@buildwise.pl
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default RODO;
