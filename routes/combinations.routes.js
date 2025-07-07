import express from 'express';
import {
  createCombination,
} from '../controllers/combination.controller.js';
import { celebrate, Joi, Segments } from 'celebrate';

const router = express.Router();

router.post('/', celebrate({
  [Segments.BODY]: Joi.object({
    length: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Length must be a number',
      'number.integer': 'Length must be a whole number',
      'number.min': 'Length must be at least 1',
      'any.required': 'Length is required'
    }),
  items: Joi.array()
    .items(Joi.number().required())
    .min(1)
    .max(26)
    .required()
    .messages({
      'array.base': 'Items must be an array',
      'array.min': 'At least one item is required',
      'array.max': 'No more than 26 items allowed',
      'any.required': 'Items are required'
    })
  })
}), createCombination);

export default router;