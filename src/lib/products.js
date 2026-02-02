import db from "./db.js";

/**
 * Obtener todos los productos
 */
export function getProducts() {
    return db
        .prepare("SELECT * FROM products")
        .all();
    }

/**
 * Agregar un producto
 */
export function addProduct(product) {
    const stmt = db.prepare(`
        INSERT INTO products (
        code,
        name,
        price_minorista,
        price_50,
        price_100,
        price_bulto,
        rubro
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
        product.code,
        product.name,
        product.price_minorista,
        product.price_50,
        product.price_100,
        product.price_bulto,
        product.rubro
    );
}

/**
 * Eliminar un producto por ID
 */
export function deleteProduct(id) {
    db
        .prepare("DELETE FROM products WHERE id = ?")
        .run(id);
}

/**
 * Actualizar un producto
 */
export function updateProduct(product) {
    const stmt = db.prepare(`
        UPDATE products
        SET
        code = ?,
        name = ?,
        price_minorista = ?,
        price_50 = ?,
        price_100 = ?,
        price_bulto = ?,
        rubro = ?
        WHERE id = ?
    `);

    stmt.run(
        product.code,
        product.name,
        product.price_minorista,
        product.price_50,
        product.price_100,
        product.price_bulto,
        product.rubro,
        product.id
    );
}