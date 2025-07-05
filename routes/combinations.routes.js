import express from 'express';
import {
  createCombination,
} from '../controllers/combination.controller.js';

const router = express.Router();

router.post('/', createCombination);

export default router;