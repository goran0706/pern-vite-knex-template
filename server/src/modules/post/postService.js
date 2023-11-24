import log from '../logger';
import postRepo from './postRepository';
import { handleServiceError } from '../error';

const getAllUserPosts = async (userId) => {
  try {
    const allPosts = await postRepo.getAllUserPosts(userId);
    log.info(`Retrieved all posts for user with ID ${userId}`);
    return allPosts;
  } catch (err) {
    handleServiceError('retrieving all posts', err);
  }
};

const getUserPostById = async (userId, postId) => {
  try {
    const postById = await postRepo.getUserPostById(userId, postId);
    log.info(`Retrieved post by ID: ${postId} for user with ID ${userId}`);
    return postById;
  } catch (err) {
    handleServiceError('retrieving post by ID', err, postId);
  }
};

const createUserPost = async (post) => {
  try {
    const [createdPost] = await postRepo.createUserPost(post);
    log.info('User created:', createdPost);
    return createdPost;
  } catch (err) {
    handleServiceError('creating post', err);
  }
};

const updateUserPost = async (userId, postId, post) => {
  try {
    const updatedPost = await postRepo.updateUserPost(userId, postId, post);
    log.info(`Updated post with ID ${postId} for user with ID ${userId}`);
    return updatedPost;
  } catch (err) {
    handleServiceError('updating post with ID', err, postId);
  }
};

const deleteUserPost = async (userId, postId) => {
  try {
    const deletedPost = await postRepo.deleteUserPost(userId, postId);
    log.info(`Deleted post with ID ${postId} for user with ID ${userId}`);
    return deletedPost;
  } catch (err) {
    handleServiceError('deleting post with ID', err, postId);
  }
};

export default {
  getAllUserPosts,
  getUserPostById,
  createUserPost,
  updateUserPost,
  deleteUserPost,
};
