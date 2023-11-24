import { expressjwt } from 'express-jwt';
import config from '../../config';
import userService from '../user/userService';
import authService from './authService';
import log from '../logger';

const { jwtSecret, jwtExpiresIn } = config;

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const auth = await authService.authenticate(password, user.password);
    if (!auth) {
      return res
        .status(401)
        .json({ success: false, error: 'Invalid email or password' });
    }

    const token = authService.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res
      .cookie('t', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expire: jwtExpiresIn,
      })
      .status(200)
      .json({
        success: true,
        error: null,
        data: {
          tokenType: 'Bearer',
          accessToken: token,
          expiresIn: jwtExpiresIn,
        },
      });
  } catch (error) {
    log.error('Error during sign-in:', error);
    next(error);
  }
};

const signOut = async (req, res, next) => {
  res.clearCookie('t').status(200).json({
    success: true,
    error: null,
    message: 'Signed out successfully',
  });
};

const requireAuthentication = expressjwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
  requestProperty: 'auth',
});

const requireAuthorization = (req, res, next) => {
  const authId = req.auth?.id?.toString();
  const userId = req.params.userId?.toString();
  const isAdmin = req.auth?.role === 'admin';
  const isAuthorized = authId === userId || isAdmin;

  if (!isAuthorized) {
    return res.status(403).json({
      success: false,
      error: 'User is not authorized',
    });
  }

  next();
};

// Middleware for authentication and authorization (both)
const requireAuthAndAuthorization = [
  requireAuthentication,
  requireAuthorization,
];

export default {
  signIn,
  signOut,
  requireAuthentication,
  requireAuthorization,
  requireAuthAndAuthorization,
};
