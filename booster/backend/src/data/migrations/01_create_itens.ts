import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('itens', table => {
        table.increments('id').primary(),
        table.string('title').notNullable(),
        table.string('image').notNullable()
    });
};

export async function down(knex: Knex) {
    return knex.schema.dropTable('itens');
};