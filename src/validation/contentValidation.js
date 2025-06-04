/**
 *  Copyright 2024 Shadowcast
 *  Project Name - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */

const Joi = require("joi");
const { sendResponse } = require("../utils/responseHandler");

// Soft delete content validation
exports.softDeleteContentValidation = (req, res, next) => {
    const softDeleteContentSchema = Joi.object({
        contentId: Joi.string().required(),
        category: Joi.string().required()
    });
  
    const validation = softDeleteContentSchema.validate(req.body, { abortEarly: false });
  
    let { error } = validation;
  
    if (error) {
      error.status = 200;
  
      const commonMessage = "Critical issue occur while creating clothing";
      const sets = error.details.map((err) => {
        return { key: err.context.key, message: err.message };
      });
  
      let data = {
        commonMessage: commonMessage,
        sets: sets,
      };
  
      return sendResponse(res, data, 200, null, 1, 2);
    }
    next();
  };