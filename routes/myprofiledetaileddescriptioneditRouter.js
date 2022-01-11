const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const data_of_users = require('../models/data_of_users');

const myprofiledetaileddescriptioneditRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofiledetaileddescriptioneditRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - 18 inside myprofiledetaileddescriptioneditRouter.js");
myprofiledetaileddescriptioneditRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofiledetaileddescriptioneditRouter /:user_id - 21 req.query -> " + JSON.stringify(req.query ));
    console.log("inside myprofiledetaileddescriptioneditRouter /:user_id - 22 req.query.user_id -> " + req.query.user_id );
    console.log("inside myprofiledetaileddescriptioneditRouter /:user_id - 23 req.query.detailed_description-> " + req.query.detailed_description );
    console.log("inside myprofiledetaileddescriptioneditRouter /:user_id - 24 process.cwd() -> " + process.cwd() );
    const the_user_id = req.query.user_id;
    console.log("inside myprofiledetaileddescriptioneditRouter - 26 - the_user_id => " + the_user_id)
    //res.render('../views/pages/myprofilebriefdescription', { the_user_id : the_user_id }); //title: obj.email        
        //res.redirect('/'); //home
    data_of_users.find({'user_id' : req.query.user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("myprofiledetaileddescriptioneditRouter 31 displayed data_of_users[0] : ", data_of_user[0]);
        console.log("myprofiledetaileddescriptioneditRouter 32 displayed data_of_users[0]._id : ", data_of_user[0]._id);

        user_id_answer = data_of_user[0]._id;
        console.log("myprofiledetaileddescriptioneditRouter 35displayed  user_id_answer :  ", user_id_answer);
    
        console.log("before findbyIdandupdate 37 ");
        data_of_users.findByIdAndUpdate({ _id: user_id_answer }
            ,{ detailed_description: req.query.detailed_description }, function(err, result){
            console.log("inside findbyIDandUpdate - myprofiledetaileddescriptioneditRouter : ");
            if(err){
                res.send(err)
            }
            else{
                res.render('../views/pages/myprofilehome', { the_user_id : the_user_id,
                                                    the_username : data_of_user[0].username  });
               // res.send(result)
            }
        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }, (err) => next(err) )
    .catch( (err) => next(err) );
    
});

module.exports = myprofiledetaileddescriptioneditRouter;
