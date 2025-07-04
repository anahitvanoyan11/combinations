import combinationService from '../services/combination.service.js';

export const createCombination = (req, res) => {
  try {
    const result = combinationService.createCombination(req.body);
    return res.status(201).json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllCombinations = (req, res) => {
  try {
    const result = combinationService.getAllCombinations();
    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};