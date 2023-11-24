import express from 'express';
import userCtrl from './userController';
import authCtrl from '../auth/authController';

const router = express.Router();

// Param middleware
router.param('userId', userCtrl.userById);

// Users Routes
router
  .route('/api/users') //
  .get(userCtrl.getAllUsers)
  .post(userCtrl.createUser);

router
  .route('/api/users/:userId')
  .get(...authCtrl.requireAuthAndAuthorization, userCtrl.getUserById)
  .put(...authCtrl.requireAuthAndAuthorization, userCtrl.updateUser)
  .delete(...authCtrl.requireAuthAndAuthorization, userCtrl.deleteUser);

export default router;
