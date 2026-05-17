# Manual de Administración

Este manual de administración está diseñado como una guía completa y exhaustiva para el personal encargado de la estabilidad, infraestructura y supervisión del software. Cualquier administrador de sistemas o responsable técnico que asuma el proyecto podrá comprender y operar las herramientas clave gracias a esta documentación.

---

## 1. Gestión de Usuarios y Permisos

La plataforma distingue entre varios tipos de usuarios para garantizar la seguridad de la información. La gestión centralizada de usuarios se realiza desde el panel de administración nativo de Django.

### A. Tipos de Usuarios (Roles)

1. **Admin Principal (Superusuario):**
   - Tiene acceso total y sin restricciones a todos los módulos del sistema.
   - Puede acceder a la interfaz nativa del servidor (`URL_SERVIDOR/admin`) para crear, editar o eliminar cualquier registro crítico (usuarios, grupos de permisos, datos estructurales).
   - Es el único perfil autorizado para alterar permisos, gestionar la base de datos a nivel profundo y ver auditorías completas de la plataforma.

2. **Instructor (Usuario con Licencia/Permisos de Instructor):**
   - Tiene un acceso limitado al panel de control de la aplicación (el Dashboard de frontend).
   - Puede gestionar el contenido propio relacionado con sus clases (publicar noticias o eventos, gestionar grupos, etc.), pero **no puede** acceder al panel de administración avanzado de Django ni modificar roles de otros miembros del personal.
   - No tiene permisos para alterar configuraciones técnicas del sistema ni ver parámetros confidenciales.

### B. Gestión Manual de Usuarios (Vía Superusuario)
1. Navega a `URL_SERVIDOR/admin` e inicia sesión con las credenciales de Superusuario.
2. En el panel, dirígete a la sección **Autenticación y Autorización** > **Usuarios**.
3. Desde aquí puedes crear nuevos perfiles, cambiar contraseñas o asignar a los usuarios existentes a grupos específicos (como el grupo "Instructores") para concederles o retirarles permisos en bloque.

### C. Registro Automático de Instructores (Vía n8n y Google Drive)
Para simplificar la incorporación de personal al club, el alta de instructores está automatizada:
1. Se mantiene un documento en **Google Drive** (hoja de cálculo) destinado al registro de nuevos usuarios con licencia oficial o que requieren permisos de instructor.
2. Cada vez que el club añade una nueva fila con los datos de un instructor, el orquestador **n8n** detecta el cambio de forma automática gracias a sus integraciones.
3. n8n ejecuta un flujo de trabajo (workflow) que se comunica directamente con la API de nuestro backend y crea el usuario en la base de datos de PostgreSQL, asignándole automáticamente los permisos correspondientes de "Instructor". Así, el nuevo miembro puede iniciar sesión sin que el equipo de TI tenga que crearlo manualmente.

---

## 2. Copias de Seguridad (Backups)

Es vital asegurar la persistencia de los datos ante posibles fallos del servidor o de la infraestructura en AWS.

### A. Base de Datos Relacional (PostgreSQL)
PostgreSQL almacena todo el contenido estructural de la aplicación (usuarios, contraseñas encriptadas, noticias, sedes, instructores). Se deben realizar volcados (dumps) regulares de la información:

Para hacer un backup manual completo desde la terminal del servidor (entorno Docker):
```bash
docker exec -t tfg-taekwondo-postgres pg_dumpall -c -U admin > backup_postgres_$(date +%F).sql
```

Para restaurar una copia de seguridad en caso de fallo:
```bash
cat backup_postgres_fecha.sql | docker exec -i tfg-taekwondo-postgres psql -U admin
```

### B. Base de Datos Vectorial (Qdrant) y Modelos IA
Los datos de los modelos de inteligencia artificial y los vectores de conocimiento persisten en volúmenes.
- **Vectores en Qdrant:** Más allá de copiar el volumen, la mejor estrategia de backup es conservar siempre los PDFs y documentos originales. Si la base de datos vectorial se corrompe, se pueden volver a procesar los documentos en n8n para regenerar la colección de conocimiento del chatbot.
- **Infraestructura Cloud:** En el entorno de producción (AWS EKS), los datos están respaldados por volúmenes EBS. Se recomienda mantener activados los *Snapshots Automáticos* en la consola de AWS EC2 para poder revertir los discos a un estado anterior rápidamente.

---

## 3. Configuración Avanzada e Inteligencia Artificial

### A. Orquestador n8n
El servidor n8n es el "cerebro" que une los distintos servicios (como la creación de usuarios desde Drive o el flujo de respuestas RAG del chatbot).
- **Acceso:** Navega a la interfaz de n8n configurada e inicia sesión.
- **Mantenimiento de Credenciales:** Si la automatización de Google Drive deja de funcionar, lo más probable es que el token de Google haya expirado. Debes ir a la pestaña "Credentials" en n8n, buscar la credencial de Google y re-autorizarla.
- **Auditoría de Errores:** Si un usuario reporta que no se creó su cuenta o el chatbot no responde, revisa la pestaña "Executions". Allí verás un log visual paso a paso para identificar dónde falló el proceso (ej. un servicio caído o un dato mal formateado).

### B. Gestión Vectorial en Qdrant
Qdrant almacena el "conocimiento" del club.
- Las colecciones vectoriales se crean al procesar documentos. Si subes un nuevo reglamento del club (PDF), n8n se encarga de dividir el texto en fragmentos.
- Usa el modelo de embeddings de Ollama para convertir el texto en vectores y guardarlos en Qdrant, permitiendo al chatbot realizar búsquedas semánticas precisas.

---

## 4. Mantenimiento del Sistema y Despliegue

### A. Depuración de Logs
Si la plataforma deja de estar disponible o muestra errores (ej. `500 Internal Server Error`), el administrador debe revisar los logs de los contenedores.

**En entorno Docker (local/pruebas):**
```bash
docker logs tfg-taekwondo-backend --tail 100 -f
docker logs tfg-taekwondo-frontend --tail 100 -f
```

**En entorno Kubernetes AWS EKS (producción):**
```bash
kubectl get pods -n <namespace-del-proyecto>
kubectl logs <nombre-del-pod-backend>
```
Revisar las trazas de Python/Django para identificar el origen del problema (por ejemplo, desconexiones con PostgreSQL o errores de validación).

### B. Actualización de Modelos de IA (Ollama)
Ollama ejecuta los modelos de lenguaje localmente. Si sale una versión más rápida o precisa del modelo (ej. una nueva iteración de Llama), se puede actualizar:
1. Acceder al contenedor o Pod donde corre Ollama:
```bash
docker exec -it tfg-taekwondo-ollama /bin/bash
```
2. Descargar la actualización del modelo:
```bash
ollama pull llama3:latest
```
3. Si cambias el nombre del modelo a utilizar, recuerda actualizar las variables de entorno correspondientes (como `OLLAMA_MODEL` en tu `.env` o en los *ConfigMaps* de Kubernetes) y reiniciar el backend.

### C. Optimización de Recursos
Los modelos LLM y los orquestadores consumen intensivamente la CPU y Memoria (RAM) del servidor.
- Monitoriza los nodos usando comandos como `htop` en Linux o `kubectl top nodes` en Kubernetes.
- Si notas que el chatbot tarda demasiado en responder o los contenedores se reinician por falta de memoria (OOMKilled), considera escalar verticalmente (cambiando a instancias EC2 con más RAM en AWS) el nodo específico que aloja el contenedor de Ollama.
