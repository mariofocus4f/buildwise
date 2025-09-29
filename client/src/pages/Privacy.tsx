import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import Footer from '../components/Footer';
import { PrivacyTip as PrivacyIcon } from '@mui/icons-material';

const Privacy: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <PrivacyIcon sx={{ fontSize: 64, color: '#2563EB', mb: 2 }} />
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ fontWeight: 800, mb: 2, color: '#1F2937' }}
          >
            Polityka Prywatności
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ostatnia aktualizacja: 1 stycznia 2024
          </Typography>
        </Box>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Polityka Prywatności platformy BuildWise
          </Typography>

          <Typography variant="body1" paragraph>
            Niniejsza Polityka Prywatności opisuje zasady przetwarzania i ochrony danych osobowych 
            przekazanych przez Użytkowników w związku z korzystaniem z platformy BuildWise.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            1. Administrator danych
          </Typography>
          <Typography variant="body1" paragraph>
            Administratorem danych osobowych jest BuildWise Sp. z o.o.:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Adres: ul. Budowlana 123, 00-001 Warszawa</Typography></li>
            <li><Typography variant="body1">NIP: 1234567890</Typography></li>
            <li><Typography variant="body1">E-mail: kontakt@buildwise.pl</Typography></li>
            <li><Typography variant="body1">Telefon: +48 123 456 789</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            2. Jakie dane zbieramy
          </Typography>
          <Typography variant="body1" paragraph>
            Zbieramy następujące kategorie danych osobowych:
          </Typography>
          
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>
            2.1. Dane podane podczas rejestracji:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Imię i nazwisko</Typography></li>
            <li><Typography variant="body1">Adres e-mail</Typography></li>
            <li><Typography variant="body1">Numer telefonu</Typography></li>
            <li><Typography variant="body1">Nazwa firmy (opcjonalnie)</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>
            2.2. Dane generowane automatycznie:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Adres IP</Typography></li>
            <li><Typography variant="body1">Typ i wersja przeglądarki</Typography></li>
            <li><Typography variant="body1">System operacyjny</Typography></li>
            <li><Typography variant="body1">Data i czas wizyty</Typography></li>
            <li><Typography variant="body1">Informacje o aktywności w serwisie</Typography></li>
          </Box>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2 }}>
            2.3. Dane dotyczące projektów:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Informacje o projektach budowlanych</Typography></li>
            <li><Typography variant="body1">Zdjęcia i dokumenty</Typography></li>
            <li><Typography variant="body1">Notatki i komentarze</Typography></li>
            <li><Typography variant="body1">Dane budżetowe</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            3. Cele przetwarzania danych
          </Typography>
          <Typography variant="body1" paragraph>
            Przetwarzamy dane osobowe w następujących celach:
          </Typography>
          <Box component="ol" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Świadczenie usług platformy BuildWise</Typography></li>
            <li><Typography variant="body1">Obsługa konta użytkownika</Typography></li>
            <li><Typography variant="body1">Komunikacja z użytkownikami</Typography></li>
            <li><Typography variant="body1">Rozliczanie płatności</Typography></li>
            <li><Typography variant="body1">Marketing własnych produktów i usług (za zgodą)</Typography></li>
            <li><Typography variant="body1">Analiza statystyk i ulepszanie usług</Typography></li>
            <li><Typography variant="body1">Zapewnienie bezpieczeństwa i wykrywanie nadużyć</Typography></li>
            <li><Typography variant="body1">Wypełnienie obowiązków prawnych</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            4. Podstawy prawne przetwarzania
          </Typography>
          <Typography variant="body1" paragraph>
            Przetwarzamy dane na podstawie:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Wykonania umowy (art. 6 ust. 1 lit. b RODO)</Typography></li>
            <li><Typography variant="body1">Zgody użytkownika (art. 6 ust. 1 lit. a RODO)</Typography></li>
            <li><Typography variant="body1">Prawnie uzasadnionego interesu (art. 6 ust. 1 lit. f RODO)</Typography></li>
            <li><Typography variant="body1">Obowiązku prawnego (art. 6 ust. 1 lit. c RODO)</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            5. Udostępnianie danych
          </Typography>
          <Typography variant="body1" paragraph>
            Dane osobowe mogą być przekazywane:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Dostawcom usług IT (hosting, backup, poczta)</Typography></li>
            <li><Typography variant="body1">Operatorom płatności</Typography></li>
            <li><Typography variant="body1">Biurom rachunkowym i kancelariom prawnym</Typography></li>
            <li><Typography variant="body1">Organom państwowym na żądanie i zgodnie z prawem</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            Nie przekazujemy danych do państw trzecich poza Europejskim Obszarem Gospodarczym.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            6. Cookies i technologie śledzące
          </Typography>
          <Typography variant="body1" paragraph>
            Platforma używa plików cookies i podobnych technologii w celu:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Zapamiętywania preferencji użytkownika</Typography></li>
            <li><Typography variant="body1">Analizy ruchu na stronie</Typography></li>
            <li><Typography variant="body1">Personalizacji treści</Typography></li>
            <li><Typography variant="body1">Remarketingu</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            Użytkownik może w każdej chwili zmienić ustawienia cookies w swojej przeglądarce.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            7. Bezpieczeństwo danych
          </Typography>
          <Typography variant="body1" paragraph>
            Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony danych:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Szyfrowanie połączeń SSL/TLS</Typography></li>
            <li><Typography variant="body1">Szyfrowanie danych w bazie</Typography></li>
            <li><Typography variant="body1">Regularne kopie zapasowe</Typography></li>
            <li><Typography variant="body1">Kontrola dostępu do systemów</Typography></li>
            <li><Typography variant="body1">Monitorowanie bezpieczeństwa</Typography></li>
            <li><Typography variant="body1">Szkolenia pracowników</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            8. Prawa użytkownika
          </Typography>
          <Typography variant="body1" paragraph>
            Użytkownik ma prawo do:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Dostępu do swoich danych</Typography></li>
            <li><Typography variant="body1">Sprostowania nieprawidłowych danych</Typography></li>
            <li><Typography variant="body1">Usunięcia danych</Typography></li>
            <li><Typography variant="body1">Ograniczenia przetwarzania</Typography></li>
            <li><Typography variant="body1">Przenoszenia danych</Typography></li>
            <li><Typography variant="body1">Wniesienia sprzeciwu</Typography></li>
            <li><Typography variant="body1">Cofnięcia zgody</Typography></li>
            <li><Typography variant="body1">Wniesienia skargi do UODO</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            W celu skorzystania z powyższych praw prosimy o kontakt: rodo@buildwise.pl
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            9. Okres przechowywania danych
          </Typography>
          <Typography variant="body1" paragraph>
            Dane przechowujemy przez okres:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Niezbędny do świadczenia usług</Typography></li>
            <li><Typography variant="body1">Wymagany przepisami prawa (min. 5 lat dla danych księgowych)</Typography></li>
            <li><Typography variant="body1">Do momentu cofnięcia zgody (dla marketingu)</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            10. Zmiany w Polityce Prywatności
          </Typography>
          <Typography variant="body1" paragraph>
            Zastrzegamy sobie prawo do wprowadzania zmian w Polityce Prywatności. 
            O istotnych zmianach poinformujemy z odpowiednim wyprzedzeniem.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            W razie pytań dotyczących Polityki Prywatności prosimy o kontakt: kontakt@buildwise.pl
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Privacy;
