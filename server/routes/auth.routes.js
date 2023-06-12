const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateUserData } = require('../utils/helpers');
const tokenService = require('../services/token.service');
const router = express.Router({ mergeParams: true });

// 1. get data from request (email, password, etc)
// 2. check if user already exist
// 3. hash password
// 4. create user
// 5. generate tokens

router.post('/signUp', async (req, res) => {
  try {
    const { email, password } = req.body;

    //filter already exist user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: {
          message: 'EMAIL_EXISTS',
          code: 400,
        },
      });
    }

    // hash pasword
    const hashedPassword = await bcrypt.hash(password, 12);

    //create new user
    const newUser = await User.create({
      ...generateUserData(),
      ...req.body,
      password: hashedPassword,
    });

    // generate tokens
    const tokens = tokenService.generate({ _id: newUser._id });
    await tokenService.save(newUser._id, tokens.refreshToken);

    res.status(201).send({ ...tokens, userId: newUser._id });
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
});
router.post('/signInWithPassword', async (req, res) => {});
router.post('/token', async (req, res) => {});

module.exports = router;
