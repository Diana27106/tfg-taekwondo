# 11.2. Manual de Instalación

Este manual detalla los pasos técnicos necesarios para desplegar y configurar el sistema de gestión del club de Taekwondo en un entorno local o de producción.

## 1. Requisitos Previos

Antes de comenzar, asegúrese de tener instaladas las siguientes herramientas:
*   **Docker & Docker Compose**: Necesarios para la base de datos (Postgres) y el motor de búsqueda vectorial (Qdrant).
*   **Node.js (versión 18 o superior)**: Entorno de ejecución para el frontend (Vite/React).
*   **Python (versión 3.10 o superior)**: Para el servidor backend (Django).
*   **Git**: Para la gestión del código fuente.

## 2. Descarga del Software

Clone el repositorio desde el servidor de control de versiones:
```bash
git clone https://github.com/usuario/tfg-taekwondo.git
cd tfg-taekwondo
```

## 3. Configuración Inicial

### Variables de Entorno
Cree un archivo `.env` en la raíz del proyecto basándose en el ejemplo `.env.example`:
```env
# Database
POSTGRES_DB=taekwondo_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=tu_password_segura

# Django
DJANGO_SECRET_KEY=tu_secret_key_aqui
DEBUG=True

# IA / Chatbot
OPENAI_API_KEY=tu_clave_de_openai
QDRANT_HOST=localhost
QDRANT_PORT=6333
```

## 4. Puesta en Marcha

Siga este orden para asegurar la correcta vinculación de los servicios:

### Paso A: Levantar Servicios Docker
```bash
docker-compose up -d
```
*Esto iniciará PostgreSQL y Qdrant en segundo plano.*

### Paso B: Configurar el Backend (Django)
```bash
cd server
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Crea la cuenta de administrador
python manage.py runserver
```

### Paso C: Configurar el Frontend (React)
Abra una nueva terminal:
```bash
cd client
npm install
npm run dev
```

El sistema estará disponible en:
*   **Frontend**: `http://localhost:5173`
*   **Backend (API)**: `http://localhost:8000`
*   **Panel de Control (Django Admin)**: `http://localhost:8000/admin`
