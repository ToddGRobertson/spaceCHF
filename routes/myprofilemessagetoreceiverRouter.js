const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');
const Messages = require('../models/messages');

const myprofilemessagetoreceiverRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilemessagetoreceiverRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside myprofilemessagetoreceiverRouter.js");


myprofilemessagetoreceiverRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilemessagetoreceiverRouter /:user_id - 24 - req.params.user_id " + req.params.user_id);
    console.log("inside myprofilemessagetoreceiverRouter /:user_id - 25 - req.params.receiver_id " + req.params.their_id);
    //console.log("inside myprofilemessagetoreceiverRouter /:user_id - 26 - process.cwd() -> " + process.cwd() );
    if( req.params.user_id != undefined && req.params.their_id != undefined ){  //someone signed in
        const the_user_id = req.params.user_id;
        console.log("inside myprofilemessagetoreceiverRouter - 28 - the_user_id => " + the_user_id);
        const the_their_id = req.params.their_id;
        console.log("inside myprofilemessagetoreceiverRouter - 30 - the_their_id => " + the_their_id);

        // to get photo of sender, use the_user_id to find the image name of sender
        Data_of_users.find({user_id: the_user_id})
        .then( (data_of_users) => { //dishes is in mongodb as a collection/database
            console.log("inside myprofilemessagetoreceiverRouter - 35- data_of_users[0].image => " + data_of_users[0].image );
            var the_sender_image = data_of_users[0].image;
            console.log("inside myprofilemessagetoreceiverRouter - 35- the_sender_image => " + the_sender_image );
            console.log("inside myprofilemessagetoreceiverRouter - 35- data_of_users[0].username => " + data_of_users[0].username );

            //find _id of messages of receiver to extract receiver_id
            Messages.find({user_id: the_their_id})
            .then( (message) => { //dishes is in mongodb as a collection/database
                console.log('myprofilemessagetoreceiverRouter.js - 44 the_their_id => ' , the_their_id );
                console.log('myprofilemessagetoreceiverRouter.js - 45 message[0] => ' , message[0]);
                console.log('myprofilemessagetoreceiverRouter.js - 46 message[0]._id  =>' , message[0]._id);
                const the_message_id = message[0].user_id

                console.log('myprofilemessagetoreceiverRouter.js - 49 the_message_id  =>' , the_message_id );

                Users.find({'_id' : the_message_id })  // from posts.js
                .then( (users) => { //dishes is in mongodb as a collection/database

                    console.log('myprofilemessagetoreceiverRouter.js - 54 users[0]  =>' , users[0] );
                    console.log('myprofilemessagetoreceiverRouter.js - 55 data_of_users[0].username  =>' , data_of_users[0].username );
                    console.log('myprofilemessagetoreceiverRouter.js - 55 users[0].username  =>' , users[0].username );
                    
                    res.render('../views/pages/myprofilemessagetoreceiver', { the_user_id : the_user_id,
                        message_from : data_of_users[0].username,
                        message_to : users[0].username,
                        receiver_id: the_message_id ,
                        sender_image: the_sender_image,
                        receiver_name : users[0].username }); //title: obj.email
                        
                }, (err) => next(err) )
                .catch( (err) => next(err) ); 

                
                /*
                Messages.findByIdAndUpdate( the_message_id , {
                    $set : req.body 
                }, { new : true })
                .then( (message) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json( message );
                }, (err) => next(err ))
                .catch( (err) => next(err));
                */
            
            }, (err) => next(err) )
            .catch( (err) => next(err) );

        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }else{  //someone is browsing without signing in

        console.log('myprofilemessagetoreceiverRouter.js - 89 can not message when browsing ' );
        res.render('../views/pages/register_user');
    }
    

    
        //res.redirect('/'); //home
});


module.exports = myprofilemessagetoreceiverRouter;
