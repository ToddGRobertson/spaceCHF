const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

const Heartdatas = require('../models/heartdatas');

const heartdatadisplayRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

heartdatadisplayRouter.use( bodyParser.json());

heartdatadisplayRouter.route('/:dataId')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('heartdatadisplayRouter.js - Query title req.query => ' , req.query);
    console.log('heartdatadisplayRouter.js - Query title req.query => ' , req.params.dataId);
    Heartdatas.find({})
    .then( (heartdatas) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');  // looking for json string
        res.json( heartdatas);  //return json string in res
        console.log('heartdatadisplayRouter.js - Query title req.query.fname => ' , req.query.fname);
        //res.redirect('/'); //home
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    /*if( req.params.dishId != null){
        res.end('will send details of the dish: ' + req.params.dishId + ' to you!');
    }else{  //if /dishes execute this
        res.end('will send all the dishes to you');
    }*/
    

});

module.exports = heartdatadisplayRouter; // export this dishRouter