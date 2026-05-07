# Modelo Identidad-Relación y Estructura de la Base de Datos

Este documento describe la arquitectura de datos del sistema para el club de Taekwondo, detallando las entidades, sus atributos y las relaciones que las conectan.

## 1. Diagrama Entidad-Relación (Mermaid)

```mermaid
erDiagram
    INSTRUCTOR ||--o{ GROUP : "enseña"
    LOCATION }o--o{ GROUP : "alberga"
    
    INSTRUCTOR {
        int id PK
        string name "Nombre Completo"
        string rank "Grado (Dan)"
        text bio "Biografía"
        image photo "Foto Perfil"
    }

    LOCATION {
        int id PK
        string name "Nombre de la Sede"
        string address "Dirección"
        string city "Ciudad"
        url google_maps_url "Link Maps"
        image photo "Foto Sede"
    }

    GROUP {
        int id PK
        string age_range "Rango de Edad"
        string schedule "Horario"
        int instructor_id FK
    }

    EVENT {
        int id PK
        string title "Título"
        text description "Descripción"
        datetime start_date "Inicio"
        datetime end_date "Fin"
        url registration_link "Inscripción"
        string location "Lugar"
    }

    SPONSOR {
        int id PK
        string name "Empresa"
        image logo "Logo"
        url website "URL"
        boolean is_active "Estado"
    }

    NEWS {
        int id PK
        string title "Título"
        slug slug "Slug URL"
        datetime published_at "Fecha"
        image img1 "Imagen Principal"
        text content "Contenido"
    }

    CHAT_QUERY {
        int id PK
        text user_question "Pregunta"
        text bot_response "Respuesta"
        datetime created_at "Fecha"
        json metadata "Metadatos"
    }

    CHAT_DOCUMENT {
        int id PK
        string title "Título"
        file file "Archivo PDF/Doc"
        datetime uploaded_at "Subida"
        json metadata "Metadatos RAG"
    }
```

---

## 2. Explicación de las Entidades

### Núcleo de Gestión Deportiva
*   **Instructor**: Almacena la información de los maestros. Es una entidad fundamental ya que el prestigio del club se basa en su equipo técnico.
*   **Location (Sedes)**: Representa los lugares físicos donde se imparten clases. Incluye geolocalización mediante Google Maps.
*   **Group (Clases)**: Es el núcleo lógico. Define la unión entre un **Instructor**, una o varias **Sedes** y un **Horario/Edad**. 
    *   *Relación 1:N*: Un instructor puede tener múltiples grupos a su cargo.
    *   *Relación N:M*: Un grupo puede impartirse en varias sedes, y cada sede puede albergar diferentes grupos.

### Contenido Público y Marketing
*   **Event (Eventos)**: Gestión de exámenes, competiciones y seminarios. Permite enlaces externos para inscripciones.
*   **Sponsor (Patrocinadores)**: Empresas que apoyan al club. Tienen un estado de "activo" para controlar su visibilidad en el carrusel de la web.
*   **News (Noticias)**: Sistema de blog con generación automática de *slugs* para URLs amigables (SEO).

### Inteligencia Artificial (Chatbot & RAG)
*   **ChatQuery**: Registro histórico de conversaciones. Permite analizar qué preguntan más los usuarios para mejorar el servicio.
*   **ChatDocument**: Repositorio de documentos (PDFs, normativas) que alimentan el sistema RAG (Retrieval-Augmented Generation) para que el chatbot responda con base en datos oficiales del club.

---

## 3. Especificaciones Técnicas
*   **Motor**: PostgreSQL (gestionado vía Docker).
*   **Framework**: Django ORM.
*   **Almacenamiento de Medios**: Los campos `ImageField` y `FileField` guardan las referencias en la base de datos, mientras que los archivos físicos se almacenan en el directorio `/media/` del servidor.
