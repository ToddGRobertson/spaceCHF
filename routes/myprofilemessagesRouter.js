const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');
const Messages = require('../models/messages');

const myprofilemessagesRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilemessagesRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - 18 inside myprofilecityandstateRouter.js");

myprofilemessagesRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("Todd - myprofilecityandstateRouter 23 req.params.user_id -> " + req.params.user_id);
    console.log("inside myprofilecityandstateRouter 24 myprofilemessagesRouter /");
    if( req.params.user_id != undefined ){  // someone is signed in
        // user_id available - find photo of sender  from data_users.image

        //res.render('myprofilecityandstate'); //title: obj.email        
            //res.redirect('/'); //home
        Data_of_users.find({'user_id' : req.params.user_id })  // from posts.js
        .then( (data_of_user) => {
            console.log("Todd - 32 myprofilemessagesRouter  data_of_user[0] -> " + data_of_user[0]);
            if( data_of_user[0] !== undefined ){
                console.log("Todd - 34 myprofilemessagesRouter data_of_user[0].image -> " + data_of_user[0].image);
                console.log("Todd - 35 myprofilemessagesRouter data_of_user[0].username -> " + data_of_user[0].username);
                // now find the message and display it
                Messages.find({'user_id' : req.params.user_id })  // from posts.js
                .then( (message) => {
                    //console.log("Todd - 39 myprofilemessagesRouter message[0].comments -> " + message[0].comments);
                    if( message[0].comments !== null ){
                        console.log("Todd - 41 myprofilemessagesRouter message[0]._id -> " + message[0]._id);
                        console.log("Todd - 42 myprofilemessagesRouter message[0].user_id -> " + message[0].user_id);
                        console.log("Todd - 43 myprofilemessagesRouter message[0].comments.length -> " + message[0].comments.length );
                        for( x = 0 ; x < message[0].comments.length; x++ ){
                            console.log("Todd - 45 myprofilemessagesRouter message[0].comments[x].sender_id -> " + message[0].comments[x].sender_id);
                            console.log("Todd - 45 myprofilemessagesRouter message[0].comments[x].sender_image -> " + message[0].comments[x].sender_image);
                            console.log("Todd - 46 myprofilemessagesRouter message[0].comments[x].sender_id -> " + message[0].comments[x].sender_id);
                            console.log("Todd - 47 myprofilemessagesRouter message[0].comments[x].date -> " + message[0].comments[x].date);
                            console.log("Todd - 48 myprofilemessagesRouter message[0].comments[x].has_been_read -> " + message[0].comments[x].has_been_read);
                            console.log("Todd - 49 myprofilemessagesRouter message[0].comments[x].subject -> " + message[0].comments[x].subject);
                            console.log("Todd - 50 myprofilemessagesRouter message[0].comments[x].message -> " + message[0].comments[x].message);
                        }
                        var data = [];
                        data.push(message[0]);
                        for( x = 0 ; x < message[0].comments.length; x++ ){

                            
                        }
                        console.log("Todd - 55 myprofilemessagesRouter data[0].comments -> " + data[0].comments);
                        res.render('../views/pages/myprofilemessages', { the_user_id: message[0].user_id, 
                                                                        the_username : data_of_user[0].username,
                                                                        the_messages : message[0] }); //title: obj.email 

                    }else{

                    }                
                    
                }, (err) => next(err) )
                .catch( (err) => next(err) );

            }else{
                //no comments print nothing
                console.log("Todd - 67 myprofilemessagesRouter data_of_user doesn't exist");
            }
            

        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }else{  //someone is just browsing
        console.log("Todd - 81 myprofilemessagesRouter- someone is browsing the site");
        res.render('../views/pages/register_user');

    }
     
    
    
});


myprofilemessagesRouter.route('/:user_id')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilemessagesRouter 32 /:user_id - req.params.user_id " + req.params.user_id);
    console.log("inside myprofilemessagesRouter 33 /:user_id - process.cwd() -> " + process.cwd() );
    const the_user_id = req.params.user_id;
    console.log("inside myprofilemessagesRouter - 35 - the_user_id => " + the_user_id)
    //res.render('../views/pages/myprofilecityandstate', { the_user_id : the_user_id }); //title: obj.email        
        //res.redirect('/'); //home
 
    
});


module.exports = myprofilemessagesRouter;
