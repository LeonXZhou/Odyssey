DROP TABLE IF EXISTS gear_categories CASCADE;
CREATE TABLE gear_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  trip_id INTEGER REFERENCES trips(id),
  name VARCHAR(255)
);
