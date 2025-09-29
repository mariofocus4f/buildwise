# BuildWise - Construction Management Platform

BuildWise to nowoczesna platforma do zarządzania projektami budowlanymi, która umożliwia zespołom budowlanym efektywne planowanie, monitorowanie i realizację projektów.

## 🚀 Funkcje

### Główne moduły:
- **Dashboard** - Przegląd projektów i kluczowych statystyk
- **Budżet** - Kontrola kosztów, wydatków i prognoz
- **Wykonawcy** - Zarządzanie wykonawcami z ocenami i komunikacją
- **Harmonogram** - Oś czasu, kamienie milowe i postęp projektu
- **Dokumenty** - Cyfrowe repozytorium z galerią i podglądem
- **Projekty** - Zarządzanie projektami budowlanymi
- **Zadania** - Planowanie i śledzenie zadań
- **Użytkownicy** - Zarządzanie zespołem (Admin)

### Kluczowe możliwości:
- ✅ Zarządzanie projektami z fazami i harmonogramami
- ✅ Przypisywanie zadań z priorytetami i terminami
- ✅ Upload i organizacja dokumentów
- ✅ System komentarzy i powiadomień
- ✅ Role użytkowników (User, Manager, Admin)
- ✅ Responsywny design
- ✅ Bezpieczna autentykacja JWT

## 🛠️ Technologie

### Backend:
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** Authentication
- **Cloudinary** (file uploads)
- **Express Validator**
- **Bcrypt** (password hashing)

### Frontend:
- **React 18** + **TypeScript**
- **Material-UI (MUI)** - Design system
- **React Router** - Navigation
- **React Query** - Data fetching
- **React Hook Form** - Form handling
- **Yup** - Validation

## 📦 Instalacja

### Wymagania:
- Node.js (v16+)
- MongoDB
- npm lub yarn

### 1. Klonowanie repozytorium:
```bash
git clone <repository-url>
cd buildwise
```

### 2. Instalacja zależności:
```bash
# Instalacja wszystkich zależności
npm run install-all

# Lub ręcznie:
npm install
cd server && npm install
cd ../client && npm install
```

### 3. Konfiguracja środowiska:

#### Backend (.env):
```bash
cp server/env.example server/.env
```

Edytuj `server/.env`:
```env
PORT=5000
NONGODB_URI=mongodb://localhost:27017/buildwise
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLIENT_URL=http://localhost:3000
```

#### Frontend (.env):
```bash
cp client/env.example client/.env
```

Edytuj `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Uruchomienie:

#### Development (wszystko jednocześnie):
```bash
npm run dev
```

#### Lub osobno:
```bash
# Backend
npm run server

# Frontend (w nowym terminalu)
npm run client
```

### 5. Dostęp:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 👤 Demo Account

```
Email: admin@buildwise.pl
Hasło: haslo123
```

## 📁 Struktura projektu

```
buildwise/
├── server/                 # Backend API
│   ├── config/            # Konfiguracja bazy danych
│   ├── middleware/        # Middleware (auth, error handling)
│   ├── models/           # Modele MongoDB
│   ├── routes/           # API endpoints
│   └── index.js          # Główny plik serwera
├── client/               # Frontend React
│   ├── public/          # Statyczne pliki
│   ├── src/
│   │   ├── components/  # Komponenty React
│   │   ├── contexts/    # React Context (Auth)
│   │   ├── pages/       # Strony aplikacji
│   │   ├── services/    # API services
│   │   ├── types/       # TypeScript types
│   │   └── App.tsx      # Główny komponent
│   └── package.json
├── package.json         # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication:
- `POST /api/auth/login` - Logowanie
- `POST /api/auth/register` - Rejestracja
- `GET /api/auth/me` - Aktualny użytkownik
- `PUT /api/auth/profile` - Aktualizacja profilu

### Projects:
- `GET /api/projects` - Lista projektów
- `POST /api/projects` - Nowy projekt
- `GET /api/projects/:id` - Szczegóły projektu
- `PUT /api/projects/:id` - Aktualizacja projektu
- `DELETE /api/projects/:id` - Usunięcie projektu

### Tasks:
- `GET /api/tasks` - Lista zadań
- `POST /api/tasks` - Nowe zadanie
- `PUT /api/tasks/:id` - Aktualizacja zadania
- `POST /api/tasks/:id/comments` - Komentarz do zadania

### Documents:
- `GET /api/documents` - Lista dokumentów
- `POST /api/documents/upload` - Upload dokumentu
- `GET /api/documents/:id/download` - Pobieranie dokumentu

## 🚀 Deployment

### Production Build:
```bash
# Build frontend
npm run build

# Start production server
npm start
```

### Environment Variables (Production):
- `NODE_ENV=production`
- `MONGODB_URI=<production-mongodb-url>`
- `JWT_SECRET=<strong-secret>`
- `CLOUDINARY_*=<production-cloudinary-credentials>`

## 📈 Roadmap

### Wersja 1.1:
- [ ] System powiadomień
- [ ] Kalendarz projektów
- [ ] Mobile app (React Native)
- [ ] Integracja z zewnętrznymi API

### Wersja 1.2:
- [ ] AI-powered analytics
- [ ] IoT sensors integration
- [ ] VR/AR visualization
- [ ] Blockchain smart contracts

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: tech@buildwise.pl
- **Documentation**: docs.buildwise.pl
- **Status Page**: status.buildwise.pl

---

**BuildWise** - Nowoczesne zarządzanie projektami budowlanymi 🏗️
