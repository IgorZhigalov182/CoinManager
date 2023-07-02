const express = require('express');
const router = express.Router({ mergeParams: true });
const Operation = require('../models/Operation');
const auth = require('../middleware/auth.middleware');

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Operation.find({ [orderBy]: equalTo });
      res.status(200).send(list);
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже',
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newOperation = await Operation.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newOperation);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже',
      });
    }
  });

router.delete('/:operationId', auth, async (req, res) => {
  try {
    const { operationId } = req.params;
    const removedOperation = await Operation.findById(operationId);

    if (removedOperation.userId.toString() === req.user._id) {
      await removedOperation.deleteOne();
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

router.patch('/:operationId', auth, async (req, res) => {
  try {
    console.log(req.params);
    const { operationId } = req.params;

    const updatedOperation = await Operation.findByIdAndUpdate(operationId, req.body, {
      new: true,
    });
    res.send(updatedOperation);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

module.exports = router;
