# 🚀 Deployment na Railway

## Przygotowanie projektu

### 1. Inicjalizacja Git (jeśli jeszcze nie zrobione)
```bash
git init
git add .
git commit -m "Initial commit - BuildWise platform"
```

### 2. Utwórz repozytorium na GitHub
1. Wejdź na https://github.com/new
2. Nazwij repo: `buildwise`
3. Stwórz repozytorium
4. Połącz lokalne repo:

```bash
git remote add origin https://github.com/TWOJA-NAZWA/buildwise.git
git branch -M main
git push -u origin main
```

## Deployment na Railway

### 1. Utwórz konto na Railway
- Wejdź na https://railway.app/
- Zaloguj się przez GitHub

### 2. Stwórz nowy projekt
1. Kliknij "New Project"
2. Wybierz "Deploy from GitHub repo"
3. Wybierz repozytorium `buildwise`

### 3. Dodaj MongoDB
1. W projekcie kliknij "+ New"
2. Wybierz "Database" → "MongoDB"
3. Railway automatycznie stworzy bazę i połączy z aplikacją

### 4. Skonfiguruj zmienne środowiskowe

W zakładce "Variables" dodaj:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=${{MongoDB.MONGO_URL}}
JWT_SECRET=twoj-super-tajny-klucz-min-32-znaki-losowe
JWT_EXPIRE=7d
CLIENT_URL=https://buildwise.up.railway.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Opcjonalnie (email):**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=twoj-email@gmail.com
EMAIL_PASS=haslo-aplikacji
```

**Opcjonalnie (Cloudinary):**
```env
CLOUDINARY_CLOUD_NAME=twoja-nazwa
CLOUDINARY_API_KEY=twoj-klucz
CLOUDINARY_API_SECRET=twoj-sekret
```

### 5. Wygeneruj JWT Secret
```bash
# W terminalu:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6. Deploy
Railway automatycznie zdeployuje aplikację po pushu do GitHub!

```bash
git add .
git commit -m "Configure for Railway deployment"
git push
```

### 7. Sprawdź deployment
1. W Railway przejdź do "Deployments"
2. Poczekaj aż status zmieni się na "Success" (3-5 minut)
3. Kliknij "View Logs" aby zobaczyć logi
4. Kliknij wygenerowany URL aby otworzyć aplikację

## 🎯 Checklist przed deployment

- [ ] `.env` nie jest w git (jest w `.gitignore`)
- [ ] Wszystkie zmienne środowiskowe są ustawione w Railway
- [ ] MongoDB jest podłączona
- [ ] JWT_SECRET jest losowy i bezpieczny
- [ ] CLIENT_URL wskazuje na Railway URL
- [ ] Build działa lokalnie: `npm run build`

## 🔧 Komendy Railway CLI (opcjonalnie)

Zainstaluj Railway CLI:
```bash
npm install -g @railway/cli
```

Login:
```bash
railway login
```

Link do projektu:
```bash
railway link
```

Zobacz logi:
```bash
railway logs
```

Deploy ręcznie:
```bash
railway up
```

## 📊 Monitoring

Po deployment:
1. Sprawdź `/api/health` endpoint
2. Przetestuj login/register
3. Sprawdź połączenie z MongoDB
4. Przetestuj wszystkie moduły

## 🐛 Troubleshooting

### Build failed
- Sprawdź logi w Railway
- Upewnij się że `npm run build` działa lokalnie
- Sprawdź czy wszystkie dependencies są w `package.json`

### Database connection error
- Sprawdź czy MongoDB jest podłączona
- Sprawdź zmienną `MONGODB_URI`
- Sprawdź whitelist IP w MongoDB (ustaw 0.0.0.0/0 dla Railway)

### 404 na wszystkich stronach
- Sprawdź czy build frontendu się wykonał
- Sprawdź ścieżki w `server/index.js`
- Upewnij się że `NODE_ENV=production`

### CORS errors
- Sprawdź `CLIENT_URL` w zmiennych środowiskowych
- Sprawdź konfigurację CORS w `server/index.js`

## 🎉 Gotowe!

Twoja aplikacja BuildWise jest teraz live na:
`https://buildwise.up.railway.app` (lub podobny URL)

---

**Potrzebujesz pomocy?**
- Railway Docs: https://docs.railway.app/
- Railway Discord: https://discord.gg/railway
