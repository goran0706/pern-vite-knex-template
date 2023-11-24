import authService from '../auth/authService';
import userService from './userService';

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json({ success: true, error: null, data: allUsers });
  } catch (error) {
    next(error);
  }
};

export const userById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ success: false, error: 'Resource not found' });
    }
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const userDTO = req.user;
  res.status(200).json({ success: true, error: null, data: userDTO });
};

export const createUser = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    const salt = await authService.makeSalt();
    const hash = await authService.encryptPassword(password, salt);
    const userDTO = await userService.createUser({ ...rest, password: hash });
    res.status(201).json({ success: true, error: null, data: userDTO });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { password, ...rest } = req.body;
    const salt = await authService.makeSalt();
    const hash = await authService.encryptPassword(password, salt);
    const userDTO = await userService.updateUser(userId, {
      ...rest,
      password: hash,
    });
    res.status(200).json({ success: true, error: null, data: userDTO });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userDTO = await userService.deleteUser(userId);
    res.status(200).json({ success: true, error: null, data: userDTO });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
  getUserById,
  userById,
  createUser,
  updateUser,
  deleteUser,
};
