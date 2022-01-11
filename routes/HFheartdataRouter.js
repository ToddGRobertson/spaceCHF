const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

const Heartdatas = require('../models/heartdatas');
const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const HFheartdataRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

HFheartdataRouter.use( bodyParser.json());
console.log("HFheartdataRouter - 12");

HFheartdataRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    if( req.query.activitiesafterdiagnosis              == 'dont know' &&
        req.query.amountoftimesleepingafterdiagnosis    == 'dont know' &&
        req.query.amountoftimesleepingafterdiagnosis    == 'dont know' &&
        req.query.patientstoppedlivinglifefterdiagnosis == 'dont know' &&
        req.query.depressionafterdiagnosis              == 'dont know' &&
        req.query.seeingfamilyandfriendsafterdiagnosis  == 'dont know' &&
        req.query.bedriddenafterdiagnosis               == 'dont know' &&
        req.query.usingwalkercanewheelchairafterdiagnosis == 'dont know' &&
        req.query.dilatedleftventricle                    == 'dont know' &&
        req.query.takingmelatoninandconenzymeq10afterdiagnosis == 'dont know' &&
        req.query.nolongerdrivingafterdiagnosis                == 'dont know' &&
        req.query.nolongergoingoutsideafterdiagnosis           == 'dont know' &&
        req.query.stillusingacatheterbagafterdiagnosis         == 'dont know' &&
        req.query.patientwastoldtheyhadhowmuchtimetoliveafterdiagnosis == 'dont know' &&
        req.query.extratimethepatienthaslivedafterdiagnosis == 'dont know' &&
        req.query.patienthaspurplefeetwhenstandingafterdiagnosis == 'dont know' &&
        req.query.patientseeswolveschasinghimindreamsafterdiagnosis == 'dont know' &&
        req.query.patienthasstoppedlivingtheirlifeafterdiagnosis == 'dont know' ) {
    
        res.send('<script>alert("all selections are dont know.  Pleasee make a selection")</script>') ;
        //alert("Hello! I am an alert box!");
        res.redirect('/'); //home
    }
    console.log('heartdataRouter.js - get - Query 38 title req.query => ' , req.query);
    console.log('heartdataRouter.js - get - Query 39 title req.query.keys => ' , req.query.keys);
    console.log('heartdataRouter.js - get - Query 40 title req.query.activitiesafterdiagnosis => ' , req.query.activitiesafterdiagnosis);
    console.log('heartdataRouter.js - get - Query 41 title req.body => ' , req.body);
    //Heartdatas.find({})
    if( JSON.stringify(req.query) === '{}' ){  //is empty
        
        console.log('heartdataRouter.js - req.query 45  IS empty=> ');
        Heartdatas.find({})
        .then( (heartdatas) => {
            res.statusCode = 200;
            res.set('Content-Type', 'text/html');
            //res.setHeader('Content-Type', 'text/plain');
            //res.setHeader('Content-Type', 'application/json');  // looking for json string
            res.render( heartdatas );
            //res.json( heartdatas);  //return json string in res
            console.log('heartdataRouter.js - Query 54 title req.query.fname => ' , req.query.fname);
            res.redirect('/'); //home
        }, (err) => next(err) )
        .catch( (err) => next(err) );
    }else{
        console.log('heartdataRouter.js - get - 59 not null - req.query  not null=> ');
        //Heartdatas.create
        Heartdatas.create( req.query )  //req.body
        .then( (heartdatas) => {
            res.statusCode = 200;
            //res.set('Content-Type', 'text/html');
            //res.setHeader('Content-Type', 'text/plain');
            //-------------------------------------------------
            //send email
            var nodemailer = require('nodemailer');

            let transporter = nodemailer.createTransport({
            host : 'mail.savemysquashplantsfromborers.com',
            port : 2525,
            secure : false,
            auth: {
                user: '_mainaccount@savemysquashplantsfromborers.com',
                pass: '9i9ShWm7c6'
            },
            tls:{
                rejectUnauthorized : false //
            }
            });
            console.log('HFeartdataRouter.js /:commentId 82 req.query.user_id->' + req.query.user_id );
            let mailOptions = {
                from : 'spaceCHF', //sender address
                to : 'trobert612t@netscape.net', //list of recipients
                subject : 'From SpaceCHF - new questionnaire response ',  //subject line
                text : 'New Questionnaire response', //subject body
                html: '<b>Hello World </b>?'
            };
            console.log("HFeartdataRouter.js - 92 - after mail options");

            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log("HFeartdataRouter.js - 103 - sent email");
            }); 
            //------------------------------------------------------------------
            //res.setHeader('Content-Type', 'application/json');  // looking for json string
            //res.render(  heartdatas );
            //res.json( heartdatas);  //return json string in res
            //console.log('heartdataRouter.js - get - not null - Query title req.query.activitiesafterdiagnosis => ' , req.query.activitiesafterdiagnosis);
            //redirect back to menu
            // find data_of_users[0].username first
            Data_of_users.find({'user_id' : req.query.user_id })  // from posts.js
            .then( (data_of_user) => { //dishes is in mongodb as a collection/database
                //console.log("111 displayed data_of_users[0] : ", data_of_user[0]);
                console.log("112 displayed data_of_users[0]._id : ", data_of_user[0]._id);
                console.log("112 displayed data_of_users[0].user_id : ", data_of_user[0].user_id);
                console.log("114 displayed data_of_users[0].username : ", data_of_user[0].username);
                //find all heartdatas
                Heartdatas.find({ })  // from posts.js
                .then( (heartdatas) => { //dishes is in mongodb as a collection/database


                    res.render('../views/pages/HFheartdatas', { title : heartdatas,
                                                    the_user_id : data_of_user[0].user_id,
                                                    the_username : data_of_user[0].username  }); //home
                }, (err) => next(err) )
                .catch( (err) => next(err) );

            }, (err) => next(err) )
            .catch( (err) => next(err) );

        }, (err) => next(err) )
        .catch( (err) => next(err) );
        

    }

    
});

/*
heartdataRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('heartdataRouter.js - route / - Query title req.query => ' , req.query);
    console.log('heartdataRouter.js - route / - Query title req.body => ' , req.body);
    Heartdatas.create( req.body)
    .then( (heartdatas) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');  // looking for json string
        res.json( heartdatas);  //return json string in res
        console.log('heartdataRouter.js - route / - Query title req.query.activitiesafterdiagnosis => ' , req.query.activitiesafterdiagnosis);
        //res.redirect('/'); //home
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    /*if( req.params.dishId != null){
        res.end('will send details of the dish: ' + req.params.dishId + ' to you!');
    }else{  //if /dishes execute this
        res.end('will send all the dishes to you');
    }*/
    


HFheartdataRouter.route('/:activitiesafterdiagnosis')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('heartdataRouter.js - activitiesafterdiagnosis - Query title req.query => ' , req.query);
    console.log('heartdataRouter.js - activitiesafterdiagnosis - Query title req.body => ' , req.body);
    Heartdatas.create( req.body)
    .then( (heartdatas) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');  // looking for json string
        res.json( heartdatas);  //return json string in res
        console.log('heartdataRouter.js - activitiesafterdiagnosis -Query title req.query.activitiesafterdiagnosis => ' , req.query.activitiesafterdiagnosis);
        res.redirect('/'); //home
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    /*if( req.params.dishId != null){
        res.end('will send details of the dish: ' + req.params.dishId + ' to you!');
    }else{  //if /dishes execute this
        res.end('will send all the dishes to you');
    }*/
    

});
/*
.get( (req,res,next ) => {
    Dishes.findById( req.params.dishId )
    .then( (dish) => {
        console.log('Dish created');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');  // looking for json string
        res.json( dish);  //return json string in res
    }, (err) => next(err) )
    .catch( (err) => next(err) );
})
*/

module.exports = HFheartdataRouter; // export this dishRouter