const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');
//const Heartdataposts = require('../models/heartdataposts');
const user = require('../models/user');
const data_of_users = require('../models/data_of_users');
const Messages = require('../models/messages');
const User = require('../models/user');

const myprofilemessageeditRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilemessageeditRouter.use( bodyParser.json());
//handle get request to server all dishes

console.log('inside myprofilemessageeditRouter.js - /:post Todd myprofileeditcityandstateRouter ');
myprofilemessageeditRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req, res, next ) =>{ //'/myproflle',
    console.log("Todd -  inside myprofilemessageeditRouter 19 - get req.query ->" + JSON.stringify(req.query ));
    console.log("Todd -  inside myprofilemessageeditRouter 20 - get req.query.date ->" + req.query.date );
    console.log("Todd -  inside myprofilemessageeditRouter 21 - get req.query.subject->" + req.query.subject );
    console.log("Todd -  inside myprofilemessageeditRouter 23 - get req.query.message ->" + req.query.message );
    console.log("Todd -  inside myprofilemessageeditRouter 24 - get req.query.user_id ->" + req.query.user_id );
    console.log("Todd -  inside myprofilemessageeditRouter 24 - get req.query.receiver_id ->" + req.query.receiver_id );
    var user_id_answer;
    //look up messages table user id and find _id to change entry for receiver using receiver_id
    Messages.find({'user_id' : req.query.receiver_id })  // from posts.js
    .then( (message) => { //dishes is in mongodb as a collection/database
        console.log("displayed   myprofilemessageeditRouter 27: req.query.receiver_id => ", req.query.receiver_id);
        console.log("displayed   myprofilemessageeditRouter 29  message[0]._id  ", message[0]._id);
        console.log("displayed   myprofilemessageeditRouter 29  message[0].username  ", message[0].username);
        console.log("displayed   myprofilemessageeditRouter 30  message[0].date", message[0].date);
        console.log("displayed   myprofilemessageeditRouter 31  message[0].user_id : ", message[0].user_id);
        console.log("displayed   myprofilemessageeditRouter 32  message[0].subject : ", message[0].subject);
        console.log("displayed   myprofilemessageeditRouter 33  messages[0].message : ", message[0].message);

        //use message[0].user_id to find user email and send an email to owner of message

        var recipient_email = ""; //store recipient email address
        var sender_username = ""; //store sender username
        User.find({'_id' : message[0].user_id })  // from posts.js
        .then( (user) => { //dishes is in mongodb as a collection/database
            console.log("displayed   myprofilemessageeditRouter 44  user[0]._id => ", user[0]._id);
            console.log("displayed   myprofilemessageeditRouter 45  user[0].email  ", user[0].email);
            recipient_email = user[0].email;
            // now find username
            console.log("displayed   myprofilemessageeditRouter 48  req.query.user_id  ", req.query.user_id);
            User.find({'_id' : req.query.user_id })  // from posts.js
            .then( (user) => { //dishes is in mongodb as a collection/database
                console.log("displayed   myprofilemessageeditRouter 51  user[0]._id  ", user[0]._id);
                console.log("displayed   myprofilemessageeditRouter 52  user[0].username ", user[0].username);
                sender_username = user[0].username ; //store sender username

                //plug user[0].username to email and send message
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
                //console.log('registerRouter.js - /:get 141 Query title req.query=> ' , req.query);
                //console.log('registerRouter.js - /:get 17 Query title req.body=> ' , JSON.stringify( req.body ));
                //let temp = req.query;

                console.log('myprofilemessageeditRouter.js  77 before sending email ' );
                console.log('myprofilemessageeditRouter.js  78 user[0].email->' + user[0].email );
                console.log('myprofilemessageeditRouter.js  78 recipient_email ->' + recipient_email );
                console.log('myprofilemessageeditRouter.js  78 sender_username ->' + sender_username );
                //send recipient a message
                let mailOptions = {
                    from : 'spacechf', //sender address
                    to : `${recipient_email}`,//'trobert612t@netscape.net', //list of recipients
                    subject : 'from spaceCHF - you have a message from ->' + sender_username ,  //subject line `${req.body.email}`
                    text : 'new spaceChf member' ,//'Hello World', //subject body
                    html: `${req.query.message }` //'<b>Hello World </b>?'
                };
                console.log("myprofilemessageeditRouter.js - 87 - after mail options");

                transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("myprofilemessageeditRouter.js - 93 - sent email");
                }); 
                //------------------------------------------------------------------

            }, (err) => next(err) )
            .catch( (err) => next(err) );

            
        }, (err) => next(err) )
        .catch( (err) => next(err) );
        //console.log("displayed data_of_users[0].city 27 ", message[0].city);

        //we have a match on user_id
        // now update the record with using message[0]._id
        receiver_id_answer = message[0]._id;
        console.log("myprofilemessageeditRouter displayed  41 receiver_id_answer :  ", receiver_id_answer);
    
        console.log("myprofilemessageeditRouter before findbyId 43  ");
        
        
        Messages.findById( receiver_id_answer)
        .then( (message) => {
            console.log("inside findbyID - 115 myprofilemessageeditRouter : message[0] => " + message[0]);
            console.log("inside findbyID - 116 myprofilemessageeditRouter : message => " + message );
            console.log("inside findbyID - 117 myprofilemessageeditRouter : req.query.date => " + req.query.date );
            //---------------------------------------
            if( message != null){
                //message may not exist.   Build it, save it and return it
                //to use push --> use different JSON format
                
                var temp_date =  req.query.date;
                console.log("inside findbyID - 124 myprofilemessageeditRouter : temp_date => " + temp_date );
                var temp_sender_id = req.query.user_id;
                console.log("inside findbyID - 126 myprofilemessageeditRouter : temp_sender_id => " + temp_sender_id );
                var temp_sender_image = req.query.sender_image;
                console.log("inside findbyID - 128 myprofilemessageeditRouter : temp_sender_image => " + temp_sender_image);
                var temp_subject = req.query.subject;
                console.log("inside findbyID - 130 myprofilemessageeditRouter : temp_subject => " + temp_subject);
                var temp_message = req.query.message;
                console.log("inside findbyID - 132 myprofilemessageeditRouter : temp_message => " + temp_message );
                //use this format for the push
                var temp_JSON_message =   { has_been_read: false , date:  temp_date , sender_id: temp_sender_id , sender_image : temp_sender_image ,  subject: temp_subject ,  message:  temp_message   }; 
                                       

                                        /*
                                        ', "sender_email":'  + '"'            + '"'    +
                                 
                                        */
                            
                console.log('myprofilemessageeditRouter 142 - temp_JSON_message => ' , temp_JSON_message);
                //---------------------------------------------------------
                var feed = {created_at: "2017-03-14T01:00:32Z", entry_id: 33358, field1: "4", field2: "4", field3: "0"};
                console.log("feed -> " + JSON.stringify( feed ));
                var data = [];
                data.push(feed);

                console.log("data -> " + JSON.stringify( data ));
                //-----------------------------------------------------------
                //create json file to push using data
                /*
                var temp_JSON = { author : author_str, datepicker : date_str , comment :  comment_str };
                console.log("temp_JSON -> " + JSON.stringify( temp_JSON ));
                */
                message.comments.push(temp_JSON_message);
                message.save()
                .then(( message) => {
                    console.log('myprofilemessageeditRouter 159 - message saved => ');
                    //res.statusCode = 200;
                    //res.setHeader('Content-Type', 'application/json');  // looking for json string

                    req.query.user_id
                    data_of_users.find({'user_id' : req.query.user_id })  // from posts.js
                    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
                        console.log("myprofiledetaileddescriptioneditRouter 166 displayed data_of_users[0] : ", data_of_user[0]);
                        console.log("myprofiledetaileddescriptioneditRouter 167 displayed data_of_users[0]._id : ", data_of_user[0]._id);
                        console.log("myprofiledetaileddescriptioneditRouter 168 displayed data_of_users[0].username: ", data_of_user[0].username);
                        res.render('../views/pages/myprofilehome', { the_user_id : req.query.user_id ,
                            the_username : data_of_user[0].username}); //title: obj.email
                    }, (err) => next(err) )
                    .catch( (err) => next(err) );

                     
                    //res.json(message);
                }, (err ) => next(err));
                
                //res.json( dish.comments);  //return json string in res
            }
            else{ //dish doesn't exist
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404; //not found
                return next(err);
            }
        }, (err) => next(err) )
        .catch( (err) => next(err) );   
    
    }, (err) => next(err) )
    .catch( (err) => next(err) );
})
//authenticate.verifyUser must be true to use put
//authenticate.verifyAdmin must be true too to use put

.post((req, res, next ) =>{ //'/myproflle',
    console.log("Todd -  inside myprofilemessageeditRouter 46 - post req.body ->" + JSON.stringify( req.body));
    console.log("Todd -  inside myprofilemessageeditRouter 47 - post req.query ->" + JSON.stringify(req.query ));
    console.log("Todd -  inside myprofilemessageeditRouter 48 - post req.params.user_id ->" + req.params.user_id);
    data_of_users.find({'user_id' : req.params.user_id })  // from posts.js
    .then( (data_of_users) => { //dishes is in mongodb as a collection/database
        console.log("displayed data_of_users : ", data_of_users);
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    /*
    data_of_users.findByIdAndUpdate(req.cookies['user_id'], {city : req.body.city },
                                                                        function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
            console.log("data_of_users has been updated");
            console.log("data_of_users post ->" + data_of_users);
            res.statusCode =  200;
            res.setHeader('Content-type', 'application/json');
            res.json(data_of_users);
        }
    });
    */
 
})

module.exports = myprofilemessageeditRouter;
