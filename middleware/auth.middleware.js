import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.js";
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]; // Correct split
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId).select('-password'); //doesn't pass password

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - User Not Found' });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid Token', error: error.message });
  }
};

export default authorize;
