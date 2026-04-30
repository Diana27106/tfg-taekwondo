# TFG Taekwondo - Sistema de Gestión de Club

Un sistema integral de gestión para clubes de Taekwondo que combina un panel administrativo moderno con una infraestructura de IA avanzada para la asistencia al usuario mediante RAG (Retrieval-Augmented Generation).

## 📄 Descripción del Proyecto

Este proyecto es una plataforma completa diseñada para resolver las necesidades operativas de un club de taekwondo. Permite gestionar sedes, eventos, noticias, patrocinadores e instructores de manera eficiente.

### Problema que resuelve:
La falta de centralización en la gestión de actividades y la dificultad de los usuarios para obtener respuestas rápidas sobre horarios, sedes o requisitos del club.

### Características principales:
- **Panel Administrativo Premium**: Interfaz de alta fidelidad para la gestión CRUD de todas las entidades del club.
- **Chatbot Inteligente**: Sistema de asistencia basado en IA que utiliza documentación técnica y datos del club para responder preguntas en tiempo real.
- **Generación de Reportes**: Exportación de logs y datos maestros en formato PDF.
- **Infraestructura Local de IA**: Procesamiento de lenguaje natural ejecutado localmente para garantizar la privacidad y reducir costes.

---

## 📂 Estructura del Proyecto

```text
.
├── client/              # Frontend en React (Vite)
│   ├── src/             # Código fuente (Componentes, Páginas, Hooks)
│   └── public/          # Activos estáticos
├── server/              # Backend en Django
│   ├── club/            # Lógica de negocio y modelos de la app
│   ├── core/            # Configuración del proyecto Django
│   └── media/           # Archivos subidos (imágenes, documentos)
├── n8n-workflows/       # Definiciones de flujos de trabajo para el chatbot
├── postgres/            # Scripts de inicialización de la base de datos
├── qdrant_storage/      # Persistencia de la base de datos vectorial
└── docker-compose.yml   # Orquestación de servicios (DB, IA, Automatización)
```

- **client/**: Interfaz de usuario reactiva y móderna.
- **server/**: API REST sólida que maneja la persistencia y la lógica.
- **n8n-workflows/**: Orquestación del pipeline de RAG (Ollama + Qdrant).
- **docker-compose.yml**: Punto de entrada para levantar la pila tecnológica de soporte.

---

## 🛠️ Tecnologías y Herramientas

### Herramientas
- **Git**: Control de versiones.
- **Docker & Docker Compose**: Contenerización y orquestación de servicios.
- **Vite**: Herramienta de construcción rápida para el frontend.
- **n8n**: Plataforma de automatización de flujos de trabajo para la lógica del chatbot.

### Librerías y Dependencias

#### Frontend (React)
- **Tailwind CSS**: Framework de CSS para un diseño rápido y moderno.
- **Lucide React**: Set de iconos elegantes y consistentes.
- **Axios**: Cliente HTTP para la comunicación con el backend Django.
- **jsPDF & jsPDF-AutoTable**: Generación dinámica de documentos PDF desde el navegador.
- **React Router DOM**: Gestión de la navegación y rutas protegidas.

#### Backend (Django)
- **Django REST Framework (DRF)**: Creación de APIs web potentes y flexibles.
- **Django CORS Headers**: Manejo de Cross-Origin Resource Sharing.
- **Psycopg2**: Adaptador de base de datos PostgreSQL para Python.
- **Whitenoise**: Servido de archivos estáticos simplificado.

#### IA e Infraestructura
- **PostgreSQL**: Base de datos relacional para datos estructurados.
- **Qdrant**: Base de datos vectorial para el almacenamiento de embeddings (RAG).
- **Ollama**: Motor para ejecutar modelos de lenguaje (LLM) de forma local (smollm2).

---

## 🚀 Instalación

### Requisitos Previos
- **Node.js** (v18+)
- **Python** (v3.10+)
- **Docker & Docker Compose**

### Paso 1: Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd tfg-taekwondo
```

### Paso 2: Levantar infraestructura (Docker)
```bash
docker-compose up -d
```
*Esto iniciará Postgres, Qdrant, Ollama (y descargará los modelos necesarios) y n8n.*

### Paso 3: Configurar el Backend
```bash
cd server
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Paso 4: Configurar el Frontend
```bash
cd ../client
npm install
npm run dev
```

---

## 📋 Despliegue

### Configuración de Entorno
Crea un archivo `.env` en la raíz basado en el archivo `.env.example` incluido. Asegúrate de configurar las credenciales de base de datos y los puertos de los servicios.

### Opciones de Despliegue
- **Local**: Utilizando los comandos de desarrollo mencionados arriba.
- **Producción**: 
  - Backend: Se recomienda Gunicorn + Nginx.
  - Frontend: `npm run build` y servir los archivos estáticos desde Nginx o un CDN.
  - AI Stack: Requiere servidores con soporte para Docker y preferiblemente GPU para Ollama.

---

## 💻 Uso

1. Accede al frontend en `http://localhost:5173`.
2. El panel administrativo está disponible en las rutas protegidas `/admin`.
3. Interactúa con el chatbot desde el widget flotante en la interfaz principal.
4. Genera reportes desde la sección de "Informes" en el Dashboard.

---

## ⚙️ Configuración

El proyecto utiliza variables de entorno para gestionar:
- `POSTGRES_DB/USER/PASSWORD`: Acceso a la base de datos principal.
- `OLLAMA_MODEL`: El modelo LLM a utilizar (ej: `smollm2:1.7b`).
- `N8N_PORT`: Puerto de acceso para la interfaz de automatización.

---

## 🤝 Contribución

1. Haz un **Fork** del proyecto.
2. Crea una nueva rama: `git checkout -b feature/NuevaFuncionalidad`.
3. Realiza tus cambios y haz **Commit**: `git commit -m 'Añade nueva funcionalidad'`.
4. Sube los cambios: `git push origin feature/NuevaFuncionalidad`.
5. Abre un **Pull Request**.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más detalles (o disponible bajo petición).

---

## 📝 Notas Adicionales

- **Seguridad**: Asegúrate de cambiar las contraseñas predeterminadas en el archivo `.env` antes de cualquier despliegue real.
- **Modelos de IA**: La primera ejecución de Docker puede tardar unos minutos mientras Ollama descarga los modelos `smollm2:1.7b` y `nomic-embed-text`.
