import getPostDTO from './postDTO';
import postService from './postService';

const getAllUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const allPosts = await postService.getAllUserPosts(userId);
    res.status(200).json({ success: true, error: null, data: allPosts });
  } catch (error) {
    next(error);
  }
};

const postById = async (req, res, next) => {
  try {
    const { userId, postId } = req.params;
    const postById = await postService.getUserPostById(userId, postId);
    if (postById) {
      req.post = postById;
      next();
    } else {
      res.status(404).json({ success: false, error: 'Resource not found' });
    }
  } catch (error) {
    next(error);
  }
};

const getUserPostById = async (req, res, next) => {
  const postById = req.post;
  res.status(200).json({ success: true, error: null, data: postById });
};

const createUserPost = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const post = req.body;
    const postDTO = getPostDTO(userId, post);
    const createdPost = await postService.createUserPost(postDTO);
    res.status(201).json({ success: true, error: null, data: createdPost });
  } catch (error) {
    next(error);
  }
};

const updateUserPost = async (req, res, next) => {
  try {
    const { userId, postId } = req.params;
    const post = req.body;
    const updatedPost = await postService.updateUserPost(userId, postId, post);
    res.status(200).json({ success: true, error: null, data: updatedPost });
  } catch (error) {
    next(error);
  }
};

const deleteUserPost = async (req, res, next) => {
  try {
    const { userId, postId } = req.params;
    const deletedPost = await postService.deleteUserPost(userId, postId);
    res.status(200).json({ success: true, error: null, data: deletedPost });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUserPosts,
  getUserPostById,
  postById,
  createUserPost,
  updateUserPost,
  deleteUserPost,
};
