FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Копируем остальной код
COPY . .

EXPOSE 5173

CMD ["yarn", "dev", "--host", "0.0.0.0"]
