import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load .env configuration
dotenv.config();
if (!("TOKEN_SECRET" in process.env)) {
  console.error("Secret key for auth token not defined. Ask the lead devevelopers for more info.");
  throw new Error("Missing 'TOKEN_SECRET' parameter in .env")
}

// Creates a JSON Web Token with the secret key and the given user id.
export const createJWT = (userId) => {
  const duration = '24h';
  const token = jwt.sign({userId}, process.env.TOKEN_SECRET, {expiresIn: duration});
  
  return token;
}

// Middleware function that checks a request for a valid auth token.
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenData) => {
      if (err) {
        res.status(401).json({err: "BADTOKEN"});
        return;
      }

      req.token = tokenData;
      next();
    });
  } else {
    res.status(401).json({err: "NOTOKEN"});
  }
}
