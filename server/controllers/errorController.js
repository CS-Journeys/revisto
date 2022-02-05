import { isHttpError } from 'http-errors';

// Handle errors
const errorController = (err, req, res, next) => {
  if (isHttpError(err)) {
    handleHttpError(err, res);
  }
  else if (isMongooseValidationError(err)) {
    handleMongooseValidationError(err, res);
  }
  else if (isDuplicateKeyError(err)) {
    handleDuplicateKeyError(err, res);
  }
  else if (isUserExistsError(err)) {
    handleUserExistsError(err, res);
  }
  else {
    handleOtherError(err, res);
  }
}

const isMongooseValidationError = (err) => {
  return err.name === 'ValidationError';
}

const isDuplicateKeyError = (err) => {
  return err.code && err.code == 11000
}

const isUserExistsError = (err) => {
  return err.name === "UserExistsError";
} 

const handleMongooseValidationError = (err, res) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join(' ');
    res.status(code).send({err: formattedErrors });
  } else {
    res.status(code).send({err: errors[0] })
  }
}

const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const errorMsg = `An object with that ${field} already exists`;
  res.status(409).send({ err: errorMsg });
}

const handleUserExistsError = (err, res) => {
  const errorMsg = "A user with the given email address is already registered";
  res.status(409).send({ err: errorMsg });
}

const handleHttpError = (err, res) => {
  res.status(err.status).send({ err: err.message });
}

const handleOtherError = (err, res) => {
  res.status(500).send({ err: "Unknown server error" });
}


export default errorController;