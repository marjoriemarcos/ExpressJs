const { body, validationResult } = require('express-validator');

const validateUser = [
  body("email").isEmail().notEmpty(),
  body("firstname").isLength({ max: 255 }).notEmpty(),
  body("lastname").isLength({ max: 255 }).notEmpty(),
  body("city").isLength({ max: 255 }).notEmpty(),
  body("language").isLength({ max: 255 }).notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = validateUser;