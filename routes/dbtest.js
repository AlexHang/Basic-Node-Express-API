'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('promise-mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'junimea',
})

/* GET users listing. */
router.get('/', function (req, res) {
    //res.send('welcome to about');
    connection
        .then(conn => conn.query('SELECT * FROM users', req.body.id))
        .then(rows => res.send(rows));


});

/* GET users listing. 
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
*/
module.exports = router;