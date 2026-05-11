# Documentación del Proyecto TFG Taekwondo

Bienvenido a la documentación técnica del sistema de gestión para el Club de Taekwondo.

Este sitio contiene:

*   **Manuales de Usuario y Administración**: Guías para el uso y despliegue del sistema.
*   **Documentación de Código (Backend)**: Referencia automática de las clases y funciones de Django.
*   **Documentación de Código (Frontend)**: Guía para la generación de documentación JSDoc en React.

## Estructura del Proyecto

*   `server/`: Backend Django (Python).
*   `client/`: Frontend React (JavaScript/Vite).
*   `n8n-workflows/`: Automatizaciones y flujos de datos.

## Comandos Útiles

### Generar Documentación Backend
```bash
mkdocs serve  # Para previsualizar
mkdocs build  # Para generar archivos estáticos
```

### Generar Documentación Frontend
```bash
cd client
npm run docs
```
