const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

var router = express.Router();

const Heartdatas = require('../models/heartdatas');
const Data_of_users = require('../models/data_of_users');

const HFhelloworldRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

HFhelloworldRouter.use( bodyParser.json());
HFhelloworldRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    //in postman none button selected before send 
    console.log("HFhelloworldRouter - 18");
    Heartdatas.find({})
    .then( (heartdatas) => { //dishes is in mongodb as a collection/database
        //find user_id and username from data_of_users
        console.log("HFhelloworldRouter - 22 req.params.user_id -> " + req.params.user_id );
        Data_of_users.find({'user_id' : req.params.user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            //console.log("HFquestionnaire_htmlRouter 26 displayed data_of_users[0] : ", data_of_user[0]);
            console.log("HFquestionnaire_htmlRouter 27 displayed data_of_users[0]._id : ", data_of_user[0].user_id);
            console.log("HFquestionnaire_htmlRouter 28 displayed data_of_users[0].username : ", data_of_user[0].username);
            res.render('../views/pages/HFhelloworld', { title: heartdatas ,
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

module.exports = HFhelloworldRouter;