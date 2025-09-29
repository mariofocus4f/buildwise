import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import Footer from '../components/Footer';
import { Description as DescriptionIcon } from '@mui/icons-material';

const Terms: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#F9FAFB', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <DescriptionIcon sx={{ fontSize: 64, color: '#2563EB', mb: 2 }} />
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ fontWeight: 800, mb: 2, color: '#1F2937' }}
          >
            Regulamin serwisu
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ostatnia aktualizacja: 1 stycznia 2024
          </Typography>
        </Box>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Regulamin świadczenia usług platformy BuildWise
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            § 1. Postanowienia ogólne
          </Typography>
          <Typography variant="body1" paragraph>
            1. Niniejszy Regulamin określa zasady korzystania z platformy BuildWise (zwanej dalej "Platformą").
          </Typography>
          <Typography variant="body1" paragraph>
            2. Operatorem Platformy jest BuildWise Sp. z o.o. z siedzibą w Warszawie, 
            ul. Budowlana 123, 00-001 Warszawa, NIP: 1234567890.
          </Typography>
          <Typography variant="body1" paragraph>
            3. Kontakt z Operatorem możliwy jest pod adresem e-mail: kontakt@buildwise.pl 
            lub telefonicznie: +48 123 456 789.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            § 2. Definicje
          </Typography>
          <Box component="ol" sx={{ pl: 3, mb: 2 }}>
            <li>
              <Typography variant="body1" paragraph>
                <strong>Platforma</strong> - serwis internetowy dostępny pod adresem buildwise.pl 
                wraz z aplikacjami mobilnymi
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                <strong>Użytkownik</strong> - osoba fizyczna, osoba prawna lub jednostka organizacyjna 
                nieposiadająca osobowości prawnej, korzystająca z Platformy
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                <strong>Konto</strong> - zbiór zasobów i uprawnień przypisanych do Użytkownika
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                <strong>Projekt</strong> - projekt budowlany zarządzany przez Użytkownika w Platformie
              </Typography>
            </li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            § 3. Warunki korzystania z Platformy
          </Typography>
          <Typography variant="body1" paragraph>
            1. Korzystanie z Platformy wymaga rejestracji i utworzenia Konta.
          </Typography>
          <Typography variant="body1" paragraph>
            2. Użytkownik może założyć tylko jedno Konto.
          </Typography>
          <Typography variant="body1" paragraph>
            3. Rejestracja jest dobrowolna i bezpłatna dla planu podstawowego.
          </Typography>
          <Typography variant="body1" paragraph>
            4. Użytkownik zobowiązany jest do podania prawdziwych danych podczas rejestracji.
          </Typography>
          <Typography variant="body1" paragraph>
            5. Użytkownik ponosi odpowiedzialność za bezpieczeństwo swojego hasła.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            § 4. Zasady korzystania z Konta
          </Typography>
          <Typography variant="body1" paragraph>
            1. Użytkownik zobowiązany jest do:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Korzystania z Platformy zgodnie z prawem i dobrymi obyczajami</Typography></li>
            <li><Typography variant="body1">Niepodejmowania działań utrudniających funkcjonowanie Platformy</Typography></li>
            <li><Typography variant="body1">Nieudostępniania swojego Konta osobom trzecim</Typography></li>
            <li><Typography variant="body1">Natychmiastowego informowania o nieautoryzowanym dostępie do Konta</Typography></li>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            § 5. Usługi płatne
          </Typography>
          <Typography variant="body1" paragraph>
            1. Platforma oferuje plany płatne: Start (29 PLN/mies.), Pro (49 PLN/mies.), Enterprise (indywidualna wycena).
          </Typography>
          <Typography variant="body1" paragraph>
            2. Opłaty pobierane są z góry, cyklicznie zgodnie z wybranym okresem rozliczeniowym.
          </Typography>
          <Typography variant="body1" paragraph>
            3. Użytkownik może w każdej chwili zmienić lub anulować plan.
          </Typography>
          <Typography variant="body1" paragraph>
            4. Płatności realizowane są przez zewnętrznych operatorów płatności.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            § 6. Własność intelektualna
          </Typography>
          <Typography variant="body1" paragraph>
            1. Wszystkie prawa do Platformy, w tym prawa autorskie, należą do Operatora.
          </Typography>
          <Typography variant="body1" paragraph>
            2. Dane i treści wprowadzone przez Użytkownika pozostają jego własnością.
          </Typography>
          <Typography variant="body1" paragraph>
            3. Użytkownik udziela Operatorowi licencji na przetwarzanie danych w celu świadczenia usług.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            § 7. Odpowiedzialność
          </Typography>
          <Typography variant="body1" paragraph>
            1. Operator nie ponosi odpowiedzialności za:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 2 }}>
            <li><Typography variant="body1">Treści wprowadzane przez Użytkowników</Typography></li>
            <li><Typography variant="body1">Szkody powstałe w wyniku nieprawidłowego korzystania z Platformy</Typography></li>
            <li><Typography variant="body1">Przerwy w dostępie wynikające z czynników zewnętrznych</Typography></li>
          </Box>
          <Typography variant="body1" paragraph>
            2. Operator dołoży starań, aby Platforma działała nieprzerwanie i bezpiecznie.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            § 8. Reklamacje
          </Typography>
          <Typography variant="body1" paragraph>
            1. Reklamacje należy składać na adres: reklamacje@buildwise.pl
          </Typography>
          <Typography variant="body1" paragraph>
            2. Reklamacja powinna zawierać: opis problemu, dane kontaktowe, datę zdarzenia.
          </Typography>
          <Typography variant="body1" paragraph>
            3. Reklamacje rozpatrywane są w ciągu 14 dni roboczych.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            § 9. Odstąpienie od umowy
          </Typography>
          <Typography variant="body1" paragraph>
            1. Konsument może odstąpić od umowy w ciągu 14 dni bez podania przyczyny.
          </Typography>
          <Typography variant="body1" paragraph>
            2. Oświadczenie o odstąpieniu należy wysłać na: kontakt@buildwise.pl
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mt: 3 }}>
            § 10. Postanowienia końcowe
          </Typography>
          <Typography variant="body1" paragraph>
            1. Operator zastrzega sobie prawo do zmiany Regulaminu.
          </Typography>
          <Typography variant="body1" paragraph>
            2. O zmianach Użytkownicy zostaną poinformowani z 7-dniowym wyprzedzeniem.
          </Typography>
          <Typography variant="body1" paragraph>
            3. W sprawach nieuregulowanych Regulaminem zastosowanie mają przepisy prawa polskiego.
          </Typography>
          <Typography variant="body1" paragraph>
            4. Ewentualne spory rozstrzygane będą przez sąd właściwy dla siedziby Operatora.
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Terms;
