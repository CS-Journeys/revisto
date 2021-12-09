import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenData) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.token = tokenData;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

export const createJWT = (userId) => {
  const token = jwt.sign({userId}, process.env.TOKEN_SECRET, {expiresIn: '24h'});
  
  return token;
}
