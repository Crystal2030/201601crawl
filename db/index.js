/**
 * Created by crystal on 4/21/16.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'crawl'
});

exports.category = function(callback){
    pool.query('select * from category', function(err, rows){
        //console.log(rows);
        callback(err, rows);
    });
};

exports.article = function(callback){
    pool.query('select * from article', function(err, rows){
        //console.log(rows);
        callback(err, rows);
    });
};