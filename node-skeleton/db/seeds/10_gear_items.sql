-- DROP TABLE IF EXISTS gear_items CASCADE;
-- CREATE TABLE gear_items (
--   id SERIAL PRIMARY KEY NOT NULL,
--   gear_category_id INTEGER REFERENCES gear_categories(id),
--   name VARCHAR(255)
-- );
INSERT INTO gear_items (name,gear_category_id) VALUES ('boots',1);
INSERT INTO gear_items (name,gear_category_id) VALUES ('climbing gear',1);
INSERT INTO gear_items (name,gear_category_id) VALUES ('gloves',1);