const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

const Heartdatas = require('../models/heartdatas');
const Data_of_users = require('../models/data_of_users');
const Users = require('../models/user');

const HFheartdataposts_htmlRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

HFheartdataposts_htmlRouter.use( bodyParser.json());
console.log('HFheartdataposts_htmlRouter.js - 14');
HFheartdataposts_htmlRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('HFheartdataposts_htmlRouter.js - 17 req.params.user_id => ' , req.params.user_id );
    //find username
    Data_of_users.find({'user_id' : req.params.user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        //console.log("HFheartdataposts_htmlRouter 19 displayed data_of_users[0] : ", data_of_user[0]);
        console.log("HFheartdataposts_htmlRouter displayed data_of_users[0]._id : ", data_of_user[0]._id);
        console.log("HFheartdataposts_htmlRouter 21 displayed data_of_users[0].username : ", data_of_user[0].username);

        //need email address for HFheartdataposts_html
        Users.find({'_id' : req.params.user_id })  // from posts.js
        .then( (user) => { //dishes is in mongodb as a collection/database
            console.log("HFheartdataposts_htmlRouter 28 displayed data_of_users[0] : ", user[0].email);
            res.render('../views/pages/HFheartdataposts_html', {  the_user_id  :   req.params.user_id,
                                                                  the_username :   data_of_user[0].username,
                                                                  the_user_email : user[0].email  });
                                                                
        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }, (err) => next(err) )
    .catch( (err) => next(err) );

    
    //res.redirect('HFheartdatapost.html' , { title: heartdataposts });
    //res.statusCode = 200;
    //res.setHeader('Content-Type', 'application/json');  // looking for json string
    /* GET Hello World page. */

    //res.json( responses);  //return json string in res
    //console.log('responsesRouter.js - Query title req.query.fname => ' , req.query.fname);
    //res.redirect('/'); //home

});

module.exports = HFheartdataposts_htmlRouter;