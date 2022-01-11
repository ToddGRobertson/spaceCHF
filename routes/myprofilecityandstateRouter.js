const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const myprofilecityandstateRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilecityandstateRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside 18 myprofilecityandstateRouter.js");
myprofilecityandstateRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside 21 myprofilecityandstateRouter /");
    console.log("inside myprofilecityandstateRouter /:user_id - 22 req.params.user_id " + req.params.user_id);
    if( req.params.user_id == undefined ){  //someone is browsing
        res.render('../views/pages/register_user' ); 
    }else{   //some is signed in
        res.render('../views/pages/myprofilecityandstate'); //
    }
           
        //res.redirect('/'); //home
 

    
    
});

myprofilecityandstateRouter.route('/:user_id')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilecityandstateRouter /:user_id - 32 req.params.user_id " + req.params.user_id);
    //console.log("inside myprofilecityandstateRouter /:user_id - 33 process.cwd() -> " + process.cwd() );
    if( req.params.user_id != undefined ){  //someone is signed in
        const the_user_id = req.params.user_id;
        console.log("inside myprofilecityandstateRouter - 35 - the_user_id => " + the_user_id)
        Data_of_users.find({ 'user_id' : the_user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            console.log("myprofilecityandstateRouter 38 displayed data_of_users[0] : ", data_of_user[0]);
            console.log("myprofilecityandstateRouter 39 displayed data_of_users[0]._id : ", data_of_user[0]._id);
            console.log("myprofilecityandstateRouter 40 displayed data_of_users[0].username : ", data_of_user[0].username);

            user_id_answer = data_of_user[0]._id;
            console.log("displayed 42  user_id_answer :  ", user_id_answer);
            res.render('../views/pages/myprofilecityandstate', { the_user_id : the_user_id,
                                                                the_username : data_of_user[0].username  }); //title: obj.email  
        

        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }else{  //someone is browsing
        console.log("displayed 53  user is browsing :  ");
        res.render('../views/pages/myprofilelogin_no_user_id');
    }
    
          
        //res.redirect('/'); //home
 
    
});


module.exports = myprofilecityandstateRouter;
