const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
const data_of_users = require('../models/data_of_users');

const myprofilehomeRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilehomeRouter.use( bodyParser.json());
//handle get request to server all dishes

myprofilehomeRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req, res, next ) =>{ 
    console.log("Todd -  inside myprofilehomeRouter 18 - get req.params.user_id ->" + JSON.stringify(req.params.user_id ));
    if( req.params.user_id != null){  //someone signed in
        var the_user_id = req.params.user_id;
        data_of_users.find({ 'user_id' : the_user_id })  // from posts.js
        .then( (data_of_user) => { 
            console.log("21 inside myprofilehomeRouter data_of_user[0].username -> " + data_of_user[0].username );
            res.render('../views/pages/myprofilehome', { the_user_id : the_user_id ,
                the_username : data_of_user[0].username }); //title: obj.email 

        }, (err) => next(err) )
        .catch( (err) => next(err) );
    }else{  //nobody signed in yet.  Just browsing the site
        //do nothing
    }
    

})
module.exports = myprofilehomeRouter;