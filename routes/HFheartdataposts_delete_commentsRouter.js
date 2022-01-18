const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');
const Users = require('../models/user');

const HFheartdataposts_delete_commentsRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

HFheartdataposts_delete_commentsRouter.use( bodyParser.json());
console.log('HFheartdataposts_delete_commentsRouter.js - 14');
HFheartdataposts_delete_commentsRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('HFheartdataposts_delete_commentsRouter.js - 17 req.params.username => ' , req.params.username);
    console.log('HFheartdataposts_delete_commentsRouter.js - 17 req.params.user_id => ' , req.params.user_id );
    console.log('HFheartdataposts_delete_commentsRouter.js - 18 req.params.title_Id => ' , req.params.title_Id );
    console.log('HFheartdataposts_delete_commentsRouter.js - 19 req.params.commentId => ' , req.params.commentId );
    var the_user_id = req.params.user_id;
    var the_username = req.params.username;
    Heartdataposts.findById( req.params.title_Id)
    .then( (heartdataposts) => {
        console.log('HFheartdataposts_delete_commentsRouter.js - 21 inside heartdataposts delete comments router => ' );
        //console.log('HFheartdataposts_delete_commentsRouter.js - 21 heartdataposts => ' , heartdataposts );
        if( heartdataposts != null && heartdataposts.comments.id( req.params.commentId) != null  ){
            //heartdataposts exists
            //dish may not exist
            heartdataposts.comments.id( req.params.commentId ).remove();
            //rating and comments updated
            //save heartdataposts , not Heartdataposts
            heartdataposts.save()
            .then(( heartdataposts) => {
                /*
                 res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');  // looking for json string
                res.json(heartdataposts);
                */
                console.log('HFheartdataposts_delete_commentsRouter.js - 36 the_user_id  => ' , the_user_id );
                console.log('HFheartdataposts_delete_commentsRouter.js - 36 the_username  => ' , the_username );
                res.render('../views/pages/myprofilemenu', {the_user_id : the_user_id ,
                                                            the_username : the_username }); 
            }, (err ) => next(err));
        }
        else if( heartdataposts == null) { //dish doesn't exist
            console.log('HFheartdataposts_delete_commentsRouter.js - 40 heartdataposts == null ');
            err = new Error('Heartdataposts ' + req.params.title_Id + ' not found');
            err.status = 404; //not found
            return next(err);
        }
        else{
            console.log('dishRouter.js - else  ');
            err = new Error('comments ' + req.params.commentId + ' not found');
            err.status = 404; //not found
            return next(err);

        }   
    }, (err) => next(err) )
    .catch( (err) => next(err) );
});

module.exports = HFheartdataposts_delete_commentsRouter;