# Manual de Instalación Definitivo (Paso a Paso desde Cero)

## FASE 1: Descargar los 4 Programas Necesarios

Tu ordenador necesita "aprender a hablar" los idiomas de nuestra página web. Para ello, instalaremos 4 programas gratuitos, oficiales y totalmente seguros.

### 1. Git (El programa para descargar el proyecto)
Git sirve para descargar carpetas completas desde internet de forma segura.
1. Abre tu navegador de internet (Chrome, Safari, Edge) y ve a esta página: [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Verás unos botones que dicen "macOS", "Windows" y "Linux". Haz clic en el que corresponda a tu ordenador.
   * **Windows:** Haz clic en "Click here to download". Ábrelo y haz clic en "Next" unas 10 veces hasta instalar.
   * **Mac:** Haz clic en el botón de descarga y sigue los pasos habituales.
   * **Linux (Ubuntu/Debian):** Abre la terminal y escribe `sudo apt install git`.

### 2. Node.js 
Node.js es lo que permite que los botones, las imágenes y las animaciones de la web funcionen.
1. Ve a esta página: [https://nodejs.org/es/](https://nodejs.org/es/)
2. Verás dos botones verdes grandes. Haz clic **siempre en el de la izquierda**, el que dice **"LTS (Recomendado para la mayoría de los usuarios)"**.
3. Abre el archivo descargado. 
4. Haz clic en "Next", acepta los términos (marcando la casilla "I accept"), y sigue dándole a "Next" hasta darle a "Install".
   * **Linux:** Puedes instalarlo desde la terminal con `sudo apt install nodejs npm`.

### 3. Python 
Python es el lenguaje matemático que guarda los datos, los alumnos y las contraseñas de forma segura.
1. Ve a esta página: [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. Haz clic en el botón amarillo grande que dice **"Download Python 3.XX"** (el número puede variar, no importa).
3. Abre el archivo descargado.
4. **¡CUIDADO AQUÍ! (Solo para Windows):** En la primera ventanita que se abre, abajo del todo verás una casilla desmarcada que dice **"Add python.exe to PATH"**. **TIENES QUE MARCAR ESA CASILLA** obligatoriamente.
5. Una vez marcada, haz clic arriba en **"Install Now"** (Instalar ahora).
   * **Linux:** Generalmente ya viene instalado. Puedes comprobarlo escribiendo `python3 --version` en la terminal. Si no lo tienes, escribe `sudo apt install python3 python3-pip python3-venv`.

### 4. Docker Desktop (Opcional, con instalar docker y docker compose desde terminal es suficiente)
Docker crea "cajas fuertes virtuales" donde la Inteligencia Artificial y la Base de Datos pueden funcionar sin romper nada en tu ordenador.
1. Ve a esta página: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Haz clic en el botón azul de descarga para tu sistema.
3. Ábrelo, instala y, si te pide reiniciar el ordenador, **reinícialo**.
4. Tras reiniciar, busca "Docker Desktop" en tus programas, ábrelo, acepta los términos y **déjalo minimizado**.
   * **Linux:** Puedes instalar el motor directamente desde la terminal con `sudo apt install docker.io docker-compose`.

---

## FASE 2: Descargar el Proyecto a tu Ordenador

Ahora vamos a usar una pantalla negra con letras blancas llamada "Terminal". No te asustes, es muy fácil.

1. **Cómo abrir la Terminal:**
   * **En Windows:** Haz clic en el botón de Inicio (la ventanita abajo a la izquierda), escribe la palabra `cmd` y pulsa Enter. Se abrirá una ventana negra llamada "Símbolo del sistema".
   * **En Mac:** Pulsa la lupa de arriba a la derecha (Spotlight), escribe `Terminal` y pulsa Enter.
   * **En Linux:** Pulsa a la vez las teclas `Ctrl` + `Alt` + `T`.

2. En esa ventana negra, escribe exactamente esto (puedes copiarlo y pegarlo):
   ```bash
   git clone https://github.com/Diana27106/tfg-taekwondo.git
   ```
3. Pulsa la tecla **Enter**. Verás que salen unas letras indicando que se está descargando.
4. Cuando termine y vuelva a salir tu nombre en la pantalla, escribe lo siguiente para entrar en la carpeta recién descargada:
   ```bash
   cd tfg-taekwondo
   ```
5. Pulsa **Enter**. Déjala abierta.

---

## FASE 3: Configurar el Archivo Secreto (.env)

El proyecto necesita un archivo que le diga cómo conectarse a la base de datos.
1. Cierra todas las ventanas (menos el Docker Desktop y la terminal negra que teníamos abierta).
2. Abre tus carpetas normales (el Explorador de Archivos de Windows, el Finder de Mac o el Gestor de Archivos en Linux).
3. Busca una carpeta llamada `tfg-taekwondo`. Normalmente se guarda en tu carpeta personal de Usuario (C:\Usuarios\TuNombre\tfg-taekwondo o /home/TuNombre/tfg-taekwondo). Entra en ella.
4. Verás muchos archivos. Busca uno que se llama **`.env.example`**.
   * *Si no lo ves, es posible que tengas los "archivos ocultos" desactivados. En Windows, ve arriba a "Ver" -> "Mostrar" -> y marca "Elementos ocultos". En Mac/Linux, pulsa `Ctrl+H` o `Cmd+Shift+.`.*
5. Haz clic derecho sobre el archivo `.env.example` y dale a **Copiar**.
6. Haz clic derecho en un espacio en blanco de la carpeta y dale a **Pegar**. Se creará un archivo llamado `.env.example - copia`.
7. Haz clic derecho sobre ese nuevo archivo, dale a **Cambiar nombre**, y bórralo todo para llamarlo exactamente **`.env`** (un punto seguido de las letras env).
8. Te preguntará si estás seguro de cambiar la extensión. Dile que **Sí**.

---

## FASE 4: Encender la Aplicación (El paso principal)

Para encender todo, necesitamos **abrir 3 ventanas negras (Terminales) diferentes**. Vamos a ir paso a paso.

### VENTANA NEGRA 1: Encender la Base de Datos SQL y la IA
1. Vuelve a la ventana negra que tenías abierta antes (donde pusiste `cd tfg-taekwondo`).
2. Escribe exactamente esto:
   ```bash
   docker-compose up -d
   ```
   *(Si usas Linux y te da error de permisos, escribe `sudo docker-compose up -d` y pon tu contraseña de usuario).*
3. Pulsa **Enter**. 
4. *ATENCIÓN:* Verás barras descargando cosas. Como está descargando la Base de Datos Relacional (PostgreSQL) y el "Cerebro" de la Inteligencia Artificial (Ollama), **puede tardar entre 5 y 15 minutos**. Ve a tomarte un café. No toques nada hasta que veas que pone "Done" (Hecho) en todas las líneas.

### PASO EXTRA: Configuración Interna de los Contenedores
A veces los contenedores necesitan un empujón manual para estar listos:

1. **Descargar los Modelos de IA (Ollama):**
   Abre una terminal y escribe esto para entrar al "cerebro" y descargar los modelos necesarios:
   ```bash
   docker exec -it tfg-taekwondo-ollama ollama pull llama3
   docker exec -it tfg-taekwondo-ollama ollama pull mxbai-embed-large
   ```
2. **Activar las tablas de la Base de Datos (PostgreSQL):**
   Para asegurarnos de que el Chatbot puede guardar las conversaciones, escribe esto:
   ```bash
   docker exec -it tfg-taekwondo-postgres psql -U admin -d taekwondodb -f /docker-entrypoint-initdb.d/init.sql
   ```

### VENTANA NEGRA 2: Encender el Sistema Gestor (Django)
1. Abre una **NUEVA ventana negra** (Inicio -> busca `cmd` o abre otra Terminal).
2. Tienes que ir a la carpeta del servidor. Escribe esto pulsando Enter al final de cada línea:
   ```bash
   cd tfg-taekwondo
   cd server
   ```
3. Ahora vamos a instalar las herramientas matemáticas (Python). Copia, pega y pulsa Enter para **CADA UNA de estas líneas**, una por una. (Espera a que termine una antes de poner la siguiente).
   
   **Si usas WINDOWS:**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   ```
   **Si usas MAC o LINUX:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip3 install -r requirements.txt
   python3 manage.py migrate
   ```
4. *Paso Especial (Crear tu cuenta de jefe):* Tienes que crear tu usuario administrador. Escribe:
   ```bash
   python manage.py createsuperuser
   ```
   (O `python3 manage.py createsuperuser` en Mac/Linux). Te pedirá un nombre de usuario (pon "admin"), un email (pulsa Enter para dejarlo vacío), y una contraseña (escribe "admin"). *Nota: Cuando escribas la contraseña, no se verán las letras, es normal por seguridad. Escribe y pulsa Enter.*
5. Por último, enciende el motor:
   ```bash
   python manage.py runserver
   ```
   (O `python3 manage.py runserver`). Verás unas letras verdes o blancas que dicen "Starting development server". **NO CIERRES ESTA VENTANA.** Déjala minimizada.

### VENTANA NEGRA 3: Encender la Web Visual (React)
1. Abre la **TERCERA y última ventana negra** (`cmd` o Terminal).
2. Tienes que ir a la carpeta visual. Escribe y pulsa Enter:
   ```bash
   cd tfg-taekwondo
   cd client
   ```
3. Ahora instala los colores e imágenes (Tardará 1-2 minutos):
   ```bash
   npm install
   ```
4. Por último, enciende la web:
   ```bash
   npm run dev
   ```
   Verás unas letras verdes indicando que el servidor web local se ha iniciado. **NO CIERRES ESTA VENTANA.**

---

## FASE 5: Configurar la Inteligencia Artificial (Importar Workflow n8n)

Tenemos que enseñarle a la IA cómo debe hablar. Para ello usaremos n8n, el orquestador visual que hemos instalado con Docker.

1. Abre tu navegador de internet (Chrome, Safari, etc.) y escribe esta dirección:
   **`http://localhost:5678`**
2. Se abrirá la pantalla de configuración de n8n. Sigue los pasos para crear tu cuenta local (pon cualquier email y contraseña, es solo para ti). No necesitas conexión a la nube, dale a "Skip" (Saltar) en las encuestas de registro.
3. Una vez dentro del panel principal de n8n, busca a la izquierda el apartado **"Workflows"** y dale a **"Add Workflow"** (Añadir nuevo flujo) o al botón "+".
4. Arriba a la derecha, verás un botón o tres puntitos de opciones. Haz clic y busca la opción **"Import from File..."** (Importar desde archivo).
5. Se abrirá una ventana para buscar en tu ordenador. Ve a la carpeta `tfg-taekwondo` que descargamos al principio.
6. Dentro de esa carpeta, busca una que se llama `n8n-workflows`.
7. Selecciona el archivo que termine en `.json` (el archivo del workflow del chatbot) y ábrelo.
8. Verás cómo aparece una red de conexiones increíble en tu pantalla. 
9. **Configurar Credenciales (MUY IMPORTANTE):**
   Aunque hayas importado el flujo, n8n necesita saber *cómo* entrar a Ollama y a la Base de Datos:
   * Busca en el menú de la izquierda el icono de una llave (**"Credentials"**).
   * Pulsa en **"Add Credential"**.
   * Busca **"Ollama"**. En la URL pon: `http://host.docker.internal:11434`.
   * Busca **"Postgres"**. Pon los datos que configuraste en el `.env` (Host: `host.docker.internal`, Port: `5433`, User: `admin`, Pass: `admin`, DB: `taekwondodb`).
   * Vuelve al Workflow, haz clic en los nodos que tengan un aviso rojo y selecciona las credenciales que acabas de crear.
10. IMPORTANTE: Arriba a la derecha, activa el interruptor que dice **"Active"** o **"Inactive"** para encenderlo, y haz clic en el botón de guardar (Save). ¡La IA ya está conectada al sistema!

---

## FASE 6: ¡Disfrutar y Entender el Sistema!

¡Lo has conseguido! Todo el complejo ecosistema informático (Frontend, Backend, Bases de Datos SQL, Vectoriales y Modelos de Lenguaje Locales) está funcionando en tu ordenador.

Para navegar por el proyecto, usa tu navegador normal con estas direcciones:

1. **La Página Web Pública (Lo que ven los alumnos):**
   [http://localhost:5173](http://localhost:5173)
   
2. **El Panel de Administración (Donde creas noticias y gestionas sedes):**
   [http://localhost:8000/admin](http://localhost:8000/admin)
   *(Inicia sesión con el usuario "admin" y contraseña "admin" que creaste en la Fase 4).*

3. **La Base de Datos SQL (Para usuarios avanzados):**
   Si quieres conectar un programa como DBeaver o pgAdmin para ver los datos puros:
   * **Host:** `localhost`
   * **Puerto:** `5433` (No es 5432, para evitar choques con otras instalaciones)
   * **Usuario:** `admin`
   * **Contraseña:** `admin`
   * **Base de datos:** `taekwondodb`

---

## ¿Cómo apagar todo cuando termine de trabajar?
Es importante apagar los motores para que tu ordenador no consuma batería y memoria innecesariamente:
1. Ve a las 3 ventanas negras que tienes abiertas.
2. En cada una de ellas, pulsa a la vez las teclas **Control (Ctrl) y la letra C**. Verás que el texto se detiene y vuelves a poder escribir comandos normales. 
3. Cierra las 3 ventanas negras dándole a la "X" de la esquina.
4. En el programa "Docker Desktop" que instalaste al principio, ve a "Containers" y pulsa el botón de Stop (el cuadrado) al lado de "tfg-taekwondo".
5. Si instalaste Docker en Linux sin interfaz gráfica, abre una terminal en la carpeta `tfg-taekwondo` y escribe `sudo docker-compose down`.
