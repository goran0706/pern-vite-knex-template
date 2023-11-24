import log from '../logger';
import userRepo from './userRepository';
import getUserDTO from './userDTO';

const getAllUsers = async () => {
  try {
    const allUsers = await userRepo.getAllUsers();
    const allUsersDTO = allUsers.map(getUserDTO);
    log.info('All users retrieved:', allUsersDTO);
    return allUsersDTO;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const userById = await userRepo.getUserById(id);
    const userByIdDTO = userById ? getUserDTO(userById) : null;
    log.info('User by ID retrieved:', userByIdDTO);
    return userByIdDTO;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const userByEmail = await userRepo.getUserByEmail(email);
    const userByEmailDTO = userByEmail ? getUserDTO(userByEmail) : null;
    log.info('User by email retrieved:', userByEmailDTO);
    return userByEmail; // returns password hash
  } catch (err) {
    throw err;
  }
};

const createUser = async (user) => {
  try {
    const [createdUser] = await userRepo.createUser(user);
    const createdUserDTO = createdUser ? getUserDTO(createdUser) : null;
    log.info('User created:', createdUserDTO);
    return createdUserDTO;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (id, user) => {
  try {
    const updatedUser = await userRepo.updateUser(id, user);
    const updatedUserDTO = updatedUser ? getUserDTO(updatedUser) : null;
    log.info('User updated:', updatedUserDTO);
    return updatedUserDTO;
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await userRepo.deleteUser(id);
    log.info('User deleted:', deletedUser);
    return deletedUser;
  } catch (err) {
    throw err;
  }
};

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
