# GitHub CRM – Фронтенд

Фронтенд частина CRM-системи для роботи з GitHub-проєктами. Побудована на React 19 з використанням сучасних бібліотек, таких як Vite, MUI, TanStack Query, Router та Zustand.

## ⚙️ Технології

- React 19
- Vite
- TypeScript
- Material UI
- TanStack Query
- TanStack Router
- Zustand
- React Hook Form

## 🚀 Запуск

1. Встанови залежності:

```bash
cd frontend
yarn install
```

2. Створи файл `.env` у директорії `frontend`:

```env
VITE_API_URL=http://localhost:3000
```

3. Запусти дев-сервер:

```bash
yarn dev
```

Проєкт буде доступний за адресою: [http://localhost:5173](http://localhost:5173)

## 📁 Структура

- `src/pages` – сторінки
- `src/components` – UI-компоненти
- `src/hooks` – кастомні хуки
- `src/store` – Zustand-стейт
- `src/api` – запити до бекенду

## 📦 Збірка

```bash
yarn build
```

## 📃 Ліцензія

MIT
