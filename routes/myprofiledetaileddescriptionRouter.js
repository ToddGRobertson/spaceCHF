const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const data_of_users = require('../models/data_of_users');

const myprofiledetaileddescriptionRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofiledetaileddescriptionRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside myprofiledetaileddescriptionRouter.js");
myprofiledetaileddescriptionRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofiledetaileddescriptionRouter /:user_id - req.params.user_id " + req.params.user_id);
    //console.log("inside myprofiledetaileddescriptionRouter /:user_id - process.cwd() -> " + process.cwd() );
    if( req.params.user_id != undefined ){   //someone is signed in
        const the_user_id = req.params.user_id;
        console.log("inside myprofiledetaileddescriptionRouter - 23 - the_user_id => " + the_user_id)
        data_of_users.find({'user_id' : the_user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            console.log("myprofiledetaileddescriptionRouter 27 displayed data_of_users[0] : ", data_of_user[0]);
            console.log("myprofiledetaileddescriptionRouter 28 displayed data_of_users[0]._id : ", data_of_user[0]._id);
            console.log("myprofiledetaileddescriptionRouter 29 displayed data_of_users[0].username : ", data_of_user[0].username);

            res.render('../views/pages/myprofiledetaileddescription', { the_user_id : the_user_id ,
                                                                        the_username : data_of_user[0].username }); //title: obj.email 

        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }else{    //someone is browsing
        res.render('../views/pages/register_user');
    }
    

           
        //res.redirect('/'); //home

});

module.exports = myprofiledetaileddescriptionRouter;
