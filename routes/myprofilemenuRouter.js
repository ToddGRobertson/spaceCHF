const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const myprofilemenuRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilemenuRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside myprofilemenuRouter.js");
myprofilemenuRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilemenuRouter /");
    console.log("inside myprofilemenuRouter - 22 req.params -> " + JSON.stringify( req.params ));
    console.log("inside myprofilemenuRouter - 23 req.params.user_id -> " +  req.params.user_id);
    if( req.params.user_id != undefined ){ //someone is signed into forum
        const the_user_id = req.params.user_id;
        console.log("inside myprofilemenuRouter - 25 - the_user_id => " + the_user_id)
        Data_of_users.find({'user_id' : the_user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            console.log("myprofilemenuRouter - 28 displayed data_of_users[0] : 32 ", data_of_user[0]);
            console.log("myprofilemenuRouter - 29 displayed the_user_id : ", the_user_id );
            console.log("myprofilemenuRouter - 30 displayed data_of_users[0].username : ", data_of_user[0].username);
            res.render('../views/pages/myprofilemenu', { the_user_id : the_user_id ,
                                                        the_username : data_of_user[0].username}); //title: obj.email    

        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }else{  //someone is browsing in forums
        res.render('../views/pages/myprofilemenu_no_user_id'); //title: obj.email  
    }
    
    
});


module.exports = myprofilemenuRouter;
