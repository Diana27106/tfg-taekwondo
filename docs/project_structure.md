# Organización y Estructura del Proyecto

Este documento detalla la arquitectura del código fuente, la organización de carpetas y la configuración necesaria para el funcionamiento del entorno de desarrollo.

## 1. Estructura de Carpetas

El proyecto está dividido en dos grandes bloques: **Frontend (Client)** y **Backend (Server)**, siguiendo una arquitectura desacoplada.

```text
tfg-taekwondo/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/         # Recursos estáticos (img, pdf, fonts)
│   │   ├── components/     # Componentes reutilizables (admin/public)
│   │   ├── pages/          # Vistas principales (admin/public/auth)
│   │   ├── App.jsx         # Enrutador principal
│   │   └── index.css       # Estilos globales y Tailwind
│   ├── package.json        # Dependencias de Node.js
│   └── vite.config.js      # Configuración de Vite
├── server/                 # Backend (Django)
│   ├── club/               # Aplicación principal (Lógica de negocio)
│   │   ├── models.py       # Definición de la base de datos
│   │   ├── views.py        # Controladores API
│   │   └── serializers.py  # Conversión de datos JSON
│   ├── core/               # Configuración del proyecto Django
│   │   └── settings.py     # Ajustes del servidor
│   ├── media/              # Archivos subidos por usuarios (logos, fotos)
│   ├── requirements.txt    # Dependencias de Python
│   └── manage.py           # Utilidad de comandos Django
├── postgres/               # Volumen de persistencia para PostgreSQL
├── qdrant_storage/         # Base de datos vectorial para la IA (RAG)
├── docker-compose.yml      # Orquestación de servicios
└── .env                    # Variables de entorno (claves, puertos)
```

---

## 2. Organización del Código Fuente

### Frontend (React)
*   **Enrutamiento**: Se utiliza `react-router-dom` para gestionar la navegación entre la parte pública y el panel de administración.
*   **Estilos**: Implementación basada en **Tailwind CSS** con un sistema de diseño "Gold/Cyber" personalizado en `index.css`.
*   **Consumo de API**: Se utiliza `axios` o `fetch` para la comunicación asíncrona con el backend de Django.

### Backend (Django)
*   **REST API**: Construido con **Django Rest Framework (DRF)** para servir datos en formato JSON.
*   **Modelado**: Uso del ORM de Django para gestionar relaciones complejas entre instructores y sedes.
*   **IA & RAG**: Integración con modelos de lenguaje y bases de datos vectoriales para el funcionamiento del chatbot inteligente.

---

## 3. Configuración del Entorno

### Requisitos Previos
*   **Docker & Docker Compose**: Para levantar los servicios de base de datos (Postgres) e IA (Qdrant/n8n).
*   **Node.js (v18+)**: Para el entorno de ejecución del frontend.
*   **Python (v3.10+)**: Para el servidor Django.

### Pasos de Instalación
1.  **Levantar Infraestructura**:
    ```bash
    docker-compose up -d
    ```
2.  **Preparar el Backend**:
    ```bash
    cd server
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```
3.  **Preparar el Frontend**:
    ```bash
    cd client
    npm install
    npm run dev
    ```

### Variables de Entorno (.env)
Es fundamental configurar el archivo `.env` en la raíz con las siguientes claves:
*   `DATABASE_URL`: Conexión a Postgres.
*   `SECRET_KEY`: Clave de seguridad de Django.
*   `OPENAI_API_KEY`: Necesaria para el funcionamiento del chatbot RAG.
