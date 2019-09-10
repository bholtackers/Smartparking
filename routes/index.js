const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

const {
  catchErrors
} = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', catchErrors(indexController.load));


module.exports = router;
