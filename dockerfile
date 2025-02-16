# Utilizar una imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto en el que se ejecuta tu backend
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
