DROP TABLE IF EXISTS days CASCADE;
CREATE TABLE days (
  id SERIAL PRIMARY KEY NOT NULL,
  trip_id INTEGER REFERENCES trips(id),
  date DATE,
  UNIQUE (trip_id, date)
);
