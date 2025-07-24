# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y lock (y evitar reinstalar innecesario)
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del proyecto
COPY . .

# Construir la app Next.js
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar sólo los archivos necesarios desde la build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Establecer variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=3000

# Exponer el puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
