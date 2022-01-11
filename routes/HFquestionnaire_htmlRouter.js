const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

var router = express.Router();

//const Dishes = require('../models/dishes');
const Heartdatas = require('../models/heartdatas');
const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const HFquestionnaire_htmlRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

HFquestionnaire_htmlRouter.use( bodyParser.json());
console.log("HFquestionnaire_htmlRouter - 15");

HFquestionnaire_htmlRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    //in postman none button selected before send 
    console.log("HFquestionnaire_htmlRouter - 18 req.params.user_id -> " + req.params.user_id );
    Heartdatas.find({})
    .then( (heartdatas) => { //dishes is in mongodb as a collection/database
        Data_of_users.find({'user_id' : req.params.user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            //console.log("HFquestionnaire_htmlRouter 26 displayed data_of_users[0] : ", data_of_user[0]);
            console.log("HFquestionnaire_htmlRouter 27 displayed data_of_users[0]._id : ", data_of_user[0].user_id);
            console.log("HFquestionnaire_htmlRouter 28 displayed data_of_users[0].username : ", data_of_user[0].username);
            res.render('../views/pages/HFquestionnaire_html', { title: heartdatas,
                                                    the_user_id : data_of_user[0].user_id,
                                                    the_username : data_of_user[0].username });
        }, (err) => next(err) )
        .catch( (err) => next(err) );                                         
        //res.statusCode = 200;
        //res.setHeader('Content-Type', 'application/json');  // looking for json string
        /* GET Hello World page. */

        //res.json( dishes);  //return json string in res
        //console.log('dishRouter.js - Query title req.query.fname => ' , req.query.fname);
        //res.redirect('/'); //home
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    //console.log("helloworldRouter.js - get ");
    //res.render('helloworld', { title: 'Hello, World!' });   
});

module.exports = HFquestionnaire_htmlRouter;