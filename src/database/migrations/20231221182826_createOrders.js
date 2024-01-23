exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")

    table.text("image").default(null)
    table.text("title")
    table.integer("price")
    table.text("description");


    table
      .enum("category", ["Refeições Principais", "Aperitivos", "Sobremesas", "Bebidas", "Café da Manhã", "Fast Food", "Saladas"]
      , { useNative: true, enumName: "categorys" }).notNullable()

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});
  
exports.down = knex => knex.schema.dropTable("orders");