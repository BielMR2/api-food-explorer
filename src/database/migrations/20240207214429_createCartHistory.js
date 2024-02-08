exports.up = knex => knex.schema.createTable("cart", table => {
    table.increments("id");

    table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
});


exports.down = knex => knex.schema.dropTable("cart");
