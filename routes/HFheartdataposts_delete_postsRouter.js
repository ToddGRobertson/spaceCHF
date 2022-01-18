const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');
const Users = require('../models/user');

const HFheartdataposts_delete_postsRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

HFheartdataposts_delete_postsRouter.use( bodyParser.json());
console.log('HFheartdataposts_delete_postsRouter.js - 14');
HFheartdataposts_delete_postsRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('HFheartdataposts_delete_postsRouter.js - 17 req.params.username => ' , req.params.username);
    console.log('HFheartdataposts_delete_postsRouter.js - 17 req.params.user_id => ' , req.params.user_id );
    console.log('HFheartdataposts_delete_postsRouter.js - 18 req.params.title_Id => ' , req.params.title_Id );
    var the_user_id = req.params.user_id;
    var the_username = req.params.username;
    Heartdataposts.findOneAndDelete({ _id: req.params.title_Id }, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted Heartdataposts  27 : ", docs);
            //console.log('HFheartdataposts_delete_commentsRouter.js - 26 Heartdataposts  => ' , Heartdataposts );
            console.log('HFheartdataposts_delete_commentsRouter.js - 27 the_user_id  => ' , the_user_id );
            console.log('HFheartdataposts_delete_commentsRouter.js - 28 the_username  => ' , the_username );
            res.render('../views/pages/myprofilemenu', {the_user_id : the_user_id ,
                                                            the_username : the_username });
        }
    });
    
    /* 
    Heartdataposts.findById( req.params.title_Id)
    .then( (heartdataposts) => {
        console.log('HFheartdataposts_delete_postsRouter.js - 24 inside heartdataposts delete posts router => ' );
        if( heartdataposts != null){
            //dish may not exist.   Build it, save it and return it
            //delete each dish comment by id, then save
            console.log('HFheartdataposts_delete_postsRouter.js - 28 before for statement heartdataposts=> ' + heartdataposts);
            console.log('HFheartdataposts_delete_postsRouter.js - 29 before for statement heartdataposts.comments.length => ' + heartdataposts.comments.length );
            for( var i = (heartdataposts.comments.length - 1); i >= 0; i--) {
                //long comment id is dish.comments[i]._id
                console.log('HFheartdataposts_delete_postsRouter.js - 31 before for statement heartdataposts.comments.id( heartdataposts.comments[i]._id)=> ' + heartdataposts.comments.id( heartdataposts.comments[i]._id));
                heartdataposts.comments.id( heartdataposts.comments[i]._id).remove();
                
            }
            
            console.log('HFheartdataposts_delete_postsRouter.js - 34 after for statement heartdataposts => ' + heartdataposts);
            console.log('HFheartdataposts_delete_postsRouter.js - 35 after for statement => ' );
            heartdataposts.save()
            .then(( heartdataposts) => {
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');  // looking for json string
                res.json(heartdataposts);
                
                console.log('HFheartdataposts_delete_commentsRouter.js - 39 the_user_id  => ' , the_user_id );
                console.log('HFheartdataposts_delete_commentsRouter.js - 40 the_username  => ' , the_username );
                res.render('../views/pages/myprofilemenu', {the_user_id : the_user_id ,
                                                                the_username : the_username });
            }, (err ) => next(err));
        }
        else{ //dish doesn't exist
            err = new Error('Heartdataposts ' + req.params.dishId + ' not found');
            err.status = 404; //not found
            return next(err);
        }
 
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    */
});

module.exports = HFheartdataposts_delete_postsRouter;