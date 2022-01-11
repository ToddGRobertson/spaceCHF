const express = require('express');
const bodyParser = require('body-parser');

//npm install mongoose@5.1.7
//npm install mongoose-currency@0.2.0
//npm install process - navigate working directory at bottom
//npm install path  - navigate directory and list files
//npm install fs    files list
const mongoose = require('mongoose');
// Include process module
const process = require('process');

//requiring path and fs modules
const path = require('path');
const fs = require('fs');

//const Heartdataposts = require('../models/heartdataposts');
const User = require('../models/user');
const Data_of_users = require('../models/data_of_users');
const Messages = require('../models/messages');

const registerRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

registerRouter.use( bodyParser.json());
//handle get request to server all dishes
matching_email_address = false;
matching_username = false;
console.log("inside 28 registerRouter");
registerRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    User.find({})
    .then( (user) => { //dishes is in mongodb as a collection/database
        console.log('registerRouter.js - /:get 33 Query title users[0] -> ' + user[0] );
        console.log('registerRouter.js - /:get 34 Query title users.length -> ' + user.length );
        if( user.length > 0){
            for( i = 0; i < user.length ; i++){
                var temp = req.query;
                console.log('registerRouter.js - /:get 38 found entry temp -> ' + JSON.stringify( temp) );
                console.log('registerRouter.js - /:get 39 found entry temp.username -> ' + temp.username );
                console.log('registerRouter.js - /:get 40 found entry temp.email -> ' + temp.email );
                console.log('registerRouter.js - /:get 41 found entry users[' + i + '].email -> ' + user[i].email );
                console.log('registerRouter.js - /:get 42 users.length -> ' + user.length );
                console.log('registerRouter.js - /:get 43 matching_email_address -> ' + matching_email_address );
                //check for duplicate email against users database
                if( temp.email === user[i].email){
                    console.log('registerRouter.js - /:get 46 found entry i -> ' + i );
                    matching_email_address = true;
                    console.log('registerRouter.js - /:get 48 found entry matching_email_address -> ' + matching_email_address );
                    // found matching email address send a message
                    //res.send('<script>alert("Email address is already in database.  ")</script>') ;
                    console.log("registerRouter.js - 51 ");
                    res.render('../views/pages/register_user_email_already_in_database');
                }else{
                    //-------------------------------------------------------------------------------------
                    //check for duplicate username against database
                    if( temp.username === user[i].username){
                        console.log('registerRouter.js - /:get 57 found entry i -> ' + i );
                        matching_username = true;
                        console.log('registerRouter.js - /:get 59 found entry matching_username -> ' + matching_username );
                        // found matching matching_username send a message
                        res.render('../views/pages/register_user_name_was_already_in_database');
                        //res.send('<script>alert("Username is already in database.  ")</script>') ;
                    }else{
                        //reached last entry
                        if( i == (user.length - 1)){
                            console.log('registerRouter.js - /:get 66 reached last entry -> ' + i );
                            console.log('registerRouter.js - /:get 67 reached users.length -> ' + user.length );
                            //in postman none button selected before send
                            console.log('registerRouter.js - /:get 69 Query title req.query=> ' , req.query);
                            //console.log('registerRouter.js - /:get 17 Query title req.body=> ' , JSON.stringify( req.body ));
                            let temp = req.query;
                            console.log('registerRouter.js - /:get 72 Query title temp => ' , JSON.stringify( temp ));
                            console.log('registerRouter.js - /:get 73 Query title temp.username => ' , temp.username );
                            console.log('registerRouter.js - /:get 74 Query title temp.email => ' , temp.email );
                            console.log('registerRouter.js - /:get 75 Query title temp.password => ' , temp.the_password );
                            console.log('registerRouter.js - /:get 76 matching_email_address -> ' + matching_email_address );
                            //check that username email and password aren't blank
                            if( temp.username == '' && temp.email == '' && temp.the_password == ''){  //is empty
    
                                console.log('registerRouter.js - req.query  80 IS empty=> ');
                                res.render('../views/pages/register_user_all_selections_are_blank');
                                //res.send('<script>alert("all selections are blank.  Please fill in the boxes")</script>') ;
                                //alert("Hello! I am an alert box!");
                                
                                /*Heartdatas.find({})
                                .then( (heartdatas) => {
                                    res.statusCode = 200;
                                    res.set('Content-Type', 'text/html');
                                    //res.setHeader('Content-Type', 'text/plain');
                                    //res.setHeader('Content-Type', 'application/json');  // looking for json string
                                    res.render( heartdatas );
                                    //res.json( heartdatas);  //return json string in res
                                    console.log('heartdataRouter.js - Query title req.query.fname => ' , req.query.fname);
                                    res.redirect('/'); //home
                                }, (err) => next(err) )
                                .catch( (err) => next(err) );
                                */
                            }else if( temp.the_password == ''){ 
                                res.render('../views/pages/register_user_password_was_blank');
                                //res.send('<script>alert("Password is blank.  Please fill in the password box")</script>') ;
                            }else if( temp.email == ''){ 
                                res.render('../views/pages/register_user_email_is_blank');
                                //res.send('<script>alert("Email is blank.  Please fill in the email box")</script>') ;
                            }else if( temp.username == ''){ 
                                res.render('../views/pages/register_user_name_is_blank');
                                //res.send('<script>alert("Username is blank.  Please fill in the username box")</script>') ;
                            }else{ //is emptyelse{
                                console.log('registerRouter.js - /:getv 108 users.length -> ' + user.length );
                                console.log('registerRouter.js - /:getv 109 req.query -> ' + JSON.stringify( req.query) );
                                console.log('registerRouter.js - get - not null - 110 req.query  not null=> ');
                                //Heartdatas.create
                                console.log('registerRouter.js - get - not null - 112 matching_email_address => ' + matching_email_address);
                                console.log('registerRouter.js - get - not null - 113 matching_username => ' + matching_username);
                                //at this point if a matching email or username aren't found , create an entry
                                if( matching_email_address == false && matching_username == false ){
                                    User.create( req.query )  //req.body //Heartdatas
                                    .then( (user) => {
                                        console.log("registerRouter.js - 118 user created " + user[0]);
                                        console.log('registerRouter.js - 119 Users -> ' + JSON.stringify(User) );
                                        console.log('registerRouter.js - 120 Users.length -> ' + User.length );
                                        //res.setHeader('Content-Type', 'text/plain');
                                        //res.setHeader('Content-Type', 'application/json');  // looking for json string
                                        
                                        //-------------------------------------------------
                                        //send email
                                        //outgoing email server
                                        var nodemailer = require('nodemailer');

                                        let transporter = nodemailer.createTransport({
                                        host : 'nw68.fcomet.com', //mail.savemysquashplantsfromborers.com',
                                        port : 465, //2525,465
                                        secure : true,
                                        auth: {  //
                                            user: 'fc@savemysquashplantsfromborers.com', //_mainaccount@savemysquashplantsfromborers.com',
                                            pass: '9i9ShWm7c6'
                                        },
                                        tls:{
                                            rejectUnauthorized : false //
                                        }
                                        });
                                        console.log('registerRouter.js - /:get 141 Query title req.query=> ' , req.query);
                                        //console.log('registerRouter.js - /:get 17 Query title req.body=> ' , JSON.stringify( req.body ));
                                        let temp = req.query;

                                        console.log('registerRouter.js /:commentId 145 temp.email->' + temp.email );
                                        console.log('registerRouter.js /:commentId 146 temp.username->' + temp.username );
                                        var email_address = 'trobert612t@netscape.net';
                                        //send me a message
                                        let mailOptions = {
                                            from : 'spacechf', //sender address
                                            to : `${email_address}`,//'trobert612t@netscape.net', //list of recipients
                                            subject : 'from spaceCHF - new spaceCHF member ->' + temp.username  + ' email ' + temp.email,  //subject line `${req.body.email}`
                                            text : 'new spaceChf member' ,//'Hello World', //subject body
                                            html: `${temp.email }` //'<b>Hello World </b>?'
                                        };
                                        console.log("registerRouter.js - 156 - after mail options");

                                        transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            return console.log(error);
                                        }
                                        console.log("registerRouter.js - 162 - sent email");
                                        }); 
                                        //------------------------------------------------------------------
                                        console.log("registerRouter.js - 165 - before render");
                                       // console.log("registerRouter.js - 114 - users ->" + Users );
                                        console.log("registerRouter.js - 167 - user2.length -> " + User.length );
                                        //-----------------------------------------------------------------
                                        //need to get the _id of the person that registered to use
                                        // as a foreign key for data_for_users table and messages table
                                        User.find({'email' : temp.email }) 
                                        .then( (user) => {
                                            console.log("registerRouter.js - 167 - user[0]._id -> " + user[0]._id );
                                            console.log("registerRouter.js - 168 - req.query.username -> " + req.query.username );
                                            // now that we have user._id we need to create data_of_users with foreign key user._id
                                            //begin to make data_of_user entry
                                            const data_of_user_JSON = '{ "user_id":'  + '"' + user[0]._id   + '"' + 
                                            ', "username":'  + '"' + req.query.username + '"' + 
                                            ', "image": '   + '"' + "noPhoto-2q.jpg" + '"' +
                                            ', "city": ' + '"' + "use myprofile" + '"' +
                                            ', "state": '   + '"' + "use myprofile" + '"' +
                                            ', "brief_description": ' +  '"' + '"' +
                                            ', "patient_or_caregiver": '   + '"' + "use myprofile" + '"' + 
                                            ', "illness": ' +  '"' + "use myprofile" + '"' +
                                            ', "detailed_description": ' + '"' + '"' + 
                                            ', "online": ' +  false + '}';
    
                                            console.log('registerRouter.js - 182 data_of_user_JSON -> ' + data_of_user_JSON );
                                            const obj = JSON.parse(data_of_user_JSON);
                            
                                            console.log("186 obj.user._id -> " + obj.user_id);

                                            console.log("187 obj.city -> " + obj.city);

                                            Data_of_users.create( obj )  //req.body //Heartdatas
                                            .then( (data_of_user) => {
                                                console.log("registerRouter.js - 191  ");
                                                console.log("registerRouter.js - 192  data_of_user created => " + data_of_user);
                                                console.log("registerRouter.js - 193  data_of_users._id created => " + data_of_user._id);
                                                console.log("registerRouter.js - 194  data_of_user created  obj.user_id => " + obj.user_id);

                                                //now , using data_of_user.user_id as a foreign key, build messages table
                                                const message_JSON = '{ "user_id":'        + '"' + obj.user_id   + '"' +  
                                                                     ', "username":'  + '"' + req.query.username + '"' + 
                                                                     ', "comments":[' + '] }';
                                                                     /*
                                                                     '  "date":'   + '"' + '"' +
                                                                     '  "has_been_read":' + '"' + false + '"' +
                                                                     '  "sender_email":' + '"' + '"' +
                                                                     '  "subject":' + '"' + '"' +    
                                                                     '  "message":' + '"' + '"' + 
                                                                     */
                                                console.log('registerRouter.js - 206 message_JSON -> ' + message_JSON );
                                                const message_obj = JSON.parse(message_JSON);
                                                console.log("registerRouter.js - 208 message_obj ->" + message_obj );
                                                Messages.create( message_obj )  //req.body //Heartdatas
                                                .then( (message) => {
                                                    console.log("registerRouter.js - 211  message[0] ->" + message[0]);
                                                    console.log("registerRouter.js - 212  message created => " + message );
                                                    console.log("registerRouter.js - 213  message._id => " + message._id );
                                                    console.log("registerRouter.js - 214  message.user_id => " + message.user_id );

                                                    var temp_user_id = message.user_id;
                                                    console.log("registerRouter.js - 217  last step before login displayed - temp_user_id => " + temp_user_id );
                                                    //have to spell out the path due to current directory
                                                    //res.render('../views/pages/home', { the_user_id : temp_user_id});
                                                    res.render('../views/pages/login_no_user_id');  // render the index page

                                                }, (err) => next(err) )
                                                .catch( (err) => next(err) );

                                            }, (err) => next(err) )  
                                            .catch( (err) => next(err) );  //Data_of_users.create( obj )  //req.body //Heartdatas
                                            
                                        }, (err) => next(err) )
                                        .catch( (err) => next(err) ); //User.find({'email' : temp.email }) 
                                    });
                                } //if( matching_email_address == false && matching_username == false ){
                            } //if( temp.username == '' && temp.email == '' && temp.the_password == ''){  //is empty
                        }  //if( i == (users.length - 1)){
                        // found a matching email address, so no need to register, just login
                        
                    }  //if( temp.username === users[i].username){
    
                }  //if( temp.email === users[i].email){
            }  //for( i = 0; i < users.length ; i++){
        } //if( users.length > 0){
        if( user.length == 0){
            //create 1st entry
            console.log("Todd - 245 - req.query -> " + JSON.stringify( req.query) );
            if( req.query.the_password == ""){ 
                console.log("Todd - 247 - req.query -> " + JSON.stringify( req.query) );
                res.render('../views/pages/register_user_password_was_blank');
                //res.send('<script>alert("Password is blank.  Please fill in the password box")</script>') ;
            }else if( req.query.username == ""){ 
                res.render('../views/pages/register_user_name_is_blank');
                //res.send('<script>alert("Username is blank.  Please fill in the username box")</script>') ;
            }else if( req.query.email == ""){ 
                res.render('../views/pages/register_user_email_is_blank');
                //res.send('<script>alert("Email is blank.  Please fill in the email box")</script>') ;
            }else{
                User.create( req.query )  //req.body //Heartdatas
                .then( (user) => {
                    console.log("registerRouter.js - 258 user created");
                    console.log('registerRouter.js - 259 user -> ' + user);
                    console.log('registerRouter.js - 261 user._id -> ' + user._id);
                    console.log('registerRouter.js - 262 user.username -> ' + user.username);
                    console.log('registerRouter.js - 263 User.length -> ' + User.length );

                    // now that we have user._id we need to create data_of_users with foreign key user._id
                    const data_of_user_JSON = '{ "user_id":'  + '"' + user._id   + '"' + 
                    ', "username":'  + '"' + user.username + '"' + 
                    ', "image": '   + '"' + "noPhoto-2q.jpg" + '"' +
                    ', "city": ' + '"' + "use myprofile" + '"' +
                    ', "state": '   + '"' + "use myprofile" + '"' +
                    ', "brief_description": ' +  '"' + '"' +
                    ', "patient_or_caregiver": '   + '"' + "use myprofile" + '"' + 
                    ', "illness": ' +  '"' + "use myprofile" + '"' +
                    ', "detailed_description": ' + '"' + '"' + '}';

                                            
                                            
                    console.log('registerRouter.js - 278 data_of_user_JSON -> ' + data_of_user_JSON );
                    const obj = JSON.parse(data_of_user_JSON);
    
                    console.log("obj.user._id -> " + obj.user_id);

                    console.log("obj.city -> " + obj.city);

                    Data_of_users.create( obj )  //req.body //Heartdatas
                    .then( (data_of_user) => {
                        console.log("registerRouter.js - 287  ");
                        console.log("registerRouter.js - 288  Data_of_users created => " + data_of_user);
                        console.log("registerRouter.js - 289  Data_of_users[0] created => " + data_of_user[0]);
                        console.log("registerRouter.js - 290  Data_of_users created  obj.user_id => " + obj.user_id);
                        //now that data_of_users has been created to store image, city , state, and 
                        //descriptions, we need to find the _id of data of users
                        Data_of_users.find({'user_id' : obj.user_id})
                        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
                            console.log("registerRouter.js - 295  ");
                            console.log("registerRouter.js - 296  data_of_user ->" + data_of_user);
                            console.log("registerRouter.js - 297  data_of_user[0] ->" + data_of_user[0]);
                            console.log("registerRouter.js - 298  user._id ->" + user._id);
                            console.log("registerRouter.js - 299  data_of_user[0].user_id ->" + data_of_user[0].user_id);
                            
                            const message_JSON = '{ "user_id":'        + '"' + user._id   + '"' + 
                                                ', "username":'  + '"' + req.query.username + '"' + 
                                                ', "comments":[] }';
                                                /*
                                                "date":' + '"' + '"' +
                                                ', "has_read_email":' + '"' + false + '"' +
                                                ', "sender_email":' + '"' + '"' +
                                                ', "subject":' + '"' + '"' +
                                                ', "message":' + '"' + '"' + 
                                                */
                            console.log('registerRouter.js - 311 message_JSON -> ' + message_JSON );
                            const message_obj = JSON.parse(message_JSON);
                            console.log("registerRouter.js - 313 message_obj ->" + message_obj );
                            Messages.create( message_obj )  //req.body //Heartdatas
                            .then( (message) => {
                                console.log("registerRouter.js - 316  message[0] ->" + message[0]);
                                console.log("registerRouter.js - 317  message created => " + message );
                                console.log("registerRouter.js - 318  message._id => " + message._id );
                                console.log("registerRouter.js - 319  message.user_id => " + message.user_id );
                                var temp_user_id = message.user_id;
                                console.log("registerRouter.js - 321  temp_user_id => " + temp_user_id );
                                //have to spell out the path due to current directory
                                //res.render('../views/pages/home', { the_user_id : temp_user_id});
                                //-------------------------------------------------
                                //send email
                                //outgoing email server
                                var nodemailer = require('nodemailer');

                                let transporter = nodemailer.createTransport({
                                host : 'nw68.fcomet.com', //mail.savemysquashplantsfromborers.com',
                                port : 465, //2525,465
                                secure : true,
                                auth: {  //
                                    user: 'fc@savemysquashplantsfromborers.com', //_mainaccount@savemysquashplantsfromborers.com',
                                    pass: '9i9ShWm7c6'
                                },
                                tls:{
                                    rejectUnauthorized : false //
                                }
                                });
                                console.log('registerRouter.js - /:get 341 Query title req.query=> ' , req.query);
                                //console.log('registerRouter.js - /:get 17 Query title req.body=> ' , JSON.stringify( req.body ));
                                let temp = req.query;

                                console.log('registerRouter.js /:commentId 345 temp.email->' + temp.email );
                                console.log('registerRouter.js /:commentId 346 temp.username->' + temp.username );
                                var email_address = 'trobert612t@netscape.net';
                                //send me a message
                                let mailOptions = {
                                    from : 'spacechf', //sender address
                                    to : `${email_address}`,//'trobert612t@netscape.net', //list of recipients
                                    subject : 'from spaceCHF - new spaceCHF member ->' + temp.username  + ' email ' + temp.email,  //subject line `${req.body.email}`
                                    text : 'new spaceChf member' ,//'Hello World', //subject body
                                    html: `${temp.email }` //'<b>Hello World </b>?'
                                };
                                console.log("registerRouter.js - 356 - after mail options");

                                transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log("registerRouter.js - 362 - sent email");
                                }); 
                                //------------------------------------------------------------------
                                res.render('../views/pages/index');
                            }, (err) => next(err) )
                            .catch( (err) => next(err) );
                            
                            // pass the user_id into home to use to edit myprofile
                            
                        });

                        /*
                        //descriptions ==>  we need messages storage
                        const message_JSON = '{ "date" :' + '"' + '"'  + 
                                            ', "user_id": '   + '"' + user._id + '"' + 
                                            ', "sender_id": ' + '"' + '"' +
                                            ', "subject": '   + '"' + '"' + 
                                            ', "message": '   +  '"' + '"'  + '}';
                        console.log('registerRouter.js - 194 message_JSON -> ' + message_JSON );
                        const message_obj = JSON.parse(data_of_user_JSON);
    
                        console.log("message_obj.user._id -> " + message_obj.user_id);

                        console.log("message_obj.date -> " + message_obj.date);
                        Messages.create( message_obj )  //req.body //Heartdatas
                        .then( (message) => {
                            console.log("registerRouter.js - 186  ");
                            console.log("registerRouter.js - 187  Messages created" + message);
                            res.render('home');
                        }, (err) => next(err) )
                        .catch( (err) => next(err) );

                        */
                    }, (err) => next(err) )
                    .catch( (err) => next(err) );
                });
            }
            
            
        }  //if( users.length == 0){
    }, (err) => next(err) )
    .catch( (err) => next(err) );//.then( (users) => {
    
}); //.get((req,res, next) => {


module.exports = registerRouter;