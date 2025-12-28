# 🌎 EnviroLab - Backend

**EnviroLab** es un sistema para el monitoreo de parámetros ambientales. Este proyecto permite la visualización de las mediciones de nodos, generación de gráficos y exportación de datos en formato CSV.

---

## 📑 Tabla de Contenidos

1. [Tecnologías](#-tecnologías)
2. [Prerrequisitos](#-prerrequisitos)
3. [Instalación](#-instalación)
4. [Ejecución](#-ejecución)

---

## 🚀 Tecnologías

El proyecto está construido con el siguiente stack tecnológico:

- **Lenguaje:** Node.js
- **Framework:** Express
- **Base de Datos:** InfluxDB (mediciones) y PostgreSQL (usuarios y preferencias)
- **ORM:** Sequelize
- **Contenedores:** Docker
- **Protocolos:** MQTT, HTTP, WebSockets

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- Node.js
- npm
- Docker
- Git

---

## 🛠 Instalación

1.  **Clonar el repositorio**

    ```bash
    git clone https://github.com/MeliAlvarez14/datalogger-TyH-backend.git
    ```
2.  **Acceder al directorio del proyecto**
    ```bash
      cd datalogger-TyH-backend
      ```
3.  **Instalar dependencias**
    ```bash
    npm install
    ```

---

## ▶ Ejecución

### Levantar servicios con Docker

Antes de iniciar, corre los servicios de bases de datos:

```Ubuntu(WSL)
# Ejecutar en consola WSL (Ubuntu)

docker compose up -d

```

### Iniciar el servidor en modo desarrollo

```bash

npm run dev
```
