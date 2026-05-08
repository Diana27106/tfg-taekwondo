# 11.4. Manual de Administración

Este manual está dirigido exclusivamente a los gestores del club y personal técnico encargado de mantener actualizado el contenido de la plataforma.

## 1. Acceso al Panel de Administración

Para acceder al panel de control, navegue a `/login` e introduzca sus credenciales de administrador. Una vez dentro, accederá al **Dashboard Principal**.

## 2. Gestión de Contenidos (CRUD)

Desde el panel lateral, puede gestionar los siguientes módulos:

### A. Instructores
*   **Crear**: Sube una foto, añade el grado Dan y una biografía profesional.
*   **Editar**: Actualiza el rango del instructor si ha subido de grado.
*   **Buscador**: Usa la barra superior para buscar instructores por nombre o rango en tiempo real.

### B. Noticias (Blog)
*   Añade artículos sobre los logros del club. El sistema genera automáticamente la URL amigable (slug) para mejorar el posicionamiento en buscadores.

### C. Eventos del Calendario
*   Registra fechas de competiciones o seminarios.
*   **Importante**: Asegúrate de incluir el enlace de inscripción si es un evento externo.

### D. Patrocinadores
*   Gestiona los logos de las empresas colaboradoras. Puedes desactivarlos temporalmente sin borrarlos desmarcando la casilla "¿Activo?".

## 3. Gestión de Usuarios

El sistema utiliza el administrador nativo de Django para una gestión de seguridad avanzada:
1.  Acceda a `URL_SERVIDOR/admin`.
2.  En el módulo **"Usuarios"**, puede crear nuevos perfiles de personal administrativo.
3.  Asigne los permisos necesarios para evitar que personal no autorizado borre datos críticos.

## 4. Mantenimiento y Seguridad

### Copias de Seguridad (Backups)
Se recomienda realizar una copia de seguridad semanal de la base de datos PostgreSQL:
```bash
docker exec -t tfg-taekwondo-postgres pg_dumpall -c -U admin > backup_fecha.sql
```

### Gestión de Documentos IA (RAG)
Para que el chatbot esté actualizado, debe subir los últimos reglamentos y normativas en formato PDF desde la sección **"Documentos RAG"** del panel administrativo. El sistema re-indexará automáticamente la información para que la IA "aprenda" los nuevos datos.
