import createHttpError from "http-errors";
import PasswordValidator from "password-validator";
import validator from "validator";

export const validatePassword = (password) => {
  let passwordSchema = new PasswordValidator();

  passwordSchema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces()
    .is().not().oneOf(["Passw0rd", "Password123"]);

  const failedValidations = passwordSchema.validate(password, { details: true });
  if (failedValidations.length > 0) {
    const errorMsg = failedValidations[0].message.replace("The string", "Password");
    throw createHttpError(400, errorMsg);
  }
}

export const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw createHttpError(400, `'${email}' is not an email address`);
  }
}