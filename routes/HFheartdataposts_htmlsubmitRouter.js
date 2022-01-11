const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');
const Users = require('../models/user');

const HFheartdataposts_htmlsubmitRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

HFheartdataposts_htmlsubmitRouter.use( bodyParser.json());
console.log('HFheartdataposts_htmlsubmitRouter.js - 14');
HFheartdataposts_htmlsubmitRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('HFheartdataposts_htmlsubmitRouter.js - 17 req.query => ' , req.query);
    console.log('HFheartdataposts_htmlsubmitRouter.js - 17 req.query.user_id => ' , req.query.user_id);
    //Heartdatas.create a record
    Heartdataposts.create( req.query )  //req.body
    .then( (heartdataposts) => {
        console.log('Heartdataposts created');
        // find username and user Id
        Data_of_users.find({'user_id' : req.query.user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            console.log("HFheartdataposts_htmlsubmitRouter 25 displayed data_of_user[0] : ", data_of_user[0]);
            console.log("HFheartdataposts_htmlsubmitRouter displayed data_of_user[0]._id : ", data_of_user[0]._id);
            console.log("HFheartdataposts_htmlsubmitRouter 27 displayed data_of_user[0]._id : ", data_of_user[0]._id);
            console.log("HFheartdataposts_htmlsubmitRouter 28 displayed data_of_user[0].username : ", data_of_user[0].username);
            //find all Heartdataposts so we can display them
            Heartdataposts.find({'category' : 'heart_failure' })  // from posts.js
            .then( (heartdataposts) => { //dishes is in mongodb as a collection/database
                console.log("HFheartdataposts_htmlsubmitRouter 28 displayed heartdataposts.length : ", heartdataposts.length);
                console.log("HFheartdataposts_htmlsubmitRouter 28 displayed heartdataposts[0] : ", heartdataposts[0]);
                res.render('../views/pages/HFheartdataposts', { the_user_id : req.query.user_id ,
                    the_username : data_of_user[0].username,
                    title : heartdataposts }); 
            }, (err) => next(err) )
            .catch( (err) => next(err) );
        

        }, (err) => next(err) )
        .catch( (err) => next(err) );

        
        //res.statusCode = 200;
        //res.set('Content-Type', 'text/html');
        //res.setHeader('Content-Type', 'text/plain');
        //res.setHeader('Content-Type', 'application/json');  // looking for json string
        //res.render(  heartdatas );
        //res.json( heartdataposts);  //return json string in res
        //console.log('heartdataRouter.js - get - not null - Query title req.query.activitiesafterdiagnosis => ' , req.query.activitiesafterdiagnosis);
        
    }, (err) => next(err) )
    .catch( (err) => next(err) );
});

module.exports = HFheartdataposts_htmlsubmitRouter;