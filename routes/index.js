const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

const {
  catchErrors
} = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', catchErrors(indexController.dashboard));
router.get('/dashboard', catchErrors(indexController.dashboard));
router.get('/history', catchErrors(indexController.history));
router.get('/admin', catchErrors(indexController.admin));

router.post('/updateParkingspots', 
  catchErrors(indexController.updateNumberplates),
  );


module.exports = router;
