const postSchema = (table) => {
  table.increments('id').primary();
  table.string('title').notNullable();
  table.string('content').notNullable();
  table.string('image').notNullable();
  table
    .integer('userId')
    .unsigned()
    .references('id')
    .inTable('Users')
    .onDelete('CASCADE');
  table.timestamps(true, true);
};

module.exports = postSchema;
