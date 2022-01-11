const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const data_of_users = require('../models/data_of_users');

const myprofilebriefdescriptioneditRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilebriefdescriptioneditRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside myprofilebriefdescriptioneditRouter.js");
myprofilebriefdescriptioneditRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilebriefdescriptioneditRouter /:user_id - req.query -> " + JSON.stringify(req.query ));
    console.log("inside myprofilebriefdescriptioneditRouter /:user_id - req.query.user_id -> " + req.query.user_id );
    console.log("inside myprofilebriefdescriptioneditRouter /:user_id - req.query.brief_description-> " + req.query.brief_description );
    console.log("inside myprofilebriefdescriptioneditRouter /:user_id - req.params.user_id " + req.params.user_id);
    console.log("inside myprofilebriefdescriptioneditRouter /:user_id - process.cwd() -> " + process.cwd() );
    const the_user_id = req.query.user_id;
    console.log("inside myprofilebriefdescriptioneditRouter - 23 - the_user_id => " + the_user_id)
    //res.render('../views/pages/myprofilebriefdescription', { the_user_id : the_user_id }); //title: obj.email        
        //res.redirect('/'); //home
    data_of_users.find({'user_id' : req.query.user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("displayed data_of_users[0] : ", data_of_user[0]);
        console.log("displayed data_of_users[0]._id : ", data_of_user[0]._id);
        console.log("displayed data_of_users[0].username : ", data_of_user[0].username);

        user_id_answer = data_of_user[0]._id;
        console.log("displayed 35 user_id_answer :  ", user_id_answer);
    
        console.log("before findbyIdandupdate 37 ");
        data_of_users.findByIdAndUpdate({ _id: user_id_answer }
            ,{ brief_description: req.query.brief_description }, function(err, result){
            console.log("inside findbyIDandUpdate - myprofilebriefdescriptionedit : ");
            if(err){
                res.send(err)
            }
            else{
                res.render('../views/pages/myprofilehome', { the_user_id : the_user_id ,
                                                    the_username : data_of_user[0].username }); //title: obj.email
                //res.send(result)
            }
        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }, (err) => next(err) )
    .catch( (err) => next(err) );
     
});

module.exports = myprofilebriefdescriptioneditRouter;
