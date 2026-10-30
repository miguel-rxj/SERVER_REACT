import Database from 'better-sqlite3'
 
const db = new Database('tienda.db')
db.pragma('foreign_keys = ON')
 
db.exec(`
  CREATE TABLE IF NOT EXISTS productos (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre      TEXT NOT NULL,
    descripcion TEXT,
    precio      REAL NOT NULL CHECK (precio >= 0),
    categoria   TEXT,
    imagen      TEXT,
    stock       INTEGER NOT NULL DEFAULT 0
  );
 
  CREATE TABLE IF NOT EXISTS usuarios (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre        TEXT NOT NULL,
    email         TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    rol           TEXT NOT NULL DEFAULT 'cliente'
  );
 
  CREATE TABLE IF NOT EXISTS pedidos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    total      REAL NOT NULL,
    estado     TEXT NOT NULL DEFAULT 'pendiente',
    creado_en  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
 
  CREATE TABLE IF NOT EXISTS pedido_items (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id       INTEGER NOT NULL REFERENCES pedidos(id),
    producto_id     INTEGER NOT NULL REFERENCES productos(id),
    cantidad        INTEGER NOT NULL,
    precio_unitario REAL NOT NULL
  );
`)
 
export default db
