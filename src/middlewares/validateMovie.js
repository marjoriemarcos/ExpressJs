const { body, validationResult } = require('express-validator');

const validateMovie = [
    body("title").isLength({ max: 255 }).notEmpty(),
    body("director").isLength({ max: 255 }).notEmpty(),
    body("year").isInt().notEmpty(),
    body("color").isLength({ max: 255 }).notEmpty(),
    body("duration").isInt().notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        res.status(422).json({ validationErrors: errors.array() });
      } else {
        next();
      }
    },
  ];


  module.exports = validateMovie;