// @/database/migrations/20241012_add_presets_table.mjs

export async function up(knex) {
    await knex.schema.createTable('presets', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.float('servings').notNullable();
        table.float('caloriesPerServing').notNullable();
        table.float('gramsProteinPerServing').notNullable();
        table.float('gramsCarbsPerServing').notNullable();
        table.float('gramsFatsPerServing').notNullable();
        table.text('description');
        table.timestamps(true, true);
    });
}
  
export async function down(knex) {
    await knex.schema.dropTable('presets');
}