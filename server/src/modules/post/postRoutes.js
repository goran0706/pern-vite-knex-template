import express from 'express';
import postCtrl from './postController';
import authCtrl from '../auth/authController';

const router = express.Router();

router.use('/:userId/posts', authCtrl.requireAuthAndAuthorization);
router.use('/:userId/posts/:postId', authCtrl.requireAuthAndAuthorization);

router.param('postId', postCtrl.postById);

router
  .route('/api/users/:userId/posts')
  .get(postCtrl.getAllUserPosts)
  .post(postCtrl.createUserPost);

router
  .route('/api/users/:userId/posts/:postId')
  .get(postCtrl.getUserPostById)
  .put(postCtrl.updateUserPost)
  .delete(postCtrl.deleteUserPost);

export default router;
