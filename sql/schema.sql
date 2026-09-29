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

CREATE VIEW vista_imagen_generacion AS
SELECT
    i.id_imagen,
    i.id_asset,
    i.nombre_archivo,
    i.ruta,
    i.fecha_creacion AS fecha_creacion_imagen,
    g.id_generacion,
    g.id_prompt,
    g.prompt_positivo,
    g.prompt_negativo,
    g.semilla,
    g.checkpoint,
    g.sampler,
    g.scheduler,
    g.steps,
    g.cfg,
    g.id_imagen_referencia,
    g.id_imagen_salida,
    g.fecha_creacion AS fecha_creacion_generacion
FROM imagen i
    JOIN generacion g ON i.id_imagen = g.id_imagen_salida;

    SELECT * FROM vista_imagen_generacion WHERE id_imagen = 1;