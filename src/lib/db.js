import Database from "better-sqlite3";

// Crear / conectar a la base de datos
const db = new Database("ventas.db");

// Crear tablas si no existen
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK(role IN ('admin', 'vendedor')) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT,
        name TEXT NOT NULL,
        price_minorista REAL,
        price_50 REAL,
        price_100 REAL,
        price_bulto REAL,
        rubro TEXT CHECK(rubro IN ('descartable', 'caramelos', 'libreria'))
    );

    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vendedor_id INTEGER,
        total REAL,
        metodo_pago TEXT,
        rubro TEXT,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sale_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sale_id INTEGER,
        product_id INTEGER,
        cantidad INTEGER,
        precio_unitario REAL
    );

    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        telefono TEXT,
        deuda REAL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS cierres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rubro TEXT,
        total REAL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);

export default db;