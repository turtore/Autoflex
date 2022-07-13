DROP CASCADE TABLE IF EXISTS ingredients;
DROP CASCADE TABLE IF EXISTS materials;
DROP CASCADE TABLE IF EXISTS products;
-- Creation of product table
CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  product_name varchar(150) NOT NULL,
  product_value INT NOT NULL
);

-- Creation of material table
CREATE TABLE IF NOT EXISTS materials (
  material_id SERIAL PRIMARY KEY,
  material_name varchar(150) NOT NULL,
  material_stock_quantity INT NOT NULL
);

-- Creation of ingredient table
CREATE TABLE IF NOT EXISTS ingredients (
  ingredient_id SERIAL PRIMARY KEY,
  ingredient_quantity INT NOT NULL,
  product_id INT NOT NULL,
  material_id INT NOT NULL,
      FOREIGN KEY(product_id) 
	  REFERENCES products(product_id),
      FOREIGN KEY(material_id) 
	  REFERENCES materials(material_id)
);

