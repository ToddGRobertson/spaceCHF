const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

//upload files
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const data_of_users = require('../models/data_of_users');

const myprofilephotouploadRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilephotouploadRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - 15 inside myprofilephotouploadRouter.js");
myprofilephotouploadRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.post( upload.single('photo'), (req,res, next) => { 
    console.log("POST '/:user_id- inside myprofilephotouploadRouter /:user_id - 28 req.query " + JSON.stringify(req.query ));
    console.log("POST '/:user_id- inside myprofilephotouploadRouter /:user_id - 28 req.body " + JSON.stringify(req.body ));
    console.log("POST '/:user_id- inside myprofilephotouploadRouter /:user_id - 28 req.params.user_id " + req.params.user_id);
    console.log("POST '/:user_id - inside myprofilephotouploadRouter /:user_id - 29 process.cwd() -> " + process.cwd() );
    const the_user_id = req.params.user_id;
    console.log("POST '/:user_id - inside myprofilephotouploadRouter - 31 - todd => " );
    console.log("POST '/:user_id - inside myprofilephotouploadRouter - 31 - the_user_id => " + the_user_id);
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
    console.log("33 myprofilephotouploadRouter displayed req.file : ", req.file );
    console.log("34 myprofilephotouploadRouter displayed req.file.originalname : ", req.file.originalname );
    console.log("34 myprofilephotouploadRouter displayed user_id : ", the_user_id );
    data_of_users.find({'user_id' : the_user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("36 myprofilephotouploadRouter displayed data_of_users[0] : ", data_of_user[0]);
        console.log("37 myprofilephotouploadRouter displayed data_of_users[0]._id : ", data_of_user[0]._id);

        user_id_answer = data_of_user[0]._id;
        console.log("42 myprofilephotouploadRouter displayed user_id_answer :  ", user_id_answer);
        
        data_of_users.findByIdAndUpdate({ _id: user_id_answer }
            ,{ image : req.file.originalname }, function(err, result){
            console.log("inside findbyIDandUpdate - 41 myprofilephotouploadRouter : ");
            if(err){
                res.send(err)
            }
            else{
                res.render('../views/pages/myprofilehome', { the_user_id : req.query.user_id }); //title: obj.email
                //res.send(result)
            }
        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }, (err) => next(err) )
    .catch( (err) => next(err) );

    //res.render('../views/pages/myprofilephoto', { the_user_id : the_user_id }); //title: obj.email        
        //res.redirect('/'); //home
});

myprofilephotouploadRouter.route('/:user_id')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.post((req,res, next) => { 
    console.log("POST '/:user_id- inside myprofilephotouploadRouter /:user_id - 28 req.params.user_id " + req.params.user_id);
    console.log("POST '/:user_id - inside myprofilephotouploadRouter /:user_id - 29 process.cwd() -> " + process.cwd() );
    const the_user_id = req.params.user_id;
    console.log("POST '/:user_id - inside myprofilephotouploadRouter - 31 - todd => " );
    console.log("POST '/:user_id - inside myprofilephotouploadRouter - 31 - the_user_id => " + the_user_id);
    
    data_of_users.find({'user_id' : the_user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("displayed data_of_users[0] : ", data_of_user[0]);
        console.log("displayed data_of_users[0]._id : ", data_of_user[0]._id);

        user_id_answer = data_of_user[0]._id;
        console.log("displayed 35 user_id_answer :  ", user_id_answer);

        data_of_users.findByIdAndUpdate({ _id: user_id_answer }
            ,{ image : '' }, function(err, result){
            console.log("inside findbyIDandUpdate - 41 myprofilepatientorcaregivereditRouter : ");
            if(err){
                res.send(err)
            }
            else{
                res.send(result)
            }
        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }, (err) => next(err) )
    .catch( (err) => next(err) );

    //res.render('../views/pages/myprofilephoto', { the_user_id : the_user_id }); //title: obj.email        
        //res.redirect('/'); //home
});


module.exports = myprofilephotouploadRouter;
