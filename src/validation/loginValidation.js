const Joi = require("joi");

const { sendResponse } = require("../utils/responseHandler");

exports.signupValidation = (req, res, next) => {
  const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().lowercase().required(),
  });

  const validation = signUpSchema.validate(req.body, { abortEarly: false });
  if (validation.value) {
    req.body.email = validation.value.email;
  }
  let { error } = validation;

  if (error) {
    error.status = 200;

    const commonMessage = "Critical issue occur while updating user";
    const sets = error.details.map((err) => {
      return { key: err.context.key, message: err.message };
    });
    let data = {
      commonMessage: commonMessage,
      sets: sets,
    };

    // console.log(error.details)
    return sendResponse(res, data, 200, null, 125, 2);
  }
  next();
};

exports.loginValidation = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
  });
  const validation = loginSchema.validate(req.body, { abortEarly: false });

  if (validation.value) {
    req.body.email = validation.value.email;
  }
  let { error } = validation;

  if (error) {
    error.status = 200;

    const commonMessage = "Critical issue occur while updating user";
    const sets = error.details.map((err) => {
      return { key: err.context.key, message: err.message };
    });
    let data = {
      commonMessage: commonMessage,
      sets: sets,
    };

    // console.log(error.details)
    return sendResponse(res, data, 200, null, 125, 2);
  }
  next();
};

exports.resetPasswordValidation = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    hash:Joi.string().required()
  });
  const validation = loginSchema.validate(req.body, { abortEarly: false });

  if (validation.value) {
    req.body.email = validation.value.email;
  }
  let { error } = validation;

  if (error) {
    error.status = 200;

    const commonMessage = "Critical issue occur while updating user";
    const sets = error.details.map((err) => {
      return { key: err.context.key, message: err.message };
    });
    let data = {
      commonMessage: commonMessage,
      sets: sets,
    };

    // console.log(error.details)
    return sendResponse(res, data, 200, null, 125, 2);
  }
  next();
};
exports.emailValidation = (req, res, next) => {
  const addUserSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
  });
  const validation = addUserSchema.validate(req.body, { abortEarly: false });
  if (validation.value) {
    req.body.email = validation.value.email;
  }
  let { error } = validation;

  if (error) {
    error.status = 200;

    const commonMessage = "Critical issue occur while updating user";
    const sets = error.details.map((err) => {
      return { key: err.context.key, message: err.message };
    });
    let data = {
      commonMessage: commonMessage,
      sets: sets,
    };

    // console.log(error.details)
    return sendResponse(res, data, 200, null, 125, 2);
  }
  next();
};

exports.verifyOtpValidation = (req, res, next) => {
  const addUserSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    otp: Joi.string().min(6).required(),
  });
  const validation = addUserSchema.validate(req.body, { abortEarly: false });
  if (validation.value) {
    req.body.email = validation.value.email;
  }
  let { error } = validation;

  if (error) {
    error.status = 200;

    const commonMessage = "Critical issue occur while updating user";
    const sets = error.details.map((err) => {
      return { key: err.context.key, message: err.message };
    });
    let data = {
      commonMessage: commonMessage,
      sets: sets,
    };

    // console.log(error.details)
    return sendResponse(res, data, 200, null, 125, 2);
  }
  next();
};

exports.passwordValidation = (req, res, next) => {
  const loginSchema = Joi.object({
    currentPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
  });
  const validation = loginSchema.validate(req.body, { abortEarly: false });
  if (validation.value) {
    req.body.currentPassword = validation.value.currentPassword;
    req.body.newPassword = validation.value.newPassword;
    req.body.confirmPassword = validation.value.confirmPassword;
  }
  let { error } = validation;

  if (error) {
    error.status = 200;

    const commonMessage = "Critical issue occur while updating user";
    const sets = error.details.map((err) => {
      return { key: err.context.key, message: err.message };
    });
    let data = {
      commonMessage: commonMessage,
      sets: sets,
    };

    return sendResponse(res, data, 200, null, 125, 2);
  }
  next();
};

exports.verifyTwoFactorOtpValidation = (req, res, next) => {
  const verifyUserSchema = Joi.object({
    sessionId: Joi.string().required(),
    otp: Joi.string().min(6).required(),
    adminId: Joi.string().required()
  });
  const validation = verifyUserSchema.validate(req.body, { abortEarly: false });
  if (validation.value) {
    req.body.email = validation.value.email;
  }
  let { error } = validation;

  if (error) {
    error.status = 200;

    const commonMessage = "Critical issue occur while updating user";
    const sets = error.details.map((err) => {
      return { key: err.context.key, message: err.message };
    });
    let data = {
      commonMessage: commonMessage,
      sets: sets,
    };

    // console.log(error.details)
    return sendResponse(res, data, 200, null, 125, 2);
  }
  next();
};
