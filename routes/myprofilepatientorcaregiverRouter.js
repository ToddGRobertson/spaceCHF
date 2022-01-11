const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const myprofilepatientorcaregiverRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilepatientorcaregiverRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside 18 myprofilepatientorcaregiverRouter.js");
myprofilepatientorcaregiverRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {  //someone is signed in
    console.log("inside 21 myprofilepatientorcaregiverRouter /");
    console.log("inside 22 myprofilepatientorcaregiverRouter req.params.user_id -> " + req.params.user_id );
    if( req.params.user_id != undefined ){
        const the_user_id = req.params.user_id;
        console.log("inside myprofilepatientorcaregiverRouter - 31 - the_user_id => " + the_user_id)
        Data_of_users.find({'user_id' : the_user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            console.log("myprofilepatientorcaregiverRouter - 32 displayed data_of_users[0] : 32 ", data_of_user[0]);
            console.log("myprofilepatientorcaregiverRouter - 33 displayed data_of_users[0]._id : 33 ", data_of_user[0]._id);
            console.log("myprofilepatientorcaregiverRouter - 33 displayed data_of_users[0].username : 33 ", data_of_user[0].username);
            user_id_answer = data_of_user[0]._id;
            console.log("myprofilepatientorcaregiverRouter - 36 displayed 35 user_id_answer :  ", user_id_answer);
            res.render('../views/pages/myprofilepatientorcaregiver', { the_user_id : the_user_id ,
                                                                    the_username : data_of_user[0].username}); //title: obj.email    

        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }else{  //someone is browsing
        res.render('../views/pages/register_user'); 
    }

 
});

myprofilepatientorcaregiverRouter.route('/:user_id')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilepatientorcaregiverRouter 28 /:user_id - req.params.user_id " + req.params.user_id);
    //console.log("inside myprofilepatientorcaregiverRouter 29 /:user_id - process.cwd() -> " + process.cwd() );
    if( req.params.user_id != undefined ){  //someone is signed in
        const the_user_id = req.params.user_id;
        console.log("inside myprofilepatientorcaregiverRouter - 31 - the_user_id => " + the_user_id)
        Data_of_users.find({'user_id' : the_user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            console.log("myprofilepatientorcaregiverRouter - 32 displayed data_of_users[0] : 32 ", data_of_user[0]);
            console.log("myprofilepatientorcaregiverRouter - 33 displayed data_of_users[0]._id : 33 ", data_of_user[0]._id);
            console.log("myprofilepatientorcaregiverRouter - 33 displayed data_of_users[0].username : 33 ", data_of_user[0].username);
            user_id_answer = data_of_user[0]._id;
            console.log("myprofilepatientorcaregiverRouter - 36 displayed 35 user_id_answer :  ", user_id_answer);
            res.render('../views/pages/myprofilepatientorcaregiver', { the_user_id : the_user_id ,
                                                                    the_username : data_of_user[0].username}); //title: obj.email    

        }, (err) => next(err) )
        .catch( (err) => next(err) );
    }
    
        
        //res.redirect('/'); //home
});


module.exports = myprofilepatientorcaregiverRouter;
