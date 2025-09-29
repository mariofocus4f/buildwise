# 🚀 Publikacja BuildWise na Railway - Krok po kroku

## Krok 1: Przygotowanie GitHub

### 1.1 Utwórz repozytorium na GitHub
1. Wejdź na https://github.com/new
2. Nazwij repozytorium: `buildwise`
3. **NIE** zaznaczaj żadnych opcji (README, .gitignore, license)
4. Kliknij "Create repository"

### 1.2 Połącz lokalne repo z GitHub
Skopiuj i wykonaj komendy (zamień `TWOJA-NAZWA` na swoją nazwę użytkownika GitHub):

```bash
git remote add origin https://github.com/TWOJA-NAZWA/buildwise.git
git branch -M main
git push -u origin main
```

## Krok 2: Konfiguracja Railway

### 2.1 Utwórz konto na Railway
1. Wejdź na https://railway.app/
2. Kliknij "Login" w prawym górnym rogu
3. Wybierz "Login with GitHub"
4. Zaloguj się i autoryzuj Railway

### 2.2 Stwórz nowy projekt
1. Na stronie głównej Railway kliknij **"New Project"**
2. Wybierz **"Deploy from GitHub repo"**
3. Jeśli to pierwsze użycie, kliknij **"Configure GitHub App"**
4. Wybierz repozytorium **`buildwise`**
5. Kliknij na repozytorium, aby je dodać

### 2.3 Dodaj MongoDB
1. W projekcie kliknij **"+ New"** (w prawym górnym rogu)
2. Wybierz **"Database"**
3. Wybierz **"Add MongoDB"**
4. Railway automatycznie stworzy bazę danych

## Krok 3: Konfiguracja zmiennych środowiskowych

### 3.1 Przejdź do ustawień aplikacji
1. Kliknij na serwis aplikacji (nie MongoDB)
2. Przejdź do zakładki **"Variables"**

### 3.2 Dodaj zmienne środowiskowe

Kliknij **"New Variable"** i dodaj następujące zmienne:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=wygeneruj-losowy-32-znakowy-ciag
JWT_EXPIRE=7d
CLIENT_URL=${{RAILWAY_PUBLIC_DOMAIN}}
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3.3 Połącz MongoDB
1. Kliknij **"New Variable"**
2. Wybierz **"Add Reference"**
3. Wybierz MongoDB
4. Wybierz **"MONGO_URL"**
5. Nazwij zmienną: `MONGODB_URI`

### 3.4 Wygeneruj JWT_SECRET

**Opcja A: Online** (szybka)
- Wejdź na: https://generate-random.org/api-token-generator
- Skopiuj wygenerowany token (min. 32 znaki)

**Opcja B: Terminal**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Skopiuj wynik i wklej jako wartość `JWT_SECRET`

## Krok 4: Deployment

### 4.1 Uruchom deployment
Railway automatycznie rozpocznie deployment po:
- Dodaniu repozytorium
- Ustawieniu zmiennych

### 4.2 Monitoruj deployment
1. Przejdź do zakładki **"Deployments"**
2. Kliknij na najnowszy deployment
3. Kliknij **"View Logs"** aby zobaczyć postęp
4. Poczekaj 3-5 minut

### 4.3 Sprawdź status
Szukaj w logach:
```
✅ Build successful
✅ Deployment successful
🚀 BuildWise server running on port 5000
```

## Krok 5: Konfiguracja domeny

### 5.1 Wygeneruj publiczny URL
1. W ustawieniach serwisu aplikacji
2. Przejdź do zakładki **"Settings"**
3. W sekcji **"Networking"** kliknij **"Generate Domain"**
4. Railway wygeneruje URL typu: `buildwise.up.railway.app`

### 5.2 Zaktualizuj CLIENT_URL
1. Skopiuj wygenerowany URL (z https://)
2. Wróć do zakładki **"Variables"**
3. Usuń zmienną `CLIENT_URL`
4. Dodaj nową zmienną `CLIENT_URL` z wartością: `https://twoj-url.up.railway.app`
5. Deployment uruchomi się automatycznie

## Krok 6: Testowanie

### 6.1 Otwórz aplikację
Kliknij na wygenerowany URL lub wejdź na:
```
https://twoj-url.up.railway.app
```

### 6.2 Przetestuj funkcje
1. ✅ Strona główna się ładuje
2. ✅ Nawigacja działa
3. ✅ Kliknij "Rozpocznij darmowy trial"
4. ✅ Wpisz dowolny email i hasło
5. ✅ Zaloguj się (przejdzie do dashboardu)
6. ✅ Sprawdź wszystkie moduły (Budżet, Wykonawcy, Harmonogram, Dokumenty)

### 6.3 Sprawdź API
Wejdź na:
```
https://twoj-url.up.railway.app/api/health
```

Powinno zwrócić:
```json
{
  "success": true,
  "message": "BuildWise API is running",
  "timestamp": "...",
  "environment": "production"
}
```

## Krok 7: Aktualizacje

### 7.1 Jak aktualizować kod
```bash
# Wprowadź zmiany w kodzie
git add .
git commit -m "Opis zmian"
git push
```

Railway automatycznie wykryje zmiany i zdeployuje nową wersję!

### 7.2 Śledzenie logów
```bash
# Zainstaluj Railway CLI (opcjonalnie)
npm install -g @railway/cli

# Zaloguj się
railway login

# Połącz z projektem
railway link

# Zobacz logi na żywo
railway logs
```

## 🎯 Checklist końcowy

Przed udostępnieniem aplikacji sprawdź:

- [ ] MongoDB jest podłączona i działa
- [ ] Wszystkie zmienne środowiskowe są ustawione
- [ ] JWT_SECRET jest losowy i bezpieczny (min. 32 znaki)
- [ ] CLIENT_URL wskazuje na Railway domain
- [ ] Deployment zakończył się sukcesem
- [ ] Strona główna się ładuje
- [ ] Logowanie działa (dowolne dane)
- [ ] Dashboard się wyświetla
- [ ] Wszystkie 4 moduły działają (Budżet, Wykonawcy, Harmonogram, Dokumenty)
- [ ] API health endpoint odpowiada
- [ ] Footer i nawigacja działają poprawnie

## 🐛 Rozwiązywanie problemów

### Problem: Build failed
**Rozwiązanie:**
1. Sprawdź logi w Railway
2. Upewnij się że `npm run build` działa lokalnie:
   ```bash
   npm run install-all
   npm run build
   ```

### Problem: MongoDB connection error
**Rozwiązanie:**
1. Sprawdź czy MongoDB jest dodana do projektu
2. Sprawdź czy zmienna `MONGODB_URI` jest ustawiona i wskazuje na `${{MongoDB.MONGO_URL}}`
3. Zrestartuj deployment

### Problem: 404 na wszystkich stronach React
**Rozwiązanie:**
1. Sprawdź czy `NODE_ENV=production`
2. Sprawdź czy build frontendu się wykonał (w logach powinno być `npm run build`)
3. Sprawdź ścieżki w `server/index.js`

### Problem: CORS errors
**Rozwiązanie:**
1. Sprawdź `CLIENT_URL` - musi zawierać `https://`
2. Sprawdź czy Railway URL jest poprawny
3. Zrestartuj deployment po zmianie `CLIENT_URL`

### Problem: Deployment never completes
**Rozwiązanie:**
1. Sprawdź logi - może brakować `PORT` w zmiennych
2. Sprawdź czy wszystkie dependencies są w `package.json`
3. Spróbuj ręcznego redeploy: Settings → Deployments → Redeploy

## 📞 Pomoc

- **Railway Docs**: https://docs.railway.app/
- **Railway Discord**: https://discord.gg/railway
- **Railway Status**: https://status.railway.app/

## 🎉 Gotowe!

Twoja aplikacja BuildWise jest teraz live na Railway! 🚀

URL: `https://twoj-url.up.railway.app`

Możesz teraz udostępnić link klientom i zacząć używać aplikacji!
