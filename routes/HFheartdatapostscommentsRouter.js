const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');


const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const cookieParser = require('cookie-parser');

const heartdatapostscommentsRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

heartdatapostscommentsRouter.use( bodyParser.json());

console.log("HFheartdatapostcommentsRouter - Todd ");

heartdatapostscommentsRouter.route('/') //:commentId/comments'
//create a resource
.post( (req,res,next ) => {
    console.log('HFheartdatapostscommentsRouter.js - / - 20 post - Query title req.query => ' , req.query);
    console.log('HFheartdatapostscommentsRouter.js - / - 21 post - Query title req.params.id => ' , req.params.id);
    console.log('HFheartdatapostscommentsRouter.js - / - 22 post - Query title req.body => ' , req.body);
    Heartdataposts.find( {} )
    .then( (heartdataposts) => {
        console.log('HFHeartdataposts found 24');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');  // looking for json string
        res.json( heartdataposts);  //return json string in res
    }, (err) => next(err) )
    .catch( (err) => next(err) );
});
heartdatapostscommentsRouter.route('/') //:commentId/comments'
.get( (req,res,next ) => {
    console.log('HFheartdatapostscommentRouter.js - /:commentId - 33 post - Query title req.query => ' , req.query);
    console.log('HFheartdatapostscommentRouter.js - /:commentId - 33 post - Query title req.query.the_id => ' , req.query.the_id);
    console.log('HFheartdatapostscommentRouter.js - /:commentId - 33 post - Query title req.query.the_user_id => ' , req.query.the_user_id);
    Heartdataposts.findById( req.query.the_id)
    .then( (heartdatapost) => {
        console.log('HFheartdatapostscommentRouter.js /:commentId  post 39 - found heartdatapost');
        console.log('HFheartdatapostscommentRouter.js - /:commentId  post - 40 -req.query.the_id -> ' , req.query.the_id);
        console.log('HFheartdatapostscommentRouter.js - /:commentId  post - 43 -req.query.the_user_id => ' , req.query.the_user_id);
        console.log('HFheartdatapostscommentRouter.js - /:commentId  post - 44 -req.query.datepicker -> ' , req.query.datepicker );
        if( heartdatapost != null){
            //console.log('heartdatapostscommentRouter.js -/:commentId/comments - post - before heartdatapost.commentId => ' , heartdatapost.commentId.comments);
            //dish may not exist.   Build it, save it and return it
            //console.log('heartdatapostcommentRouter - /:commentId  40 - heartdatapost.comments-> ' , heartdatapost.comments );
            let temp = req.query;
            console.log('HFheartdatapostcommentRouter - /:commentId  post 46 - temp -> ' , temp );
            
            // need to define an array to push into comments,  not done yet
            let author_str = temp.replys_author; //replys_author is on form
            console.log('HFheartdatapostcommentRouter - /:commentId  post 49 - author_str -> ' , author_str );
            let date_str = temp.datepicker;  //datepicker is on form
            console.log('HFheartdatapostcommentRouter - /:commentId  post 52 - date_str -> ' , date_str );
            let  comment_str =  temp.comment ;
            console.log('HFheartdatapostcommentRouter - /:commentId  post 54 - comment_str -> ' , comment_str );
            console.log('HFheartdatapostcommentRouter - /:commentId  post 55 - temp -> ' , temp );
            //---------------------------------------------------------
            var feed = {created_at: "2017-03-14T01:00:32Z", entry_id: 33358, field1: "4", field2: "4", field3: "0"};
            console.log("feed -> " + JSON.stringify( feed ));
            var data = [];
            data.push(feed);

             //-----------------------------------------------------------
            //create json file to push using data
            var temp_JSON = { author : author_str, datepicker : date_str , comment :  comment_str };

            console.log("data -> " + JSON.stringify( data ));
            //-----------------------------------------------------------
            //create json file to push using data
            var temp_JSON = { author : author_str, datepicker : date_str , comment :  comment_str };
            console.log("temp_JSON -> " + JSON.stringify( temp_JSON ));
            // dont save if temp_JSON comment is empty
            if(  temp_JSON.comment == 'Please highlight this text, erase it and write something here'){
                res.send('<script>alert("Heart failure comment box is blank.  Please fill in the comment box")</script>') ;
            }else{
                heartdatapost.comments.push(temp_JSON);
                //console.log('heartdatapostscommentRouter.js  - after push -  48 - heartdatapost.comments => ' , heartdatapost.comments);
                console.log('HFheartdatapostscommentRouter.js  - after push -  76 - temp_JSON.comment => ' , temp_JSON.comment);
                console.log('HFheartdatapostscommentRouter.js  - after push -  77 - heartdatapost.comments[0].author => ' , heartdatapost.comments[0].author);
                console.log('HFheartdatapostscommentRouter.js  - after push -  78 - heartdatapost.comments[0].datepicker => ' , heartdatapost.comments[0].datepicker);
                console.log('HFheartdatapostscommentRouter.js  - after push -  79 - heartdatapost.[0]].comment => ' , heartdatapost.comments[0].comment);
                console.log('HFheartdatapostscommentRouter.js  - after push -  85 - req.query->' + JSON.stringify( req.query ) );
                var original_posters_email = "";
                heartdatapost.save()
                .then(( heartdatapost) => {
                    console.log('HFheartdatapostscommentRouter.js /:commentId 82 heartdatapost saved' + heartdatapost);
                    //-------------------------------------------------
                    //send email to original poster about a new reply
                    //outgoing email server
                    //use req.query.the_id to get original posters email
                    console.log('HFheartdatapostscommentRouter.js 93 - req.query.the_id -> ' + req.query.the_id);
                    Heartdataposts.find({'_id' : req.query.the_id })  // from posts.js
                    .then( (heartdatapost) => { //dishes is in mongodb as a collection/database
                        console.log("96 displayed heartdatapost[0].: ", heartdatapost[0]);
                        console.log("97 displayed heartdatapost[0]._id : ", heartdatapost[0]._id);
                        console.log("98 displayed heartdatapost[0].email : ", heartdatapost[0].email);
                        original_posters_email = heartdatapost[0].email;

                        var nodemailer = require('nodemailer');

                        let transporter = nodemailer.createTransport({
                        host : 'nw68.fcomet.com',
                        port : 465,
                        secure : true,
                        auth: {
                            user: 'fc@savemysquashplantsfromborers.com',
                            pass: '9i9ShWm7c6'
                        },
                        tls:{
                            rejectUnauthorized : false //
                        }
                        });
                        console.log('HFheartdatapostscommentRouter.js /:commentId 119 sent email to original poster' );
                        console.log('HFheartdatapostscommentRouter.js /:commentId 120 original_posters_email ->' + original_posters_email );
                        console.log('HFheartdatapostscommentRouter.js /:commentId 121 req.query.email->' + req.query.email );
                        console.log('HFheartdatapostscommentRouter.js /:commentId 121 req.query.datepicker->' + req.query.datepicker );
                        console.log('HFheartdatapostscommentRouter.js /:commentId 121 req.query ->' + JSON.stringify( req.query ) );
                        console.log('HFheartdatapostscommentRouter.js /:commentId 122 temp_JSON.comment->' + temp_JSON.comment);
                        console.log('HFheartdatapostscommentRouter.js /:commentId 123 req.query.the_user_id ->' + req.query.the_user_id);
                        let mailOptions = {
                            from : 'spacechf', //sender address
                            to : `${  heartdatapost[0].email }`,//'trobert612t@netscape.net', //list of recipients
                            subject : 'From spacechf ' + `${req.query.datepicker}` + ' - new heart failure comment to id ->' + `${req.query.the_id }` + ' from ' + `${req.query.replys_author}`,  //subject line
                            text : `${temp_JSON.comment}`, //'Hello World', //subject body
                            html: `${temp_JSON.comment}` //'<b>Hello World </b>?'
                        };
                        console.log("HFheartdatapostscommentRouter.js - 126 - after mail options");

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log("HFheartdatapostscommentRouter.js - 132 - sent email to original poster");
                        }); 
                        //------------------------------------------------------------------
                        //-------------------------------------------------
                        //send email to me - trobert612t@netscape.net
                        //to do a second time, use a 2nd setting
                        var nodemailer_II = require('nodemailer');

                        let transporter_II = nodemailer_II.createTransport({
                            host : 'nw68.fcomet.com',
                            port : 465,
                            secure : true,
                            auth: {
                                user: 'fc@savemysquashplantsfromborers.com',
                                pass: '9i9ShWm7c6'
                            },
                            tls:{
                                rejectUnauthorized : false //
                            }
                        });
                        console.log('HFheartdatapostscommentRouter.js /:commentId 126');
                        let mailOptions_II = {
                            from : 'spacechf', //sender address
                            to : 'trobert612t@netscape.net', //list of recipients
                            subject : 'From spacechf ' + `${req.query.datepicker}` + ' - new heart failure comment to id ->' + `${req.params.commentId }` + ' from ' + `${req.body.replys_author}`,  //subject line
                            text : `${temp_JSON.comment}`, //'Hello World', //subject body
                            html: `${temp_JSON.comment}`  //'<b>Hello World </b>?'
                        };
                        console.log("HFheartdatapostscommentRouter.js - 134 - after mail options");

                        transporter_II.sendMail(mailOptions_II, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('HFheartdatapostscommentRouter.js - 152 - req.query.the_id -> ' , req.query.the_id);
                            console.log('HFheartdatapostscommentRouter.js - 155 - req.query.the_user_id => ' , req.query.the_user_id);
                            console.log("HFheartdatapostscommentRouter.js - 153 - sent email to me - web site admin");
                            
                        }); 
                        //------------------------------------------------------------------
                        //find the_username using data_of_user
                        Data_of_users.find({'user_id' : req.query.the_user_id })  // from posts.js
                        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
                            //console.log("displayed data_of_users[0] : ", data_of_user[0]);
                            console.log("157 displayed data_of_users[0]._id : ", data_of_user[0]._id);
                            console.log("158 displayed data_of_user[0].user_id : ", data_of_user[0].user_id );
                            console.log("159 displayed data_of_users[0].username : ", data_of_user[0].username);

                            res.render('../views/pages/HFheartdatapostscomments', { title: heartdatapost ,
                                                                                    the_user_id : req.query.the_user_id,
                                                                                    the_username : data_of_user[0].username });


                        }, (err) => next(err) )
                        .catch( (err) => next(err) );
                    }, (err) => next(err) )
                    .catch( (err) => next(err) ); 

                     
                    
                }, (err ) => next(err));
                //res.json( dish.comments);  //return json string in res
            }
            
        }
        else{ //dish doesn't exist
            err = new Error('HFHearddatapost ' + req.params.commentId + ' not found');
            err.status = 404; //not found
            return next(err);
        }
    }, (err) => next(err) )
    .catch( (err) => next(err) );
});
/*
.post((req,res,next) => {
    console.log('heartdatapostscommentRouter.js -/:commentId/comments - post   req.params.commentId -> ' , req.params.commentId);
    console.log('heartdatapostscommentRouter.js -/:commentId/comments - post - Query title req.query => ' , req.query);
    console.log('heartdatapostscommentRouter.js -/:commentId/comments - post - Query title req.body => ' , JSON.stringify(req.body ));
    Heartdataposts.findById( req.params.commentId)
    .then( (heartdatapost) => {
        //console.log('heartdatapostscommentRouter.js -/:commentId/comments - before heartdatapost => ' , heartdatapost);
        if( heartdatapost != null){
            //console.log('heartdatapostscommentRouter.js -/:commentId/comments - post - before heartdatapost.comments => ' , heartdatapost.comments);
            //dish may not exist.   Build it, save it and return it
            heartdatapost.comments.push(req.body);
            //console.log('heartdatapostscommentRouter.js -/:commentId/comments - post - after heartdatapost.comments => ' , heartdatapost.comments);
            heartdatapost.save()
            .then(( heartdatapost) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');  // looking for json string
                res.json(heartdatapost);
            }, (err ) => next(err));
            //res.json( dish.comments);  //return json string in res
        }
        else{ //dish doesn't exist
            err = new Error('Hearddatapost ' + req.params.commentId + ' not found');
            err.status = 404; //not found
            return next(err);
        }
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    /*if( req.params.dishId != null){
        res.end('Post not supported on /dishes/'  + req.params.dishId )
    }else{
        res.end('Will add the dish: ' + req.body.name + ' with details -> ' + req.body.description );
    }*/
    /*
})
*/

/*  did't work
.post((req,res,next) => {
    console.log( "heartdatapostscommentRouter - post req.params.commentId -> "+ req.params.commentId);
    Heartdataposts.findById( req.params.commentId)
    .then( (heartdatapost) => {
        if( heartdatapost != null){
            //dish may not exist.   Build it, save it and return it
            console.log( "heartdatapostscommentRouter - post req.body -> "+ req.body );
            heartdatapost.comments.push(req.body);
            heartdatapost.save()
            .then(( heartdatapost) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');  // looking for json string
                res.json(heartdatapost);
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
    /*if( req.params.dishId != null){
        res.end('Post not supported on /dishes/'  + req.params.dishId )
    }else{
        res.end('Will add the dish: ' + req.body.name + ' with details -> ' + req.body.description );
    }*/
    /*
});
*/
module.exports = heartdatapostscommentsRouter;
