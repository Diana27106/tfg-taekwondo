-- Tablas para el chatbot
CREATE TABLE IF NOT EXISTS conversaciones_chatbot (
    id SERIAL PRIMARY KEY,
    mensaje_usuario TEXT NOT NULL,
    respuesta_bot TEXT NOT NULL,
    herramienta_usada VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consultas_rag (
    id SERIAL PRIMARY KEY,
    pregunta TEXT NOT NULL,
    respuesta TEXT NOT NULL,
    documentos_usados TEXT[],
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS documentos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    num_chunks INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
