const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const myprofileRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofileRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside 18 myprofileRouter.js");


myprofileRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofileRouter /:user_id - req.params.user_id " + req.params.user_id);
    //console.log("inside myprofileRouter /:user_id - process.cwd() -> " + process.cwd() );
    if( req.params.user_id != undefined ){  //someone is signed in
        const the_user_id = req.params.user_id;
        console.log("inside myprofileRouter - 23 - the_user_id => " + the_user_id);
        Data_of_users.find({'user_id' : the_user_id  })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            console.log("inside myprofileRouter - 29 - the_user_id => " + the_user_id );
            console.log("inside myprofileRouter - 30 - data_of_user[0].image => " + data_of_user[0].image );
            console.log("inside myprofileRouter - 30 - data_of_user[0].username => " + data_of_user[0].username );
            console.log("inside myprofileRouter - 30 - data_of_user[0].patient_or_caregiver => " + data_of_user[0].patient_or_caregiver );
            console.log("inside myprofileRouter - 30 - data_of_user[0].illness => " + data_of_user[0].illness );
            console.log("inside myprofileRouter - 30 - data_of_user[0].city => " + data_of_user[0].city );
            console.log("inside myprofileRouter - 30 - data_of_user[0].state => " + data_of_user[0].state );
            console.log("inside myprofileRouter - 30 - data_of_user[0].brief_description => " + data_of_user[0].brief_description );
            console.log("inside myprofileRouter - 30 - data_of_user[0].detailed_description => " + data_of_user[0].detailed_description );
            res.render('../views/pages/myprofile', { the_user_id : the_user_id,
                                                    the_username : data_of_user[0].username,
                                                    the_image: data_of_user[0].image,
                                                    the_patient_or_caregiver : data_of_user[0].patient_or_caregiver,
                                                    the_illness: data_of_user[0].illness,
                                                    the_city: data_of_user[0].city,
                                                    the_state: data_of_user[0].state,
                                                    the_brief_description : data_of_user[0].brief_description,
                                                    the_detailed_description :  data_of_user[0].detailed_description }); //title: obj.email 
        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }else{  //someone is browsing 
        res.render('../views/pages/register_user');
    }
    
           
        //res.redirect('/'); //home
});


module.exports = myprofileRouter;
