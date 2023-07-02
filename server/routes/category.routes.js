const express = require('express');
const router = express.Router({ mergeParams: true });
const Category = require('../models/Category');
const auth = require('../middleware/auth.middleware');

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Category.find({ [orderBy]: equalTo });
      res.status(200).send(list);
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже',
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newCategory = await Category.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newCategory);
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже',
      });
    }
  });

router.delete('/:categoryId', auth, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const removedCategory = await Category.findById(categoryId);

    if (removedCategory.userId.toString() === req.user._id) {
      await removedCategory.deleteOne();
      return res.send(null);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

router.patch('/:categoryId', auth, async (req, res) => {
  try {
    console.log(req.params);
    const { categoryId } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {
      new: true,
    });
    res.send(updatedCategory);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

module.exports = router;
