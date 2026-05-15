# Organización y Estructura del Proyecto

Este documento detalla la arquitectura del código fuente, la organización de carpetas y la configuración necesaria para el funcionamiento de los entornos de **desarrollo local** y **producción en AWS (EKS)**.

---

## 1. Estructura de Carpetas

El proyecto sigue una arquitectura desacoplada con capas diferenciadas: frontend, backend, infraestructura local, infraestructura cloud e IaC.

```text
tfg-taekwondo/
├── client/                         # Frontend (React + Vite)
│   ├── certs/                      # Certificados SSL para desarrollo local (HTTPS)
│   ├── src/
│   │   ├── assets/                 # Recursos estáticos (imágenes, pdfs, fuentes)
│   │   ├── components/             # Componentes React reutilizables
│   │   │   ├── admin/              # Componentes del panel de administración
│   │   │   ├── auth/               # Componentes de autenticación (login, perfil)
│   │   │   └── public/             # Componentes de la parte pública (chatbot, navbar…)
│   │   ├── pages/                  # Vistas/páginas completas
│   │   │   ├── admin/              # Páginas de gestión (CRUD: noticias, sedes, instructores…)
│   │   │   ├── auth/               # Páginas de autenticación (Login)
│   │   │   └── public/             # Páginas públicas (Home, About, Noticias, Contacto…)
│   │   ├── tests/                  # Tests unitarios de componentes (Vitest)
│   │   ├── App.jsx                 # Enrutador principal y rutas protegidas
│   │   ├── config.js               # URL base de la API (VITE_API_URL)
│   │   ├── index.css               # Estilos globales
│   │   ├── main.jsx                # Punto de entrada de React
│   │   └── test-setup.js           # Configuración global de Vitest
│   ├── Dockerfile                  # Imagen Docker: build React + Nginx
│   ├── package.json                # Dependencias de Node.js
│   └── vite.config.js              # Configuración de Vite
│
├── server/                         # Backend (Django + DRF)
│   ├── club/                       # App principal (lógica de negocio)
│   │   ├── templates/club/         # Plantillas HTML (PDFs de noticias, emails)
│   │   ├── admin.py                # Configuración del panel Django Admin
│   │   ├── models.py               # Modelos ORM (Instructor, Sede, Grupo, Noticia…)
│   │   ├── serializers.py          # Serialización de modelos a JSON
│   │   ├── tests.py                # Tests unitarios del backend
│   │   ├── urls.py                 # Rutas de la API REST del club
│   │   └── views.py                # Vistas/controladores de la API
│   ├── core/                       # Configuración del proyecto Django
│   │   ├── settings.py             # Ajustes principales (BD, email, CORS, static…)
│   │   └── urls.py                 # Enrutador raíz del proyecto
│   ├── media/                      # Archivos subidos por usuarios (logos, fotos)
│   ├── Dockerfile                  # Imagen Docker del backend Django
│   ├── manage.py                   # Utilidad de comandos Django
│   └── requirements.txt            # Dependencias de Python
│
├── kubernetes/                     # Manifiestos de Kubernetes (producción en AWS EKS)
│   ├── infraestructura.yml         # Secret, ConfigMap, PVCs, PostgreSQL, Qdrant
│   ├── despliegue.yml              # Deployments y Services de Backend y Frontend
│   └── proxy.yml                  # ConfigMap Nginx, Deployment y Service (LoadBalancer)
│
├── terraform/                      # Infraestructura como Código (IaC) — AWS
│   ├── main.tf                     # Proveedor AWS y configuración de Terraform
│   ├── vpc.tf                      # VPC, subredes públicas/privadas e Internet Gateway
│   ├── eks.tf                      # Clúster EKS y Node Group (t3.medium)
│   ├── ecr.tf                      # Repositorios ECR (tfg-backend, tfg-frontend)
│   ├── variables.tf                # Variables reutilizables (región, nombre del clúster)
│   └── outputs.tf                  # Outputs: URLs de ECR, nombre del clúster
│
├── .github/
│   └── workflows/
│       └── cicd.yml                # Pipeline CI/CD (tests → docs → terraform → build → deploy)
│
├── docs/                           # Documentación del proyecto (MkDocs)
│   ├── backend/                    # Documentación autogenerada del backend Python
│   ├── index.md                    # Página principal de la documentación
│   ├── project_structure.md        # Este documento
│   ├── database_model.md           # Diagrama y descripción del modelo de datos
│   ├── stack_tecnologico.md        # Tecnologías y librerías utilizadas
│   └── manual_*.md                 # Manuales de instalación, administración y usuario
│
├── n8n-workflows/                  # Workflows exportados de n8n (chatbot RAG, importación usuarios)
├── postgres/                       # Script SQL de inicialización de la BD local
├── proxy/                          # Configuración Nginx para el proxy local (SSL)
├── qdrant_storage/                 # Almacenamiento persistente local de Qdrant
├── docker-compose.yml              # Orquestación local de todos los servicios
├── mkdocs.yml                      # Configuración de MkDocs
├── .env                            # Variables de entorno (NO subir al repositorio)
└── .env.example                    # Plantilla de variables de entorno
```

---

## 2. Organización del Código Fuente

### Frontend (React + Vite)

- **Enrutamiento**: `react-router-dom` gestiona rutas públicas, de autenticación y el panel privado de administración con rutas protegidas.
- **Estilos**: Vanilla CSS global en `index.css` con Tailwind CSS como complemento utility-first.
- **Formularios**: `react-hook-form` + `yup` para validación declarativa.
- **i18n**: `i18next` + `react-i18next` para soporte multiidioma (ES/EN) con detección automática del navegador.
- **Consumo de API**: `axios` centralizado con la URL base definida en `config.js` mediante la variable de entorno `VITE_API_URL`.
- **Generación de PDFs en cliente**: `jspdf` + `jspdf-autotable`.

### Backend (Django + DRF)

- **REST API**: Django Rest Framework expone endpoints bajo `/api/` para gestionar instructores, sedes, grupos, noticias, eventos, patrocinadores y el chatbot.
- **Autenticación**: Sistema de tokens de Django con rutas protegidas por `IsAuthenticated` / `IsAuthenticatedOrReadOnly`.
- **Generación de PDF en servidor**: `xhtml2pdf` convierte plantillas HTML a PDF descargable (noticias).
- **Email**: SMTP de Django para emails de contacto y verificación de cuenta de nuevos instructores.
- **Chatbot RAG**: El backend actúa de proxy hacia el webhook de n8n, que orquesta la búsqueda en Qdrant y la inferencia con Ollama.

---

## 3. Entornos de Despliegue

### 3.1 Entorno Local (Docker Compose)

Todos los servicios se levantan con un único comando. La comunicación interna se realiza a través de la red Docker `tfg-network`.

```bash
docker-compose up -d
```

| Servicio | Imagen | Puerto expuesto | Propósito |
|---|---|---|---|
| `qdrant` | `qdrant/qdrant` | 6333 | Base de datos vectorial (RAG) |
| `postgres` | `postgres:15` | 5433 | Base de datos relacional |
| `ollama` | `ollama/ollama` | 11434 | LLM local (chat + embeddings) |
| `n8n` | `n8nio/n8n` | 5678 | Orquestación del chatbot RAG |
| `backend` | build `./server` | — (solo interno) | API Django |
| `frontend` | build `./client` | — (solo interno) | React servido por Nginx |
| `proxy` | `nginx:stable-alpine` | **80, 443** | Proxy inverso SSL/TLS |

### 3.2 Entorno de Producción (AWS EKS)

La infraestructura de producción se aprovisiona con Terraform y los servicios se despliegan mediante manifiestos de Kubernetes sobre Amazon EKS.

#### Diagrama de arquitectura

```
Internet
   │
   ▼
[AWS LoadBalancer]  ←── proxy-service (type: LoadBalancer)
   │
   ▼
[Nginx Proxy Pod]  (proxy-deployment, 1 réplica)
   ├── / ──────────────────► [Frontend Service] → [Frontend Pods ×2]  (ECR: tfg-frontend)
   ├── /api/ ──────────────► [Backend Service]  → [Backend Pods ×2]   (ECR: tfg-backend)
   ├── /admin/ ────────────► [Backend Service]
   └── /media/ ────────────► [Backend Service]
                                    │
                          [postgres-service]
                                    │
                          [PostgreSQL Pod] ──► [EBS PVC 1Gi]
                          [media-pvc] ────────► [EBS PVC 2Gi]
```

#### Recursos Kubernetes desplegados

| Fichero | Recursos definidos |
|---|---|
| `infraestructura.yml` | `Secret` (credenciales), `ConfigMap` (init.sql), `PVC` postgres (1Gi) + media (2Gi), `Deployment` + `Service` PostgreSQL, `Deployment` + `Service` Qdrant |
| `despliegue.yml` | `Deployment` + `Service` backend (2 réplicas, ECR), `Deployment` + `Service` frontend (2 réplicas, ECR) |
| `proxy.yml` | `ConfigMap` Nginx, `Deployment` proxy, `Service` tipo **LoadBalancer** (entrada pública) |

#### Infraestructura AWS (Terraform)

| Recurso | Descripción |
|---|---|
| **VPC** | Red privada con subredes públicas y privadas en `us-east-1` |
| **EKS Cluster** | Kubernetes 1.30 con 2–3 nodos `t3.medium` (AL2 x86_64) |
| **ECR** | Repositorios `tfg-backend` y `tfg-frontend` con escaneo de vulnerabilidades |
| **EBS** | Almacenamiento persistente para los PersistentVolumeClaims de Kubernetes |

---

## 4. Variables de Entorno (.env)

El fichero `.env` en la raíz del proyecto configura todos los servicios. Existe una plantilla en `.env.example`.

> ⚠️ **Nunca subas el `.env` real al repositorio.** Está incluido en `.gitignore`.
> En producción, las credenciales se gestionan mediante el `Secret` de Kubernetes (`infraestructura.yml`).

### Grupo: PostgreSQL

| Variable | Ejemplo | Descripción |
|---|---|---|
| `POSTGRES_CONTAINER_NAME` | `tfg-taekwondo-postgres` | Nombre del contenedor Docker |
| `POSTGRES_USER` | `admin` | Usuario de la base de datos |
| `POSTGRES_PASSWORD` | `••••••` | Contraseña de la base de datos |
| `POSTGRES_DB` | `taekwondodb` | Nombre de la base de datos |
| `POSTGRES_PORT` | `5433` | Puerto expuesto en local (interno: 5432) |
| `POSTGRES_HOST` | `localhost` | Host de conexión en local |

### Grupo: Django

| Variable | Ejemplo | Descripción |
|---|---|---|
| `DJANGO_SECRET_KEY` | `django-insecure-...` | Clave secreta de Django (cambiar en producción) |
| `DJANGO_DEBUG` | `True` | Modo debug (`False` en producción) |
| `DJANGO_ALLOWED_HOSTS` | `localhost,127.0.0.1` | Hosts permitidos por Django |

### Grupo: Email

| Variable | Ejemplo | Descripción |
|---|---|---|
| `EMAIL_HOST_USER` | `cuenta@gmail.com` | Cuenta SMTP para envío de correos |
| `EMAIL_HOST_PASSWORD` | `••••••` | Contraseña de aplicación SMTP |
| `DEFAULT_FROM_EMAIL` | `noreply@club.com` | Dirección remitente por defecto |
| `ADMIN_EMAIL` | `admin@club.com` | Email receptor de los mensajes de contacto |

### Grupo: n8n / Chatbot

| Variable | Ejemplo | Descripción |
|---|---|---|
| `N8N_CHATBOT_WEBHOOK` | `http://n8n:5678/webhook/...` | URL del webhook de n8n que procesa preguntas del chatbot |
| `N8N_USER` | `admin` | Usuario de acceso a n8n |
| `N8N_PASSWORD` | `••••••` | Contraseña de acceso a n8n |
| `N8N_PORT` | `5678` | Puerto expuesto de n8n |
| `N8N_CONTAINER_NAME` | `tfg-taekwondo-n8n` | Nombre del contenedor Docker |

### Grupo: Qdrant

| Variable | Ejemplo | Descripción |
|---|---|---|
| `QDRANT_CONTAINER_NAME` | `tfg-taekwondo-qdrant` | Nombre del contenedor Docker |
| `QDRANT_PORT` | `6333` | Puerto expuesto de Qdrant |

### Grupo: Frontend (Vite)

| Variable | Ejemplo | Descripción |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8000` | URL base de la API consumida por el frontend. En producción apunta al LoadBalancer de AWS |

### Grupo: Ollama (LLM Local)

| Variable | Ejemplo | Descripción |
|---|---|---|
| `OLLAMA_MODEL` | `smollm2:1.7b` | Modelo LLM utilizado para el chatbot |
| `OLLAMA_EMBEDDING_MODEL` | `nomic-embed-text` | Modelo de embeddings para indexar documentos en Qdrant |
| `OLLAMA_PORT` | `11434` | Puerto expuesto de Ollama |
| `OLLAMA_CONTAINER_NAME` | `tfg-taekwondo-ollama` | Nombre del contenedor Docker |

---

## 5. Pipeline CI/CD (GitHub Actions)

El fichero `.github/workflows/cicd.yml` automatiza todo el ciclo desde el push a `main` hasta el despliegue en EKS.

```
push → main
  │
  ├─ 1. test           Tests unitarios frontend (Vitest) y backend (Django)
  ├─ 2. documentation  Generación del sitio MkDocs y subida como artefacto
  ├─ 3. terraform      Aprovisionamiento/actualización de infraestructura en AWS
  ├─ 4. build-and-push Build de imágenes Docker y push a Amazon ECR
  └─ 5. deploy         kubectl apply de los manifiestos + rollout restart
```

Las credenciales AWS (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`, `AWS_REGION`, `EKS_CLUSTER_NAME`) se configuran como **GitHub Secrets** del repositorio.
