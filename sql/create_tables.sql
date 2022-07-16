DROP TABLE IF EXISTS ingredients CASCADE;
DROP TABLE IF EXISTS materials CASCADE;
DROP TABLE IF EXISTS products CASCADE;
-- Creation of product table
CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  product_name varchar(150) NOT NULL UNIQUE,
  product_value INT NOT NULL
);

-- Creation of material table
CREATE TABLE IF NOT EXISTS materials (
  material_id SERIAL PRIMARY KEY,
  material_name varchar(150) NOT NULL UNIQUE,
  material_quantity INT NOT NULL
);

-- Creation of ingredient table
CREATE TABLE IF NOT EXISTS ingredients (
  ingredient_id SERIAL,
  PRIMARY KEY(product_id, material_id),
  ingredient_quantity INT NOT NULL,
  product_id INT NOT NULL,
  material_id INT NOT NULL,
      FOREIGN KEY(product_id) 
	  REFERENCES products(product_id),
      FOREIGN KEY(material_id) 
	  REFERENCES materials(material_id)
);

