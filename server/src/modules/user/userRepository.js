import db from '../../knex/db';

const userTable = () => db('Users');

const getAllUsers = () => {
  return userTable();
};

const getUserById = (userId) => {
  return userTable().where('id', userId).first();
};

const getUserByEmail = (email) => {
  return userTable().where('email', email).first();
};

const createUser = (user) => {
  return userTable().insert(user).returning('*');
};

const updateUser = (userId, user) => {
  return userTable().where('id', userId).update(user);
};

const deleteUser = (userId) => {
  return userTable().where('id', userId).del();
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
