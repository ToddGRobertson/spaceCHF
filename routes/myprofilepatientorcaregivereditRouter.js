const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const data_of_users = require('../models/data_of_users');

const myprofilepatientorcaregivereditRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilepatientorcaregivereditRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside myprofilepatientorcaregivereditRouter.js");
myprofilepatientorcaregivereditRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilepatientorcaregivereditRouter /:user_id - 21 req.query -> " + JSON.stringify(req.query ));
    console.log("inside myprofilepatientorcaregivereditRouter /:user_id - 22 req.query.user_id -> " + req.query.user_id );
    console.log("inside myprofilepatientorcaregivereditRouter /:user_id - 23 req.query.patientorcaregiver-> " + req.query.patient_or_caregiver );
    console.log("inside myprofilepatientorcaregivereditRouter /:user_id - 23 req.query.illness-> " + req.query.illness );
    console.log("inside myprofilepatientorcaregivereditRouter /:user_id - 25 process.cwd() -> " + process.cwd() );
    const the_user_id = req.query.user_id;
    console.log("inside myprofilepatientorcaregivereditRouter - 27- the_user_id => " + the_user_id)
    //res.render('../views/pages/myprofilebriefdescription', { the_user_id : the_user_id }); //title: obj.email        
        //res.redirect('/'); //home
    data_of_users.find({'user_id' : req.query.user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("patientorcaregicer - 32 displayed data_of_users[0] : 32 ", data_of_user[0]);
        console.log("patientorcaregicer - 33 displayed data_of_users[0]._id : 33 ", data_of_user[0]._id);
        console.log("patientorcaregicer - 33 displayed data_of_users[0].username : 33 ", data_of_user[0].username);

        user_id_answer = data_of_user[0]._id;
        console.log("patientorcaregicer - 36 displayed 35 user_id_answer :  ", user_id_answer);
    
        console.log("patientorcaregicer - 38 before findbyIdandupdate 37 ");
        data_of_users.findByIdAndUpdate({ _id: user_id_answer }
            ,{ patient_or_caregiver : req.query.patient_or_caregiver, illness : req.query.illness }, function(err, result){
            console.log("patientorcaregicer - 32 inside findbyIDandUpdate - 41 myprofilepatientorcaregivereditRouter : ");
            if(err){
                res.send(err)
            }
            else{
                res.render('../views/pages/myprofilehome', { the_user_id : req.query.user_id,
                                                    the_username : data_of_user[0].username  }); //title: obj.email
                //res.send(result)
            }
        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }, (err) => next(err) )
    .catch( (err) => next(err) );
    
});

module.exports = myprofilepatientorcaregivereditRouter;
