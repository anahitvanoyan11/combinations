import combinationService from '../services/combination.service.js';

export const createCombination = async (req, res) => {
  try {
    if (req.body.length > req.body.items.length) {
      return res.status(400).json({ success: false, message: 'Itemns length can not be higher then combinaton length' });
    }

    const result = await combinationService.createCombination(req.body);
    return res.status(201).json({ success: true, result });
  } catch (err) {
    console.log('err => ', err);

    return res.status(500).json({ success: false, message: err.message });
  }
};