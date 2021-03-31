import jwt from 'jsonwebtoken';

import db from '../models/index.js';

const authenticate = ({ req }) => {
  try {
    const header = req.headers.authorization;
    if (!header) throw new Error('No token provided');

    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp < new Date().getTime() / 1000) {
      throw new Error('Token expired');
    }

    return {
      user: {
        id: decoded.id,
      },
      db,
    };
  } catch (e) {
    return {
      user: null,
      db,
    };
  }
};

export default authenticate;
