const userSchema = (table) => {
  table.increments('id').primary().unique();
  table.string('firstName').notNullable();
  table.string('lastName').notNullable();
  table.string('email').unique().notNullable();
  table.string('gender').notNullable();
  table.date('dateOfBirth').notNullable();
  table.string('contactNumber');
  table.string('role').notNullable().defaultTo('guest');
  table.string('password').notNullable();
  table.timestamps(true, true);
};

module.exports = userSchema;
