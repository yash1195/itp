var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/foo', function(req, res, next) {

  res.send({
    status: 1
  });

});


module.exports = router;
