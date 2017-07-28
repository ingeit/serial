var express = require('express');
var router = express.Router();
var serialController = require('./../controllers/serialController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/enviar', serialController.enviar);


module.exports = router;


