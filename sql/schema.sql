USE nekoassets;

CREATE DATABASE nekoassets;

CREATE TABLE asset (
    id_asset INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE imagen (
    id_imagen INT AUTO_INCREMENT PRIMARY KEY,
    id_asset INT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta TEXT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_asset) REFERENCES asset (id_asset)
);

CREATE TABLE generacion (
    id_generacion INT AUTO_INCREMENT PRIMARY KEY,
    id_prompt VARCHAR(100) NOT NULL UNIQUE,
    prompt_positivo TEXT,
    prompt_negativo TEXT,
    semilla BIGINT,
    checkpoint VARCHAR(255),
    sampler VARCHAR(100),
    scheduler VARCHAR(100),
    steps INT,
    cfg FLOAT,
    id_imagen_referencia INT NULL,
    id_imagen_salida INT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_imagen_referencia) REFERENCES imagen (id_imagen),
    FOREIGN KEY (id_imagen_salida) REFERENCES imagen (id_imagen)
);

SELECT * FROM imagen;
SELECT * FROM generacion;