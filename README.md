# TFG Taekwondo — Sistema de gestión de club

Plataforma web para el **Club de Taekwondo Sierra Nevada**: sitio público informativo, panel de administración y asistente conversacional con IA (RAG) sobre horarios, sedes y normativa del club.

| Recurso | Enlace |
|--------|--------|
| **Presentación del TFG** | [Ver en Canva](https://canva.link/jrceub20991l7t2) |
| **Documentación del proyecto** | [Ver en Canva](https://canva.link/lk64l1kbt8h5guo) |
| **Repositorio** | [github.com/Diana27106/tfg-taekwondo](https://github.com/Diana27106/tfg-taekwondo) |

---

## Descripción

Centraliza la gestión operativa del club (sedes, eventos, noticias, patrocinadores e instructores) y ofrece a alumnos y visitantes respuestas rápidas mediante un chatbot alimentado con documentación real del club.

### Problema que aborda

- Información dispersa sobre horarios, sedes y actividades.
- Carga administrativa manual para mantener el contenido web actualizado.
- Dificultad para resolver dudas frecuentes sin intervención del monitor.

### Funcionalidades principales

- **Web pública**: historia del club, clases, blog, patrocinadores, contacto y widgets de reseñas.
- **Panel administrativo**: CRUD de sedes, eventos, noticias, instructores y patrocinadores; exportación de informes en PDF.
- **Chatbot con RAG**: respuestas basadas en documentos del club usando Ollama, Qdrant y flujos n8n.
- **Despliegue contenedorizado**: Docker Compose en local; Terraform + Kubernetes (EKS) en producción.

---

## Documentación

| Tipo | Ubicación |
|------|-----------|
| Memoria / documentación visual (Canva) | [Documentación del proyecto](https://canva.link/lk64l1kbt8h5guo) |
| Presentación del TFG (Canva) | [Presentación](https://canva.link/jrceub20991l7t2) |
| Manuales técnicos (repositorio) | Carpeta [`docs/`](docs/) |
| Manual de usuario | [`docs/manual_usuario.md`](docs/manual_usuario.md) |
| Manual de administración | [`docs/manual_administracion.md`](docs/manual_administracion.md) |
| Instalación y despliegue | [`docs/manual_instalacion.md`](docs/manual_instalacion.md) · [`docs/guia_despliegue.md`](docs/guia_despliegue.md) |
| Pruebas | [`docs/pruebas.md`](docs/pruebas.md) |
| Índice de documentación técnica | [`docs/index.md`](docs/index.md) |

---

## Estructura del proyecto

```text
.
├── client/                 # Frontend React (Vite + Tailwind)
│   ├── src/                # Componentes, páginas y lógica
│   └── public/assets/      # Imágenes estáticas (/assets/img/...)
├── server/                 # Backend Django REST
│   ├── club/               # Modelos, vistas y API del club
│   ├── core/               # Configuración y autenticación
│   └── media/              # Archivos subidos (fotos, PDFs)
├── docs/                   # Manuales y guías del TFG
├── n8n-workflows/          # Flujos RAG e importación de datos
├── terraform/              # Infraestructura AWS (EKS, VPC, ECR)
├── kubernetes/             # Manifiestos de despliegue
├── proxy/                  # Configuración Nginx
└── docker-compose.yml      # Postgres, Qdrant, Ollama, n8n, servicios app
```

---

## Stack tecnológico

| Capa | Tecnologías |
|------|-------------|
| Frontend | React, Vite, Tailwind CSS, React Router, Axios, jsPDF |
| Backend | Django, Django REST Framework, PostgreSQL, Whitenoise |
| IA / automatización | Ollama, Qdrant, n8n |
| DevOps | Docker, Docker Compose, Terraform, Kubernetes (EKS), Nginx, GitHub Actions |

---

## Instalación rápida (desarrollo local)

### Requisitos

- Node.js 18+
- Python 3.10+
- Docker y Docker Compose

### 1. Clonar el repositorio

```bash
git clone https://github.com/Diana27106/tfg-taekwondo.git
cd tfg-taekwondo
```

### 2. Infraestructura con Docker

```bash
docker compose up -d
```

Inicia PostgreSQL, Qdrant, Ollama (descarga de modelos en el primer arranque) y n8n.

### 3. Backend

```bash
cd server
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example ../.env   # Ajusta variables si es necesario
python manage.py migrate
python manage.py runserver
```

### 4. Frontend

```bash
cd client
npm install
npm run dev
```

| Servicio | URL por defecto |
|----------|-----------------|
| Web (Vite) | http://localhost:5173 |
| API Django | http://localhost:8000 |
| n8n | Ver puerto en `.env` |

> **Imágenes estáticas:** las rutas `/assets/img/...` se sirven desde `client/public/assets/`. No elimines esa carpeta si el código usa URLs absolutas a esos recursos.

Instrucciones detalladas: [`docs/manual_instalacion.md`](docs/manual_instalacion.md).

---

## Uso

1. Abre la web en `http://localhost:5173`.
2. Navega por las secciones públicas (inicio, clases, blog, patrocinadores, contacto).
3. Usa el chatbot desde el widget flotante.
4. Accede al panel en `/admin` (requiere autenticación).
5. Genera informes PDF desde el dashboard administrativo.

---

## Configuración

Copia `.env.example` a `.env` en la raíz del proyecto. Variables habituales:

- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` — base de datos
- `OLLAMA_MODEL` — modelo LLM (p. ej. `smollm2:1.7b`)
- `N8N_PORT` — puerto de la interfaz n8n

Despliegue en AWS: [`docs/guia_despliegue.md`](docs/guia_despliegue.md).

---

## Contribución

1. Haz fork del repositorio.
2. Crea una rama: `git checkout -b feature/mi-funcionalidad`.
3. Commit y push de tus cambios.
4. Abre un Pull Request.

---

## Autora

**Diana Radu** — Trabajo de Fin de Grado (TFG).

- Presentación: [Canva](https://canva.link/jrceub20991l7t2)
- Documentación: [Canva](https://canva.link/lk64l1kbt8h5guo)
