const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
const data_of_users = require('../models/data_of_users');

const logoutRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

logoutRouter.use( bodyParser.json());
//handle get request to server all dishes



logoutRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("logoutRouter.js - 20 User logging out req.params.user_id ->" + req.params.user_id );
    data_of_users.find({'user_id' : req.params.user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("logoutRouter.js - inside data_of_users.find - 23 - temp_id ->" + req.params.user_id );
        console.log("logoutRouter.js - inside data_of_users.find - 24 - data_of_user[0]._id ->" + data_of_user[0]._id );

        //now that we have the _id field, update online to true
        data_of_users.findByIdAndUpdate({ _id: data_of_user[0]._id }
            ,{ online : false }, function(err, result){
            console.log("inside findbyIDandUpdate - logoutRouter 29 :  data_of_user[0] -> " + data_of_user[0] );
            
            if(err){
                res.send(err)
            }
            else{
                res.render('../views/pages/index'); //title: obj.email
            }
            
           
            //res.render('../views/pages/myprofilehome', { the_user_id : temp_id  }); //title: obj.email
            //res.render('menu', { users : users.length }); //title: obj.email
        }, (err) => next(err) )
        .catch( (err) => next(err) );  //data_of_users.findByIdAndUpdate({ _id: data_of_user[0]._id }

    }, (err) => next(err) )
    .catch( (err) => next(err) );  //data_of_users.find({'user_id' : temp_id })  // from posts.js
    
});


module.exports = logoutRouter;