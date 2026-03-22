# tfg-taekwondo

Es el repositorio de la página web de taekwondo sierra nevada. que he realizado como trabajo de fin de grado.


1. Levantar la base de datos (Docker): Abre una terminal en la carpeta raíz del proyecto (tfg-taekwondo) y ejecuta:

bash
docker compose up -d
(Ahora debería arrancar sin dar error de puerto).

2. Ejecutar y preparar el Backend (Django): En una terminal dentro de la carpeta /server (asegúrate de tener activado tu entorno virtual si usas uno source venv/bin/activate), ejecuta estos comandos en orden:

bash
# Aplicar todas las migraciones para crear las tablas en la BD
python manage.py migrate
# Crear tu usuario administrador (el que usarás para hacer login en el dashboard de react)
python manage.py createsuperuser
# Arrancar el servidor backend
python manage.py runserver
3. Arrancar el Frontend (React): En otra terminal, dentro de la carpeta /client, ejecuta:

bash
npm run dev
Con esto, si entras a http://localhost:5173/login, podrás iniciar sesión con el usuario que hayas creado en el paso 2 y el dashboard consumirá correctamente los datos de instructores desde tu API de Django.


Smollm2:1.7B es una bestia - modelo ollama
