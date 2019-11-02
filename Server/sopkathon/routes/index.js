var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/characters', require('./characters'));
router.use('/articles', require('./articles'));

module.exports = router;
