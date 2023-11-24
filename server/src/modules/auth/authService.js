import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const { jwtSecret, jwtExpiresIn } = config;

export const makeSalt = (saltRounds = 10) => {
  return bcrypt.genSalt(saltRounds);
};

export const encryptPassword = (plainText = '', salt) => {
  return bcrypt.hash(plainText, salt);
};

export const authenticate = (plainText = '', hash) => {
  return bcrypt.compare(plainText, hash);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

export default {
  makeSalt,
  encryptPassword,
  authenticate,
  generateToken,
  verifyToken,
};
