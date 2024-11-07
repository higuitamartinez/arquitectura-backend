CREATE TABLE categoria(
	categoria_id INT NOT NULL,
	nombre VARCHAR(150) NOT NULL,
	CONSTRAINT categoria_pk PRIMARY KEY (categoria_id)
);

CREATE TABLE vulnerabilidad (
  vulnerabilidad_id INT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  CONSTRAINT vulnerabilidad_pk PRIMARY KEY (vulnerabilidad_id)
); 

CREATE TABLE activo(
	activo_id INT AUTO_INCREMENT,
	codigo VARCHAR(20) NOT NULL,
	nombre VARCHAR(150) NOT NULL,
	categoria_id INT NOT NULL,
	CONSTRAINT activo_pk PRIMARY KEY (activo_id),
	CONSTRAINT categoria_fk1 FOREIGN KEY (categoria_id) REFERENCES categoria (categoria_id)
);

CREATE TABLE categoria_vulnerabilidad(
	categoria_vulnerabilidad_id INT NOT NULL,
	categoria_id INT NOT NULL,
	vulnerabilidad_id INT NOT NULL,
	CONSTRAINT categoria_vulnerabilidad_pk PRIMARY KEY (categoria_vulnerabilidad_id),
	CONSTRAINT categoria_fk2 FOREIGN KEY (categoria_id) REFERENCES categoria (categoria_id),
	CONSTRAINT vulnerabilidad_fk1 FOREIGN KEY (vulnerabilidad_id) REFERENCES vulnerabilidad (vulnerabilidad_id)
);
