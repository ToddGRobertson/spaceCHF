const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const theirprofileRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

theirprofileRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside theirprofileRouter.js");


theirprofileRouter.route('/:user_id')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside theirprofileRouter /:user_id - req.params.user_id " + req.params.user_id);
    console.log("inside theirprofileRouter /:user_id - process.cwd() -> " + process.cwd() );
    const the_user_id = req.params.user_id;
    console.log("inside theirprofileRouter - 23 - the_user_id => " + the_user_id);
    Data_of_users.find({'user_id' : the_user_id  })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("inside theirprofileRouter - 29 - the_user_id => " + the_user_id );
        console.log("inside theirprofileRouter - 30 - data_of_user[0].image => " + data_of_user[0].image );
        console.log("inside theirprofileRouter - 30 - data_of_user[0].image => " + data_of_user[0].patient_or_caregiver );
        console.log("inside theirprofileRouter - 30 - data_of_user[0].illness => " + data_of_user[0].illness );
        console.log("inside theirprofileRouter - 30 - data_of_user[0].city => " + data_of_user[0].city );
        console.log("inside theirprofileRouter - 30 - data_of_user[0].state => " + data_of_user[0].state );
        console.log("inside theirprofileRouter - 30 - data_of_user[0].brief_description => " + data_of_user[0].brief_description );
        console.log("inside theirprofileRouter - 30 - data_of_user[0].detailed_description => " + data_of_user[0].detailed_description );
        res.render('../views/pages/theirprofile', { the_user_id : the_user_id,
                                                 the_image: data_of_user[0].image,
                                                 the_patient_or_caregiver : data_of_user[0].patient_or_caregiver,
                                                 the_illness: data_of_user[0].illness,
                                                 the_city: data_of_user[0].city,
                                                 the_state: data_of_user[0].state,
                                                 the_brief_description : data_of_user[0].brief_description,
                                                 the_detailed_description :  data_of_user[0].detailed_description }); //title: obj.email 
    }, (err) => next(err) )
    .catch( (err) => next(err) );

           
        //res.redirect('/'); //home
});



module.exports = theirprofileRouter;
