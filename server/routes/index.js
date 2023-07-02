const express = require('express');
const router = express.Router({ mergeParams: true });

router.use('/auth', require('./auth.routes'));
router.use('/category', require('./category.routes'));
router.use('/user', require('./user.routes'));
router.use('/bankAccount', require('./bankAccount.routes'));

module.exports = router;
