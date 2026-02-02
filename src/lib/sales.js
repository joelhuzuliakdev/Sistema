import db from "./db.js";

/**
 * Calcula el total según el método de pago
 */
export function calcularTotal(metodoPago, total) {
    switch (metodoPago) {
        case "debito":
        return total * 1.08;

        case "credito":
        return total * 1.15;

        default:
        return total;
    }
}

/**
 * Registra una venta y sus items
 */
export function registrarVenta(vendedorId, items, metodoPago, rubro) {
    // Total base
    let total = items.reduce(
        (acc, item) => acc + item.precio_unitario * item.cantidad,
        0
    );

    // Aplicar recargo según método de pago
    total = calcularTotal(metodoPago, total);

    // Insertar venta
    const saleStmt = db.prepare(`
        INSERT INTO sales (vendedor_id, total, metodo_pago, rubro)
        VALUES (?, ?, ?, ?)
    `);

    const saleResult = saleStmt.run(
        vendedorId,
        total,
        metodoPago,
        rubro
    );

    // Insertar items de la venta
    const itemStmt = db.prepare(`
        INSERT INTO sale_items (sale_id, product_id, cantidad, precio_unitario)
        VALUES (?, ?, ?, ?)
    `);

    items.forEach((item) => {
        itemStmt.run(
        saleResult.lastInsertRowid,
        item.product_id,
        item.cantidad,
        item.precio_unitario
        );
    });

    return saleResult.lastInsertRowid;
}