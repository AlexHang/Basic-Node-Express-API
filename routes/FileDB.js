'use strict';
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');     //used for file path
var fs = require('fs-extra');    //File System-needed for renaming file etc
var mysql = require('promise-mysql');

const connection = mysql.createConnection({
                host: 'localhost',
                user: 'admin',
                password: 'admin',
                database: 'junimea',
});

router.get('/', function (req, res) {
    res.send('respond with a resource');
});
router.post('/', function (req, res, next) {
    var form = new formidable.IncomingForm();
    //Formidable uploads to operating systems tmp dir by default
    form.uploadDir = "./img";       //set upload directory
    form.keepExtensions = true;     //keep file extension

    form.parse(req, function (err, fields, files) {
        // res.writeHead(200, { 'content-type': 'text/plain' });
        // res.write('received upload:\n\n');
        console.log("form.bytesReceived");
        //TESTING
        console.log("file size: " + JSON.stringify(files.fileUploaded.size));
        console.log("file path: " + JSON.stringify(files.fileUploaded.path));
        console.log("file name: " + JSON.stringify(files.fileUploaded.name));
        console.log("file type: " + JSON.stringify(files.fileUploaded.type));
        console.log("astModifiedDate: " + JSON.stringify(files.fileUploaded.lastModifiedDate));
        //Formidable changes the name of the uploaded file
        //Rename the file to its original name
        var d = new Date();
        var newfilename =  d.getTime() + Math.floor(Math.random() * 1000) + files.fileUploaded.name;  
        fs.rename(files.fileUploaded.path, './img/' + newfilename, function (err) {
            if (err) {
                throw err;
                res.write("no")
            }
                
            else res.write("yes");

         res.end();
            console.log('renamed complete');

            connection
                .then(conn => conn.query("insert into files (FileName) values('" + JSON.stringify(newfilename) +"');", req.body.id))
                   .then(rows => console.log(rows));
        });
    });
    
  
});
module.exports = router;
