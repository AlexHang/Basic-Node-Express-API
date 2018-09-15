'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');

});

router.get('/:id/:name', function (req, res, next) {
    let x = "Your ID is " + req.params.id + " and your name is " + req.params.name;
    res.send(x);
});

// POST method route
router.post('/', function (req, res) {
    res.send(req.params);
})



module.exports = router;