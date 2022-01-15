import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Load .env configuration
dotenv.config();
if (!("TOKEN_SECRET" in process.env)) {
  console.error("Secret key for auth token not defined. Ask the lead devevelopers for more info.");
  throw new Error("Missing 'TOKEN_SECRET' parameter in .env")
}

// Creates a JSON Web Token with the secret key and given data.
export const createJWT = (data) => {
  const duration = '24h';
  const token = jwt.sign(data, process.env.TOKEN_SECRET, {expiresIn: duration});
  
  return token;
}

// Pass in a jwt, it returns a promise that resolves to the data in the token.
export const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenData) => {
      if (err) {
        reject(err);
      } else {
        resolve(tokenData);
      }
    });
  });
}

// Middleware function that checks a request for a valid auth token
// and extracts the token's data.
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenData) => {
      if (!err) {
        req.token = tokenData;
      }
    });
  }

  next();
}
