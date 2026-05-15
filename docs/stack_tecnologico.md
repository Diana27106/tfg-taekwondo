# 🥋 Stack Tecnológico — TFG Taekwondo Club

Documentación completa de todas las tecnologías, herramientas y librerías utilizadas en el proyecto.

---

## 🗂️ Índice

1. [Frontend](#-frontend)
2. [Backend](#-backend)
3. [Bases de Datos](#-bases-de-datos)
4. [Inteligencia Artificial](#-inteligencia-artificial)
5. [Automatización](#-automatización)
6. [Contenedorización y Orquestación](#-contenedorización-y-orquestación)
7. [Infraestructura Cloud (AWS)](#-infraestructura-cloud-aws)
8. [Infraestructura como Código](#-infraestructura-como-código)
9. [CI/CD](#-cicd)
10. [Documentación](#-documentación)
11. [Testing](#-testing)

---

## ⚛️ Frontend

### Tecnologías principales

| Tecnología | Versión | Documentación | Propósito |
|---|---|---|---|
| [React](https://react.dev/) | 19.x | https://react.dev/reference | Librería principal para construir la interfaz de usuario mediante componentes reutilizables |
| [Vite](https://vitejs.dev/) | 7.x | https://vite.dev/guide/ | Herramienta de build y servidor de desarrollo ultrarrápido |
| [React Router DOM](https://reactrouter.com/) | 7.x | https://reactrouter.com/home | Enrutamiento del lado del cliente (SPA), gestión de rutas públicas y protegidas |
| [Nginx](https://nginx.org/) | stable-alpine | https://nginx.org/en/docs/ | Servidor web para servir el bundle estático del frontend en producción |

### Librerías instaladas

| Librería | Versión | Documentación | Propósito en la app |
|---|---|---|---|
| [axios](https://axios-http.com/) | ^1.13.6 | https://axios-http.com/docs/intro | Cliente HTTP para todas las llamadas a la API REST del backend |
| [react-hook-form](https://react-hook-form.com/) | ^7.75.0 | https://react-hook-form.com/get-started | Gestión y validación de formularios de manera eficiente (crear noticia, sede, evento…) |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | ^5.2.2 | https://react-hook-form.com/docs/useform#resolver | Adaptador que conecta `react-hook-form` con esquemas de validación de Yup |
| [yup](https://github.com/jquense/yup) | ^1.7.1 | https://github.com/jquense/yup#readme | Definición de esquemas de validación de formularios (campos requeridos, formatos…) |
| [i18next](https://www.i18next.com/) | ^26.0.10 | https://www.i18next.com/overview/getting-started | Motor de internacionalización (i18n) para soporte multiidioma (ES/EN) |
| [react-i18next](https://react.i18next.com/) | ^17.0.7 | https://react.i18next.com/ | Integración de i18next con React mediante hooks (`useTranslation`) |
| [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) | ^8.2.1 | https://github.com/i18next/i18next-browser-languageDetector | Detecta automáticamente el idioma del navegador del usuario |
| [lucide-react](https://lucide.dev/) | ^0.577.0 | https://lucide.dev/guide/packages/lucide-react | Librería de iconos SVG optimizados para React |
| [jspdf](https://artskydj.github.io/jsPDF/) | ^4.2.1 | https://artskydj.github.io/jsPDF/docs/ | Generación de documentos PDF en el lado del cliente (frontend) |
| [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) | ^5.0.7 | https://github.com/simonbengtsson/jsPDF-AutoTable | Plugin de jsPDF para generar tablas con formato en los PDFs exportados |

### Librerías de desarrollo (devDependencies)

| Librería | Versión | Documentación | Propósito en la app |
|---|---|---|---|
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | ^5.1.1 | https://github.com/vitejs/vite-plugin-react | Plugin de Vite para soporte de JSX y Fast Refresh en desarrollo |
| [eslint](https://eslint.org/) | ^9.39.1 | https://eslint.org/docs/latest/ | Linter para análisis estático del código JavaScript/JSX |
| [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) | ^7.0.1 | https://react.dev/reference/rules/rules-of-hooks | Reglas de ESLint para uso correcto de los Hooks de React |
| [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh) | ^0.4.24 | https://github.com/ArnaudBarre/eslint-plugin-react-refresh | Garantiza la compatibilidad del código con el Fast Refresh de Vite |
| [vitest](https://vitest.dev/) | ^4.1.6 | https://vitest.dev/guide/ | Framework de testing unitario nativo para proyectos Vite |
| [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) | ^16.3.2 | https://testing-library.com/docs/react-testing-library/intro/ | Utilidades para renderizar y probar componentes React en tests |
| [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) | ^6.9.1 | https://github.com/testing-library/jest-dom | Matchers adicionales de Jest/Vitest para aserciones sobre el DOM |
| [jsdom](https://github.com/jsdom/jsdom) | ^29.1.1 | https://github.com/jsdom/jsdom | Simula el entorno DOM del navegador para los tests de Vitest |
| [jsdoc](https://jsdoc.app/) | ^4.0.5 | https://jsdoc.app/ | Generador de documentación a partir de comentarios JSDoc en el código |
| [tailwindcss](https://tailwindcss.com/) | ^3.4.19 | https://tailwindcss.com/docs | Framework CSS utility-first (configurado como herramienta de build) |
| [postcss](https://postcss.org/) | ^8.5.8 | https://postcss.org/docs/ | Procesador CSS, usado internamente por Tailwind |
| [autoprefixer](https://github.com/postcss/autoprefixer) | ^10.4.27 | https://github.com/postcss/autoprefixer | Plugin de PostCSS que añade prefijos de vendor al CSS automáticamente |

---

## 🐍 Backend

### Tecnologías principales

| Tecnología | Versión | Documentación | Propósito |
|---|---|---|---|
| [Python](https://www.python.org/) | 3.12 | https://docs.python.org/3/ | Lenguaje de programación principal del servidor |
| [Django](https://www.djangoproject.com/) | latest | https://docs.djangoproject.com/ | Framework web principal: ORM, autenticación, administración, templates |
| [Django REST Framework (DRF)](https://www.django-rest-framework.org/) | latest | https://www.django-rest-framework.org/ | Construcción de la API REST: ViewSets, Serializers, permisos y autenticación por token |

### Librerías instaladas (`requirements.txt`)

| Librería | Documentación | Propósito en la app |
|---|---|---|
| [djangorestframework](https://www.django-rest-framework.org/) | https://www.django-rest-framework.org/ | API REST completa: endpoints para instructores, sedes, grupos, noticias, eventos y patrocinadores |
| [django-cors-headers](https://github.com/adamchainz/django-cors-headers) | https://github.com/adamchainz/django-cors-headers | Permite peticiones cross-origin desde el frontend React al backend Django |
| [psycopg2-binary](https://www.psycopg.org/docs/) | https://www.psycopg.org/docs/ | Adaptador PostgreSQL para Python; conecta Django con la base de datos relacional |
| [whitenoise](https://whitenoise.readthedocs.io/) | https://whitenoise.readthedocs.io/en/stable/ | Sirve los archivos estáticos de Django directamente, sin necesidad de un servidor externo adicional |
| [python-dotenv](https://saurabh-kumar.com/python-dotenv/) | https://saurabh-kumar.com/python-dotenv/ | Carga las variables de entorno desde el archivo `.env` para configuración segura |
| [xhtml2pdf](https://xhtml2pdf.readthedocs.io/) | https://xhtml2pdf.readthedocs.io/en/latest/ | Convierte plantillas HTML de Django a archivos PDF descargables (noticias en PDF) |
| [requests](https://requests.readthedocs.io/) | https://requests.readthedocs.io/en/latest/ | Cliente HTTP para llamadas server-side, especialmente al webhook del chatbot en n8n |

---

## 🗄️ Bases de Datos

| Tecnología | Versión | Documentación | Propósito |
|---|---|---|---|
| [PostgreSQL](https://www.postgresql.org/) | 15 | https://www.postgresql.org/docs/15/ | Base de datos relacional principal: almacena instructores, sedes, grupos, noticias, eventos, patrocinadores, usuarios y consultas del chatbot |
| [Qdrant](https://qdrant.tech/) | latest | https://qdrant.tech/documentation/ | Base de datos vectorial para el sistema RAG del chatbot; almacena embeddings de documentos para búsqueda semántica |

---

## 🤖 Inteligencia Artificial

| Tecnología | Documentación | Propósito |
|---|---|---|
| [Ollama](https://ollama.com/) | https://github.com/ollama/ollama/blob/main/docs/api.md | Motor de ejecución de modelos LLM de forma local; sirve el modelo de lenguaje y el modelo de embeddings |
| **LLM de chat** (ej. `llama3`) | https://ollama.com/library | Modelo de lenguaje que genera las respuestas del chatbot |
| **Modelo de embeddings** (ej. `nomic-embed-text`) | https://ollama.com/library/nomic-embed-text | Transforma texto en vectores numéricos para su indexación en Qdrant |

> El modelo LLM y el modelo de embeddings concretos se configuran mediante las variables `OLLAMA_MODEL` y `OLLAMA_EMBEDDING_MODEL` en el fichero `.env`.

---

## ⚙️ Automatización

| Tecnología | Documentación | Propósito |
|---|---|---|
| [n8n](https://n8n.io/) | https://docs.n8n.io/ | Plataforma de automatización sin código; orquesta el flujo RAG del chatbot (recibe pregunta → busca en Qdrant → llama a Ollama → devuelve respuesta) e importa usuarios instructores desde Google Sheets |

---

## 🐳 Contenedorización y Orquestación

| Tecnología | Versión | Documentación | Propósito |
|---|---|---|---|
| [Docker](https://www.docker.com/) | latest | https://docs.docker.com/ | Empaqueta cada servicio en contenedores aislados y reproducibles |
| [Docker Compose](https://docs.docker.com/compose/) | v2 | https://docs.docker.com/compose/ | Orquesta todos los servicios localmente (frontend, backend, postgres, qdrant, ollama, n8n, proxy) mediante `docker-compose.yml` |
| [Kubernetes (kubectl)](https://kubernetes.io/) | 1.30 | https://kubernetes.io/docs/home/ | Orquestación de contenedores en producción sobre AWS EKS |
| [Nginx](https://nginx.org/) | stable-alpine | https://nginx.org/en/docs/ | Proxy inverso SSL/TLS: enruta las peticiones entrantes al frontend o al backend según la ruta |

---

## ☁️ Infraestructura Cloud (AWS)

| Servicio AWS | Documentación | Propósito |
|---|---|---|
| [Amazon EKS](https://aws.amazon.com/eks/) | https://docs.aws.amazon.com/eks/latest/userguide/ | Clúster de Kubernetes gestionado donde se ejecutan los Deployments de frontend y backend en producción |
| [Amazon ECR](https://aws.amazon.com/ecr/) | https://docs.aws.amazon.com/AmazonECR/latest/userguide/ | Registro privado de imágenes Docker; almacena las imágenes `tfg-backend` y `tfg-frontend` |
| [Amazon VPC](https://aws.amazon.com/vpc/) | https://docs.aws.amazon.com/vpc/latest/userguide/ | Red virtual privada que aísla y conecta los recursos del clúster EKS |
| [Amazon EBS](https://aws.amazon.com/ebs/) | https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html | Almacenamiento en bloque persistente para los PersistentVolumes de Kubernetes (PostgreSQL) |

---

## 🏗️ Infraestructura como Código

| Tecnología | Versión | Documentación | Propósito |
|---|---|---|---|
| [Terraform](https://www.terraform.io/) | ~> 5.0 (provider AWS) | https://developer.hashicorp.com/terraform/docs | Define y provisiona toda la infraestructura AWS (VPC, EKS, ECR) de forma declarativa y reproducible |
| [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest) | ~> 5.0 | https://registry.terraform.io/providers/hashicorp/aws/latest/docs | Plugin de Terraform para gestionar recursos de Amazon Web Services |

### Módulos Terraform utilizados

| Módulo | Documentación | Propósito |
|---|---|---|
| [terraform-aws-modules/vpc](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest) | https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest | Crea la VPC con subredes públicas y privadas, Internet Gateway y tablas de rutas |

---

## 🔄 CI/CD

| Tecnología | Documentación | Propósito |
|---|---|---|
| [GitHub Actions](https://github.com/features/actions) | https://docs.github.com/en/actions | Pipeline de integración y despliegue continuo definido en `.github/workflows/cicd.yml` |

### Pipeline completo (jobs en orden)

```
push → main
  │
  ├── 1. test              → Ejecuta tests del frontend (Vitest) y backend (Django)
  ├── 2. documentation     → Genera la documentación con MkDocs y la sube como artefacto
  ├── 3. terraform         → Provisiona/actualiza la infraestructura en AWS
  ├── 4. build-and-push    → Construye imágenes Docker y las sube a Amazon ECR
  └── 5. deploy            → Aplica los manifiestos de Kubernetes y reinicia los Deployments
```

---

## 📚 Documentación

| Tecnología | Documentación | Propósito |
|---|---|---|
| [MkDocs](https://www.mkdocs.org/) | https://www.mkdocs.org/ | Generador de sitios de documentación a partir de ficheros Markdown |
| [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) | https://squidfunk.github.io/mkdocs-material/ | Tema visual moderno y profesional para MkDocs |
| [mkdocstrings](https://mkdocstrings.github.io/) | https://mkdocstrings.github.io/ | Plugin de MkDocs que genera documentación automática a partir de los docstrings de Python |
| [JSDoc](https://jsdoc.app/) | https://jsdoc.app/ | Genera documentación HTML del código JavaScript/JSX del frontend |
| [better-docs](https://github.com/SoftwareBrothers/better-docs) | https://github.com/SoftwareBrothers/better-docs | Tema visual mejorado para la documentación generada con JSDoc |

---

## 🧪 Testing

| Tecnología | Documentación | Propósito |
|---|---|---|
| [Vitest](https://vitest.dev/) | https://vitest.dev/guide/ | Tests unitarios del frontend (componentes React, lógica de negocio) |
| [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) | https://testing-library.com/docs/react-testing-library/intro/ | Renderizado y simulación de interacciones en componentes React para tests |
| [Django TestCase](https://docs.djangoproject.com/en/5.0/topics/testing/) | https://docs.djangoproject.com/en/5.0/topics/testing/ | Framework de testing integrado en Django para tests unitarios del backend (modelos, vistas, API) |
