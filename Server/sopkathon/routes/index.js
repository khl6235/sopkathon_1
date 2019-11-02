var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/categories', require('./category'));
router.use('/articles', require('./articles'));

module.exports = router;