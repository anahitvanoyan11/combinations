import combinationService from '../services/combination.service.js';

export const createCombination = async (req, res) => {
  try {
    if(req.body.length < 1) {
      return res.status(500).json({ success: false, message: 'Combnation length need to be positive number' });
    }

    if (req.body.length > req.body.items.length) {
      return res.status(500).json({ success: false, message: 'Itemns length can not be higher then combinaton length' });
    }

    if(req.body.items.length > 26) {
      return res.status(500).json({ success: false, message: 'Inputed items length can not be higher then 26 it\'s depends in englsih alphabet' });
    }

    const result = await combinationService.createCombination(req.body);
    return res.status(201).json({ success: true, result });
  } catch (err) {
    console.log('err => ', err);

    return res.status(500).json({ success: false, message: err.message });
  }
};