const { body, validationResult } = require("express-validator");

const signUPValidationRules = [
  body("fullName")
    .isString()
    .exists()
    .withMessage("Full name is required")
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters long"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("not email"),
  body("city")
    .trim()
    .not()
    .isEmpty()
    .withMessage("city is required")
    .isLength({
      min: 2,
    })
    .withMessage("city name must be at least 2 characters long"),
  body("country").trim().not().isEmpty().withMessage("enter country"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("required password")
    .isLength({ min: 7 })
    .withMessage("password must be > 7 character"),
  body("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage("phone is required")
    .isLength({
      min: 10,
    })
    .withMessage("phone not valid must be minimum 10 digits"),
  body("maritalStatus")
    .trim()
    .not()
    .isEmpty()
    .withMessage("marital Status is required"),
  body("age")
    .trim()
    .not()
    .isEmpty()
    .withMessage("age is required")
    .isNumeric()
    .withMessage("age must be number"),
];

// login validations
const LoginValidationRules = [
  body("email").trim().not().isEmpty().isEmail().withMessage("not valid email"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Enter Your password"),
];
const LoginValidation = (req, res, next) => {
  next();
};

const handleErrorAuth = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(403).json(result);
  next();
};
module.exports = {
  signUPValidationRules,
  handleErrorAuth,
  LoginValidationRules,
  LoginValidation,
};
