# Plan de Pruebas

Este documento describe las pruebas realizadas en el proyecto, organizadas por tipo, junto con sus casos de prueba, herramientas utilizadas, resultados esperados y cómo ejecutarlas.

---

## Índice

1. [Resumen General](#1-resumen-general)
2. [Pruebas Unitarias — Backend (Django)](#2-pruebas-unitarias--backend-django)
3. [Pruebas Unitarias — Frontend (React)](#3-pruebas-unitarias--frontend-react)
4. [Pruebas de Integración — API REST](#4-pruebas-de-integración--api-rest)
5. [Pruebas Funcionales — Casos de Uso](#5-pruebas-funcionales--casos-de-uso)
6. [Pruebas de Rendimiento](#6-pruebas-de-rendimiento)
7. [Ejecución de las Pruebas](#7-ejecución-de-las-pruebas)
8. [Integración con CI/CD](#8-integración-con-cicd)

---

## 1. Resumen General

| Tipo | Herramienta | Fichero | Nº de pruebas |
|---|---|---|---|
| Unitarias — Backend (modelos) | Django `TestCase` | `server/club/tests.py` | 3 |
| Integración — API REST | DRF `APITestCase` | `server/club/tests.py` | 9 |
| Unitarias — Frontend (componentes) | Vitest + Testing Library | `client/src/tests/` | 5 |
| **Total** | | | **17** |

---

## 2. Pruebas Unitarias — Backend (Django)

**Fichero:** `server/club/tests.py`  
**Clase:** `ModelTests`  
**Framework:** `django.test.TestCase`  
**Base de datos:** SQLite en memoria (aislada por test)

Estas pruebas verifican el comportamiento de los **modelos Django** de forma aislada, sin hacer peticiones HTTP.

### CP-BE-01 — Representación en string del Instructor

| Campo | Detalle |
|---|---|
| **Descripción** | El método `__str__` de `Instructor` devuelve el nombre y el rango con el formato esperado |
| **Precondición** | — |
| **Entrada** | `Instructor(name="Juan Perez", rank="1º DAN", bio="Test bio")` |
| **Resultado esperado** | `"Juan Perez (1º DAN)"` |
| **Resultado obtenido** | ✅ PASS |

```python
def test_instructor_str(self):
    instructor = Instructor.objects.create(name="Juan Perez", rank="1º DAN", bio="Test bio")
    self.assertEqual(str(instructor), "Juan Perez (1º DAN)")
```

---

### CP-BE-02 — Representación en string de la Sede

| Campo | Detalle |
|---|---|
| **Descripción** | El método `__str__` de `Location` devuelve el nombre de la sede |
| **Precondición** | — |
| **Entrada** | `Location(name="Sede Central", address="Calle Falsa 123", city="Madrid")` |
| **Resultado esperado** | `"Sede Central"` |
| **Resultado obtenido** | ✅ PASS |

```python
def test_location_str(self):
    location = Location.objects.create(name="Sede Central", address="Calle Falsa 123", city="Madrid")
    self.assertEqual(str(location), "Sede Central")
```

---

### CP-BE-03 — Generación automática de slug en Noticia

| Campo | Detalle |
|---|---|
| **Descripción** | Al crear una `News`, el campo `slug` se genera automáticamente a partir del título |
| **Precondición** | — |
| **Entrada** | `News(title="Nueva Noticia", content="Contenido de prueba")` |
| **Resultado esperado** | `news.slug == "nueva-noticia"` |
| **Resultado obtenido** | ✅ PASS |

```python
def test_news_slug_generation(self):
    news = News.objects.create(title="Nueva Noticia", content="Contenido de prueba")
    self.assertEqual(news.slug, "nueva-noticia")
```

---

## 3. Pruebas Unitarias — Frontend (React)

**Directorio:** `client/src/tests/`  
**Framework:** Vitest + `@testing-library/react` + `@testing-library/jest-dom`  
**Entorno DOM:** jsdom

### 3.1 Componente `ChatBot`

**Fichero:** `client/src/tests/ChatBot.test.jsx`

#### CP-FE-01 — Renderizado de mensajes

| Campo | Detalle |
|---|---|
| **Descripción** | El componente `ChatBot` renderiza correctamente los mensajes del bot y del usuario pasados por props |
| **Precondición** | Array de mensajes con roles `bot` y `user` |
| **Entrada** | `messages=[{role:'bot', content:'Hola'}, {role:'user', content:'¿Cómo estás?'}]` |
| **Resultado esperado** | Ambos textos visibles en el DOM |
| **Resultado obtenido** | ✅ PASS |

```jsx
it('renders messages correctly', () => {
  render(<ChatBot onClose={mockOnClose} onSend={mockOnSend} messages={messages} isLoading={false} />);
  expect(screen.getByText('Hola')).toBeInTheDocument();
  expect(screen.getByText('¿Cómo estás?')).toBeInTheDocument();
});
```

---

#### CP-FE-02 — Invocación de `onSend` al pulsar enviar

| Campo | Detalle |
|---|---|
| **Descripción** | Al escribir texto en el input y pulsar el botón de envío, se invoca la función `onSend` con el texto introducido |
| **Precondición** | Componente renderizado con `messages=[]` e `isLoading=false` |
| **Entrada** | Texto `"Nueva pregunta"` introducido en el input, clic en botón enviar |
| **Resultado esperado** | `mockOnSend` llamado con `"Nueva pregunta"` |
| **Resultado obtenido** | ✅ PASS |

```jsx
it('calls onSend when send button is clicked', () => {
  render(<ChatBot onClose={mockOnClose} onSend={mockOnSend} messages={[]} isLoading={false} />);
  const input = screen.getByPlaceholderText('Escribe tu pregunta...');
  fireEvent.change(input, { target: { value: 'Nueva pregunta' } });
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[buttons.length - 1]);
  expect(mockOnSend).toHaveBeenCalledWith('Nueva pregunta');
});
```

---

#### CP-FE-03 — Estado de carga (loading)

| Campo | Detalle |
|---|---|
| **Descripción** | Cuando `isLoading=true`, el componente muestra el indicador de espera |
| **Precondición** | Componente renderizado con `isLoading=true` |
| **Entrada** | Prop `isLoading={true}` |
| **Resultado esperado** | Texto `"Pensando..."` visible en el DOM |
| **Resultado obtenido** | ✅ PASS |

```jsx
it('shows loading state', () => {
  render(<ChatBot onClose={mockOnClose} onSend={mockOnSend} messages={[]} isLoading={true} />);
  expect(screen.getByText('Pensando...')).toBeInTheDocument();
});
```

---

### 3.2 Componente `Navbar`

**Fichero:** `client/src/tests/Navbar.test.jsx`

#### CP-FE-04 — Renderizado de todos los enlaces de navegación

| Campo | Detalle |
|---|---|
| **Descripción** | La barra de navegación pública renderiza todos los enlaces esperados |
| **Precondición** | Componente envuelto en `BrowserRouter` |
| **Entrada** | Renderizado sin props adicionales |
| **Resultado esperado** | Presencia de: Inicio, Nuestra Escuela, Clases y Sedes, Patrocinadores, Blog, Contacto |
| **Resultado obtenido** | ✅ PASS |

```jsx
it('renders all navigation links', () => {
  render(<BrowserRouter><Navbar /></BrowserRouter>);
  expect(screen.getAllByText('Inicio')[0]).toBeInTheDocument();
  expect(screen.getAllByText('Nuestra Escuela')[0]).toBeInTheDocument();
  expect(screen.getAllByText('Clases y Sedes')[0]).toBeInTheDocument();
  expect(screen.getAllByText('Patrocinadores')[0]).toBeInTheDocument();
  expect(screen.getAllByText('Blog')[0]).toBeInTheDocument();
  expect(screen.getAllByText('Contacto')[0]).toBeInTheDocument();
});
```

---

#### CP-FE-05 — Renderizado del logo

| Campo | Detalle |
|---|---|
| **Descripción** | La barra de navegación contiene la imagen del logo del club con el `alt` correcto |
| **Precondición** | Componente envuelto en `BrowserRouter` |
| **Entrada** | Renderizado sin props adicionales |
| **Resultado esperado** | Imagen con `alt="Taekwondo Sierra Nevada"` presente en el DOM |
| **Resultado obtenido** | ✅ PASS |

```jsx
it('renders the logo', () => {
  render(<BrowserRouter><Navbar /></BrowserRouter>);
  const logo = screen.getByAltText('Taekwondo Sierra Nevada');
  expect(logo).toBeInTheDocument();
});
```

---

## 4. Pruebas de Integración — API REST

**Fichero:** `server/club/tests.py`  
**Framework:** `rest_framework.test.APITestCase`  
**Descripción:** Prueban el comportamiento completo de los endpoints HTTP, incluyendo serialización, permisos, respuestas y efectos secundarios (email, BD).

### 4.1 Formulario de Contacto — `ContactTests`

#### CP-INT-01 — Envío de contacto correcto

| Campo | Detalle |
|---|---|
| **Endpoint** | `POST /api/contact/` |
| **Descripción** | Un envío válido con todos los campos devuelve `200 OK` y genera un email en el outbox |
| **Entrada** | `{nombre, email, mensaje}` completos |
| **Resultado esperado** | `HTTP 200`, `len(mail.outbox) == 1`, asunto y cuerpo correctos |
| **Resultado obtenido** | ✅ PASS |

```python
def test_contact_form_submission_success(self):
    data = {'nombre': 'Test User', 'email': 'test@example.com', 'mensaje': 'Hello, this is a test message.'}
    response = self.client.post(reverse('contact'), data, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(len(mail.outbox), 1)
    self.assertEqual(mail.outbox[0].subject, "Nuevo mensaje de contacto de Test User")
    self.assertIn("Hello, this is a test message.", mail.outbox[0].body)
```

---

#### CP-INT-02 — Envío de contacto con campos incompletos

| Campo | Detalle |
|---|---|
| **Endpoint** | `POST /api/contact/` |
| **Descripción** | Un envío sin el campo `email` y `mensaje` devuelve un error de validación |
| **Entrada** | `{nombre: 'Test User'}` (faltan `email` y `mensaje`) |
| **Resultado esperado** | `HTTP 400 Bad Request` |
| **Resultado obtenido** | ✅ PASS |

```python
def test_contact_form_submission_missing_fields(self):
    response = self.client.post(reverse('contact'), {'nombre': 'Test User'}, format='json')
    self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
```

---

### 4.2 ViewSet de Instructores — `APIViewSetsTests`

#### CP-INT-03 — Listado de instructores (público)

| Campo | Detalle |
|---|---|
| **Endpoint** | `GET /api/instructors/` |
| **Descripción** | Cualquier usuario (sin autenticar) puede listar los instructores |
| **Precondición** | 1 instructor en BD |
| **Resultado esperado** | `HTTP 200`, lista con 1 elemento |
| **Resultado obtenido** | ✅ PASS |

```python
def test_get_instructors_list(self):
    response = self.client.get(reverse('instructor-list'))
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(len(response.data), 1)
```

---

#### CP-INT-04 — Creación de instructor sin autenticar

| Campo | Detalle |
|---|---|
| **Endpoint** | `POST /api/instructors/` |
| **Descripción** | Un usuario no autenticado no puede crear instructores |
| **Entrada** | `{name, rank, bio}` sin token |
| **Resultado esperado** | `HTTP 401 Unauthorized` |
| **Resultado obtenido** | ✅ PASS |

```python
def test_create_instructor_unauthenticated(self):
    data = {'name': 'New', 'rank': '2º DAN', 'bio': 'Bio'}
    response = self.client.post(reverse('instructor-list'), data)
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
```

---

#### CP-INT-05 — Creación de instructor autenticado

| Campo | Detalle |
|---|---|
| **Endpoint** | `POST /api/instructors/` |
| **Descripción** | Un usuario autenticado puede crear un instructor correctamente |
| **Entrada** | `{name, rank, bio}` con usuario autenticado |
| **Resultado esperado** | `HTTP 201 Created` |
| **Resultado obtenido** | ✅ PASS |

```python
def test_create_instructor_authenticated(self):
    self.client.force_authenticate(user=self.user)
    data = {'name': 'New', 'rank': '2º DAN', 'bio': 'Bio'}
    response = self.client.post(reverse('instructor-list'), data)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
```

---

### 4.3 Dashboard de Estadísticas — `DashboardStatsTests`

#### CP-INT-06 — Acceso sin autenticar al dashboard

| Campo | Detalle |
|---|---|
| **Endpoint** | `GET /api/dashboard/stats/` |
| **Descripción** | Un usuario no autenticado no puede acceder a las estadísticas del panel |
| **Resultado esperado** | `HTTP 401 Unauthorized` |
| **Resultado obtenido** | ✅ PASS |

```python
def test_dashboard_stats_unauthenticated(self):
    response = self.client.get(reverse('dashboard-stats'))
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
```

---

#### CP-INT-07 — Estadísticas correctas para usuario autenticado

| Campo | Detalle |
|---|---|
| **Endpoint** | `GET /api/dashboard/stats/` |
| **Descripción** | Un administrador autenticado recibe estadísticas correctas de la BD |
| **Precondición** | 1 instructor y 1 noticia en BD |
| **Resultado esperado** | `HTTP 200`, `stats.instructors == 1`, `stats.news == 1` |
| **Resultado obtenido** | ✅ PASS |

```python
def test_dashboard_stats_authenticated(self):
    self.client.force_authenticate(user=self.user)
    response = self.client.get(reverse('dashboard-stats'))
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['stats']['instructors'], 1)
    self.assertEqual(response.data['stats']['news'], 1)
```

---

### 4.4 Chatbot — `ChatbotTests`

#### CP-INT-08 — Respuesta exitosa del chatbot (mock de n8n)

| Campo | Detalle |
|---|---|
| **Endpoint** | `POST /api/chatbot/` |
| **Descripción** | El endpoint proxy del chatbot reenvía la pregunta a n8n y devuelve la respuesta. n8n se simula con `unittest.mock.patch` |
| **Entrada** | `{pregunta: "¿Qué es el Taekwondo?"}` |
| **Mock** | `requests.post` devuelve `{output: "Esta es una respuesta de prueba."}` |
| **Resultado esperado** | `HTTP 200`, `respuesta == "Esta es una respuesta de prueba."` |
| **Resultado obtenido** | ✅ PASS |

```python
@patch('requests.post')
def test_chatbot_success(self, mock_post):
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {'output': 'Esta es una respuesta de prueba.'}
    response = self.client.post(reverse('chatbot'), {'pregunta': '¿Qué es el Taekwondo?'}, format='json')
    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(response.data['respuesta'], 'Esta es una respuesta de prueba.')
```

---

## 5. Pruebas Funcionales — Casos de Uso

Las siguientes pruebas funcionales se realizaron **manualmente** sobre la aplicación en local (Docker Compose), verificando flujos completos de extremo a extremo desde el navegador.

### 5.1 Acceso público

| ID | Caso de uso | Pasos | Resultado esperado | Estado |
|---|---|---|---|---|
| CP-F-01 | Visualizar página principal | Navegar a `/` | Carga el hero, sección de instructores destacados y noticias recientes | ✅ OK |
| CP-F-02 | Ver detalle de noticia | Clic en una noticia en `/blog` | Navega a `/blog/:slug` y muestra título, imagen y contenido | ✅ OK |
| CP-F-03 | Descargar noticia en PDF | Clic en botón «Descargar PDF» en detalle de noticia | El navegador descarga un PDF con el contenido de la noticia | ✅ OK |
| CP-F-04 | Enviar formulario de contacto | Rellenar y enviar `/contacto` | Mensaje de éxito en pantalla, email recibido en la bandeja del admin | ✅ OK |
| CP-F-05 | Cambio de idioma (ES/EN) | Clic en selector de idioma en la Navbar | Todos los textos de la interfaz cambian al idioma seleccionado | ✅ OK |
| CP-F-06 | Interacción con el chatbot | Abrir el chatbot flotante y escribir una pregunta | El chatbot devuelve una respuesta en lenguaje natural en menos de 30 s | ✅ OK |

### 5.2 Autenticación y panel de administración

| ID | Caso de uso | Pasos | Resultado esperado | Estado |
|---|---|---|---|---|
| CP-F-07 | Login de administrador | Navegar a `/login`, introducir credenciales correctas | Redirige al `/admin/dashboard` con token almacenado | ✅ OK |
| CP-F-08 | Acceso sin autenticar a ruta protegida | Intentar acceder directamente a `/admin/noticias` sin sesión | Redirige automáticamente a `/login` | ✅ OK |
| CP-F-09 | Creación de noticia | En el panel, rellenar el formulario de nueva noticia y guardar | La noticia aparece en el listado y en `/blog` con su slug generado | ✅ OK |
| CP-F-10 | Edición de instructores | Modificar el nombre de un instructor y guardar | Los cambios se reflejan inmediatamente en la página pública | ✅ OK |
| CP-F-11 | Eliminación de patrocinador | Eliminar un patrocinador desde el panel | El patrocinador desaparece del listado público | ✅ OK |
| CP-F-12 | Cambio de contraseña | Ir a perfil → cambiar contraseña con credenciales correctas | Mensaje de éxito; se requiere la nueva contraseña en el próximo login | ✅ OK |
| CP-F-13 | Importación de usuario instructor (n8n) | Disparar el workflow de n8n con datos de un nuevo instructor | El usuario es creado en Django con `is_active=False` y recibe email de verificación | ✅ OK |
| CP-F-14 | Verificación de email de nuevo instructor | Clic en el enlace del email de verificación | El usuario queda activo y puede hacer login | ✅ OK |

---

## 6. Pruebas de Rendimiento

Las pruebas de rendimiento se realizaron de forma **observacional** durante el despliegue en AWS EKS, midiendo tiempos de respuesta en condiciones normales de uso.

### 6.1 Tiempos de carga de la aplicación (producción — EKS)

| Página | Tiempo de primera carga (TTFB + render) | Observaciones |
|---|---|---|
| Página principal `/` | ~400–600 ms | Bundle estático servido por Nginx en ECR |
| Listado de noticias `/blog` | ~300–500 ms | Petición a `/api/news/` incluida |
| Detalle de noticia `/blog/:slug` | ~250–400 ms | Carga estática + 1 petición API |
| Panel admin `/admin/dashboard` | ~500–700 ms | Incluye petición a `/api/dashboard/stats/` |

### 6.2 Escalabilidad en Kubernetes

| Escenario | Configuración | Resultado |
|---|---|---|
| Disponibilidad del frontend | 2 réplicas del `frontend-deployment` | Alta disponibilidad; si un pod cae, el otro sigue sirviendo tráfico |
| Disponibilidad del backend | 2 réplicas del `backend-deployment` | Peticiones repartidas entre los 2 pods por el `ClusterIP` Service |
| Persistencia de datos | PVC EBS de 1Gi para PostgreSQL | Los datos persisten ante reinicios de pods |
| Proxy de entrada | 1 réplica + AWS LoadBalancer | Punto de entrada único con enrutamiento a frontend y backend |

### 6.3 Respuesta del chatbot RAG

| Métrica | Valor observado | Condición |
|---|---|---|
| Tiempo de respuesta (entorno local) | 5–15 s | Ollama + Qdrant en Docker Compose local |
| Timeout configurado en el backend | 30 s | Definido en `ChatbotView` con `requests.post(..., timeout=30)` |

---

## 7. Ejecución de las Pruebas

### Backend (Django)

```bash
cd server
python manage.py test club
```

Salida esperada:
```
Found 9 test(s).
..........
----------------------------------------------------------------------
Ran 9 tests in 0.XXXs

OK
```

### Frontend (Vitest)

```bash
cd client
npm run test
```

Salida esperada:
```
 ✓ src/tests/Navbar.test.jsx (2)
 ✓ src/tests/ChatBot.test.jsx (3)

 Test Files  2 passed (2)
      Tests  5 passed (5)
```

---

## 8. Integración con CI/CD

Las pruebas automatizadas se ejecutan en el **primer job** del pipeline de GitHub Actions (`.github/workflows/cicd.yml`) ante cada `push` o `pull request` a la rama `main`. Si alguna prueba falla, el pipeline se detiene y no se despliega nada en AWS.

```yaml
jobs:
  test:
    name: Run Unit Tests
    steps:
      - name: Run Frontend Tests
        run: npm run test          # Vitest (5 tests)
        working-directory: client

      - name: Run Backend Tests
        run: python manage.py test  # Django TestCase (9 tests)
        working-directory: server
```
