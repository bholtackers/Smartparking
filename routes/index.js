var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController');

const {
  catchErrors
} = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', indexController.load);


module.exports = router;
