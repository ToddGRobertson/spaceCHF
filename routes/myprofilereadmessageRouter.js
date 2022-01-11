const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const myprofilereadmessageRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilereadmessageRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - 16 inside myprofilereadmessageRouter.js");
myprofilereadmessageRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("19 inside myprofilereadmessageRouter /");
    console.log("20 inside myprofilereadmessageRouter req.body -> " + JSON.stringify( req.body ));
    console.log("21 inside myprofilereadmessageRouter req.query -> " + JSON.stringify( req.query ));
    const the_user_id = req.query.user_id;
    const the_date = req.query.date;
    const the_subject = req.query.subject;
    const the_message = req.query.message;
    const the_message_id = req.query.message_id;

    Data_of_users.find({ 'user_id' : the_user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("28 inside myprofilereadmessageRouter data_of_user[0].username -> " + data_of_user[0].username );
        console.log("28 inside myprofilereadmessageRouter the_message_id -> " + the_message_id );
        res.render('../views/pages/myprofilereadmessage', { the_user_id : the_user_id ,
            the_image : data_of_user[0].image,
            the_username : data_of_user[0].username,
            the_date : the_date ,
            the_subject : the_subject,
            the_message : the_message ,
            the_message_id : the_message_id }); //title: obj.email 
    }, (err) => next(err) )
    .catch( (err) => next(err) );

           
        //res.redirect('/'); //home
 

    
    
});

myprofilereadmessageRouter.route('/:user_id')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilereadmessageRouter /:user_id - 32 req.params.user_id " + req.params.user_id);
    console.log("inside myprofilereadmessageRouter /:user_id - 33 process.cwd() -> " + process.cwd() );
    const the_user_id = req.params.user_id;
    console.log("inside myprofilereadmessageRouter - 35 - the_user_id => " + the_user_id)
    Data_of_users.find({ 'user_id' : the_user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("myprofilereadmessageRouter 38 displayed data_of_users[0] : ", data_of_user[0]);
        console.log("myprofilereadmessageRouter 39 displayed data_of_users[0]._id : ", data_of_user[0]._id);
        console.log("myprofilereadmessageRouter 40 displayed data_of_users[0].username : ", data_of_user[0].username);

        user_id_answer = data_of_user[0]._id;
        console.log("displayed 42  user_id_answer :  ", user_id_answer);
        res.render('../views/pages/myprofilereadmessage', { the_user_id : the_user_id,
                                                             the_username : data_of_user[0].username  }); //title: obj.email  
    }, (err) => next(err) )
    .catch( (err) => next(err) );
});

module.exports = myprofilereadmessageRouter;
