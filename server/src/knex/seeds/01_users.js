/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Users').del();
  await knex('Users').insert([
    {
      firstName: 'john',
      lastName: 'doe',
      email: 'john.doe@gmail.com',
      gender: 'm',
      dateOfBirth: '07-06-1990',
      contactNumber: '0123456789',
      role: 'admin',
      password: 'johnny123',
    },
    {
      firstName: 'jane',
      lastName: 'doe',
      email: 'jane.doe@gmail.com',
      gender: 'f',
      dateOfBirth: '07-06-1990',
      contactNumber: '0123456789',
      role: 'admin',
      password: 'jane123',
    },
    {
      firstName: 'john',
      lastName: 'connor',
      email: 'john.connor@gmail.com',
      gender: 'm',
      dateOfBirth: '07-06-1990',
      contactNumber: '0123456789',
      role: 'admin',
      password: 'john123',
    },
  ]);
};
