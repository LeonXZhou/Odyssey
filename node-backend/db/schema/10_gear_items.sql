DROP TABLE IF EXISTS gear_items CASCADE;
CREATE TABLE gear_items (
  id SERIAL PRIMARY KEY NOT NULL,
  gear_category_id INTEGER REFERENCES gear_categories(id) ON DELETE CASCADE,
  name VARCHAR(255),
  quantity INTEGER
);
