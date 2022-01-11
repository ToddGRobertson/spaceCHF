const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const myprofilesearchRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilesearchRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("18 -------------------------------------------------------------------------------------------");
console.log("Todd - 19 inside myprofilesearchRouterpage1.js");


myprofilesearchRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilesearchRouterpage1   24 - /:user_id - req.params.user_id " + req.params.user_id);
    console.log("inside myprofilesearchRouterpage1 - 25 - /:user_id - process.cwd() -> " + process.cwd() );
    const the_user_id = req.params.user_id;
    console.log("inside myprofilesearchRouterpage1 - 26 - the_user_id => " + the_user_id);
    
    //paginate
    let {page, size} = req.query;
    if( !page ){
        page = 5;
        console.log('myprofilesearchRouterpage1.js - get 23 page -> ' + page);
    }
    if( !size){
        size = 100; //defaut docs per page
        console.log('myprofilesearchRouterpage1.js - get 27 size -> ' + size);
    }
    //size should be a string value
    const limit = parseInt( size );
    const skip = ( page -1 )*limit; //page =1 skip 0 documents
                              //page = 2 skip 1*10 documents
    console.log('myprofilesearchRouterpage1.js - 30 page -> ' + page );
    console.log('myprofilesearchRouterpage1.js - 30 size -> ' + size );
    console.log('myprofilesearchRouterpage1.js - 30 limit -> ' + limit );
    console.log('myprofilesearchRouterpage1.js - 30 skip -> ' + skip );



    Data_of_users.find({}, {} ,{limit : limit, skip : skip })
    .then( (data_of_users) => { //dishes is in mongodb as a collection/database
        console.log("inside V - 34 - data_of_users => " + data_of_users);
        /*
        console.log("inside myprofilesearchRouter - 35 - data_of_user[0].patient_or_caregiver => " + data_of_user[0].patient_or_caregiver );
        console.log("inside myprofilesearchRouter - 36 - data_of_user[0].illness => " + data_of_user[0].illness );
        console.log("inside myprofilesearchRouter - 37 - data_of_user[0].city => " + data_of_user[0].city );
        console.log("inside myprofilesearchRouter - 38 - data_of_user[0].state => " + data_of_user[0].state );
        console.log("inside myprofilesearchRouter - 39 - data_of_user[0].brief_description => " + data_of_user[0].brief_description );
        console.log("inside myprofilesearchRouter - 40 - data_of_user[0].detailed_description => " + data_of_user[0].detailed_description );
        */
        res.render('../views/pages/searchpage5', { the_user_id : the_user_id,
                                            the_data_of_users : data_of_users }); //title: obj.email 
                
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    
           
        //res.redirect('/'); //home
});


module.exports = myprofilesearchRouter;
