import db from '../../knex/db';

const postTable = () => db('Posts');

const getAllUserPosts = (userId) => {
  return postTable().where('userId', userId);
};

const getUserPostById = (userId, postId) => {
  return postTable().where('id', postId).andWhere('userId', userId).first();
};

const createUserPost = (post) => {
  return postTable().insert(post).returning('*');
};

const updateUserPost = (userId, postId, post) => {
  return postTable()
    .where('id', postId)
    .andWhere('userId', userId)
    .update(post);
};

const deleteUserPost = (userId, postId) => {
  return postTable().where('id', postId).andWhere('userId', userId).del();
};

export default {
  getAllUserPosts,
  getUserPostById,
  createUserPost,
  updateUserPost,
  deleteUserPost,
};
