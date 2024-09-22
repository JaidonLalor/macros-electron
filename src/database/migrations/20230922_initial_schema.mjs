// @/database/migrations/20230922_initial_schema.mjs

export async function up(knex) {
  await knex.schema.createTable('records', (table) => {
    table.increments('id').primary();
    table.date('date').notNullable();
    table.text('note');
    table.float('water');
  });

  await knex.schema.createTable('foods', (table) => {
    table.increments('id').primary();
    table.integer('record_id').references('id').inTable('records').onDelete('CASCADE');
    table.string('name').notNullable();
    table.float('servings').notNullable();
    table.float('caloriesPerServing').notNullable();
    table.float('gramsProteinPerServing').notNullable();
    table.float('gramsCarbsPerServing').notNullable();
    table.float('gramsFatsPerServing').notNullable();
  });
}

export async function down(knex) {
  await knex.schema.dropTable('foods');
  await knex.schema.dropTable('records');
}