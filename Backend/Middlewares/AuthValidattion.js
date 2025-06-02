// const Joi = require("joi");

// //for singup validation or middleware
// const signupValidation = (req,res, next) => {
//     const schema = Joi.object({
//         name: Joi.string.min(3).max(100).required(),
//         email: Joi.string.email().required(),
//         password:Joi.string.min(4).max(100).required()
//     });

//     const { error } = schema.validate(req.body);
//     if(error){
//         return res.status(400).json({
//             message:"Bad Request",
//             error: error.details.map((detail) => detail.message),
//         })
//     }
//     next();
// }


// //for login validation or middleware

// const loginValidation = (req,res, next) => {
//     const schema = Joi.object({
//         email: Joi.string.email().required(),
//         password:Joi.string.min(4).max(100).required()
//     });

//     const { error } = schema.validate(req.body);
//     if(error){
//         return res.status(400).json({
//             message:"Bad Request",
//             error: error.details.map((detail) => detail.message),
//         })
//     }
//     next();
// }

// module.exports ={signupValidation , loginValidation};

const Joi = require("joi");

// Signup validation middleware
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      errors: error.details.map((detail) => detail.message),
    });
  }
  next();
};

// Login validation middleware
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      errors: error.details.map((detail) => detail.message),
    });
  }
  next();
};

module.exports = { signupValidation, loginValidation };
