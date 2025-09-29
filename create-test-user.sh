#!/bin/bash

# Skrypt do stworzenia testowego użytkownika w BuildWise

echo "🔧 Tworzenie testowego użytkownika..."

curl -X POST https://web-production-d18c0.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Admin",
    "lastName": "Test",
    "email": "admin@buildwise.pl",
    "password": "haslo123",
    "company": "BuildWise Demo",
    "phone": "+48 123 456 789"
  }'

echo -e "\n\n✅ Użytkownik utworzony!"
echo "📧 Email: admin@buildwise.pl"
echo "🔑 Hasło: haslo123"
