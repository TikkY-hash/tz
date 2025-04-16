# GitHub CRM – Бекенд

Бекенд частина CRM-системи для роботи з GitHub-проєктами. Побудований на NestJS із використанням PostgreSQL, TypeORM та Docker.

## ⚙️ Технології

- NestJS
- PostgreSQL 15
- TypeORM
- Docker
- JWT
- ConfigModule
- Валідація через class-validator

## 🔧 Налаштування

1. Створи файл `.env` у директорії `server`:

```env
USERNAME=your_db_username
PASSWORD=your_db_password
HOST=db
DATABASE=your_db_name
DB_PORT=5432

DATABASE_SYNC=true
DATABASE_AUTOLOAD=true

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d

GITHUB_API=https://api.github.com/repos/
CORS_ORIGIN=http://localhost:5173
```

2. Запуск (рекомендовано через Docker):

```bash
docker compose up --build
```

Або вручну (без Docker):

```bash
cd server
yarn install
yarn start:dev
```


## 🛡 Безпека

- Токени: Access + Refresh
- Перевірка через guards
- CORS захист з `whitelist`

## 📃 Ліцензія

MIT
