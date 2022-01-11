const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');
const Messages = require('../models/messages');

const myprofilemessagedeleteRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilemessagedeleteRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside myprofilemessagedeleteRouter.js");


myprofilemessagedeleteRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilemessagedeleteRouter /:user_id - 24 - req.params.user_id " + req.params.user_id);
    console.log("inside myprofilemessagedeleteRouter /:user_id - 25 - req.params.message_id " + req.params.message_id);
    console.log("inside myprofilemessagedeleteRouter /:user_id - 26 - process.cwd() -> " + process.cwd() );
    const the_user_id = req.params.user_id;
    console.log("inside myprofilemessagedeleteRouter - 28 - the_user_id => " + the_user_id);
    const the_message_id = req.params.message_id;
    console.log("inside myprofilemessagedeleteRouter - 30 - the_message_id => " + the_message_id);
    Messages.find( { user_id : the_user_id })
    .then( (message) => {
        console.log("inside myprofilemessagedeleteRouter - 33 - message[0] => " + message[0]);
        console.log("inside myprofilemessagedeleteRouter - 34 - the_message_id => " + the_message_id);
        console.log("inside myprofilemessagedeleteRouter - 35 - message[0].comments=> " + message[0].comments);
        console.log("inside myprofilemessagedeleteRouter - 36 - message[0].comments.length => " + message[0].comments.length);
        console.log("inside myprofilemessagedeleteRouter - 3 - message[0].comments[0]=> " + message[0].comments[0]);
        for( i = 0; i < message[0].comments.length ; i++) {
            console.log("inside myprofilemessagedeleteRouter - 39 - the_message_id => " + the_message_id);
            console.log("inside myprofilemessagedeleteRouter - 40 - message[0].comments[i]._id => " + message[0].comments[i]._id );
            if( message[0].comments[i]._id == the_message_id){
                console.log("inside myprofilemessagedeleteRouter - 42 - true");
                console.log("inside myprofilemessagedeleteRouter - 43 - message[0].comments[i]._id => " + message[0].comments[i]._id );
                (message[0].comments[i]).remove({ _id : the_message_id }, function (err, result) {
                    message[0].save()
                    .then(( message) => {
                        console.log("inside myprofilemessagedeleteRouter - 52  -message changed");
                        Data_of_users.find({'user_id' : the_user_id })  // from posts.js
                        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
                            console.log("inside myprofilemessagedeleteRouter - 55  the_user_id -> " + the_user_id );
                            console.log("inside myprofilemessagedeleteRouter - 55  data_of_user[0].username -> " + data_of_user[0].username);
                            res.render('../views/pages/myprofilehome', { the_user_id : the_user_id,
                                the_username : data_of_user[0].username  });
                        }, (err) => next(err) )
                        .catch( (err) => next(err) );

                    }, (err ) => next(err));

                }, (err ) => next(err)); // don't need a catch with remove

            }else{
                console.log("inside myprofilemessagedeleteRouter - 70 - false");
            }
        }
    }, (err) => next(err) )
    .catch( (err) => next(err) );

    
        //res.redirect('/'); //home
});


module.exports = myprofilemessagedeleteRouter;
