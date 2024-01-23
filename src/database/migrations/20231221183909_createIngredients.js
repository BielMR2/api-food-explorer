exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users").notNullable()
    table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE").notNullable()

    table.text("name").notNullable();
});
  
exports.down = knex => knex.schema.dropTable("ingredients");