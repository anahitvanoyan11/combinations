import express from 'express';
import {
  createCombination,
  getAllCombinations,
} from '../controllers/combination.controller.js';

const router = express.Router();

router.post('/', createCombination);
router.get('/all', getAllCombinations);

export default router;