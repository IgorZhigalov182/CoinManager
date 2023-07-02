const express = require('express');
const router = express.Router({ mergeParams: true });
const BankAccount = require('../models/BankAccount');
const auth = require('../middleware/auth.middleware');

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await BankAccount.find({ [orderBy]: equalTo });
      res.status(200).send(list);
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже',
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newBankAccount = await BankAccount.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newBankAccount);
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже',
      });
    }
  });

router.delete('/:bankAccountId', auth, async (req, res) => {
  try {
    const { bankAccountId } = req.params;
    const removedBankAccount = await BankAccount.findById(bankAccountId);

    if (removedBankAccount.userId.toString() === req.user._id) {
      await removedBankAccount.deleteOne();
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

router.patch('/:bankAccountId', auth, async (req, res) => {
  try {
    const { bankAccountId } = req.params;

    const updatedBankAccount = await BankAccount.findByIdAndUpdate(bankAccountId, req.body, {
      new: true,
    });
    res.send(updatedBankAccount);
  } catch (error) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});

module.exports = router;
