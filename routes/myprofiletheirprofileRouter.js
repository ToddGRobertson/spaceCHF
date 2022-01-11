const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const myprofiletheirprofileRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofiletheirprofileRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside myprofiletheirprofileRouter.js");


myprofiletheirprofileRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofiletheirprofileRouter /:user_id - 23 req.params.user_id " + req.params.user_id);
    console.log("inside myprofiletheirprofileRouter /:user_id - 24 req.params.their_id " + req.params.their_id);
    //console.log("inside myprofiletheirprofileRouter /:user_id - 25 process.cwd() -> " + process.cwd() );
    if( req.params.user_id != undefined && req.params.their_id != undefined ){ //someone has signed in and both have values
        const the_user_id = req.params.user_id;
        const the_receiver_id = req.params.their_id;
        console.log("inside myprofiletheirprofileRouter - 28 - the_user_id => " + the_user_id);
        Data_of_users.find({'user_id' : the_receiver_id  })  // from posts.js
        .then( (data_of_users) => { //dishes is in mongodb as a collection/database
            console.log("inside myprofiletheirprofileRouter - 31 - the_user_id => " + the_user_id );
            console.log("inside myprofiletheirprofileRouter - 33 - data_of_user[0].username => " + data_of_users[0].username );
            console.log("inside myprofiletheirprofileRouter - 33 - data_of_user[0].image => " + data_of_users[0].image );
            console.log("inside myprofiletheirprofileRouter - 34 - data_of_user[0].patient_or_caregiver => " + data_of_users[0].patient_or_caregiver );
            console.log("inside myprofiletheirprofileRouter - 35 - data_of_user[0].illness => " + data_of_users[0].illness );
            console.log("inside myprofiletheirprofileRouter - 36 - data_of_user[0].city => " + data_of_users[0].city );
            console.log("inside myprofiletheirprofileRouter - 37 - data_of_user[0].state => " + data_of_users[0].state );
            console.log("inside myprofiletheirprofileRouter - 38 - data_of_user[0].brief_description => " + data_of_users[0].brief_description );
            console.log("inside myprofiletheirprofileRouter - 39 - data_of_user[0].detailed_description => " + data_of_users[0].detailed_description );
            
            res.render('../views/pages/theirprofile', { the_user_id : the_user_id,
                                                    the_username : data_of_users[0].username ,
                                                    the_receiver_id : data_of_users[0].user_id,
                                                    the_image: data_of_users[0].image,
                                                    the_patient_or_caregiver : data_of_users[0].patient_or_caregiver,
                                                    the_illness: data_of_users[0].illness,
                                                    the_city: data_of_users[0].city,
                                                    the_state: data_of_users[0].state,
                                                    the_brief_description : data_of_users[0].brief_description,
                                                    the_detailed_description :  data_of_users[0].detailed_description }); //title: obj.email 
        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }else{  //nobody signed in .  Someone is just browsing
        const the_receiver_id = req.params.their_id;
        console.log("inside myprofiletheirprofileRouter - 57 - the_receiver_id => " + the_receiver_id);
        Data_of_users.find({'user_id' : the_receiver_id  })  // from posts.js
        .then( (data_of_users) => { //dishes is in mongodb as a collection/database
            //.log("inside myprofiletheirprofileRouter - 60 - the_user_id => " + the_user_id );
            console.log("inside myprofiletheirprofileRouter - 61 - data_of_user[0].username => " + data_of_users[0].username );
            console.log("inside myprofiletheirprofileRouter - 62 - data_of_user[0].image => " + data_of_users[0].image );
            console.log("inside myprofiletheirprofileRouter - 63 - data_of_user[0].patient_or_caregiver => " + data_of_users[0].patient_or_caregiver );
            console.log("inside myprofiletheirprofileRouter - 64 - data_of_user[0].illness => " + data_of_users[0].illness );
            console.log("inside myprofiletheirprofileRouter - 65 - data_of_user[0].city => " + data_of_users[0].city );
            console.log("inside myprofiletheirprofileRouter - 66 - data_of_user[0].state => " + data_of_users[0].state );
            console.log("inside myprofiletheirprofileRouter - 67 - data_of_user[0].brief_description => " + data_of_users[0].brief_description );
            console.log("inside myprofiletheirprofileRouter - 68 - data_of_user[0].detailed_description => " + data_of_users[0].detailed_description );
            
            res.render('../views/pages/theirprofile_no_user_id', { the_username : data_of_users[0].username ,
                                                    the_receiver_id : data_of_users[0].user_id,
                                                    the_image: data_of_users[0].image,
                                                    the_patient_or_caregiver : data_of_users[0].patient_or_caregiver,
                                                    the_illness: data_of_users[0].illness,
                                                    the_city: data_of_users[0].city,
                                                    the_state: data_of_users[0].state,
                                                    the_brief_description : data_of_users[0].brief_description,
                                                    the_detailed_description :  data_of_users[0].detailed_description }); //title: obj.email 
        }, (err) => next(err) )
        .catch( (err) => next(err) );
    }
    

           
        //res.redirect('/'); //home
});


module.exports = myprofiletheirprofileRouter;
