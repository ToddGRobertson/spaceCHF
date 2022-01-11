const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');
const Users = require('../models/user');



const HFheartdatapostsfilterRouterpage1 = express.Router({mergeParams: true}); // define dishRouter as an express router

HFheartdatapostsfilterRouterpage1.use( bodyParser.json());
HFheartdatapostsfilterRouterpage1.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('HFheartdatapostsfilterRouterpage1.js - get - 14 Query title req.params.user_id => ' , req.params.user_id);
    console.log('HFheartdatapostsfilterRouterpage1.js - get - 14 Query title req.query => ' , req.query);
    console.log('HFheartdatapostsfilterRouterpage1.js - get - Query title req.query.keys => ' , req.query.keys);
    console.log('HFheartdatapostsfilterRouterpage1.js - get - 16 Query title req.query.activitiesafterdiagnosis => ' , req.query.activitiesafterdiagnosis);
    console.log('HFheartdatapostsfilterRouterpage1.js - get - Query title req.body => ' , req.body);
    console.log('HFheartdatapostsfilterRouterpage1.js - get - 18 Query title req.query => ' , req.query);
    //paginate
    let {page, size} = req.query;
    if( !page ){
        page = 1;
        console.log('HFheartdatapostsfilterRouterpage1.js - get 23 page -> ' + page);
    }
    if( !size){
        size = 100; //defaut docs per page
        console.log('HFheartdatapostsfilterRouterpage1.js - get 27 size -> ' + size);
    }
    //size should be a string value
    const limit = parseInt( size );
    const skip = ( page -1 )*limit; //page =1 skip 0 documents
                              //page = 2 skip 1*10 documents
    console.log('HFheartdatapostsfilterRouterpage1.js - 33 page -> ' + page );
    console.log('HFheartdatapostsfilterRouterpage1.js - 34 size -> ' + size );
    console.log('HFheartdatapostsfilterRouterpage1.js - 35 limit -> ' + limit );
    console.log('HFheartdatapostsfilterRouterpage1.js - 36 skip -> ' + skip );
    Heartdataposts.find({"category" : "heart_failure"}, {},  {limit : limit, skip : skip })  // from posts.js  .sort({ 'datepicker': -1 })
    .then( (heartdataposts) => { //dishes is in mongodb as a collection/database
        console.log("HFheartdatapostsfilterRouterpage1.js - get 41 - heartdataposts " + heartdataposts );
        console.log("HFheartdatapostsfilterRouterpage1.js - get 42 - heartdataposts[0] " + JSON.stringify(heartdataposts[0] ));
        //console.log("heartdatapostsRouter.js - get - JSON Parse -> " + JSON.stringify( JSON.parse(heartdataposts[0]) ));
        //------------------------
        //does something similar to extraction, just wanted to see it
        var string = '{"key1": "value", "key2": "value1", "Key3": [] }'; //{"key31":"value 31"}
        console.log("HFheartdatapostsfilterRouterpage1.js - get - 47 - JSON Parse(string) -> " + JSON.stringify( JSON.parse(string) ) );
        console.log("HFheartdatapostsfilterRouterpage1.js - get - 48 - string -> " + string );
        var obj = JSON.parse(string);
        console.log("HFheartdatapostsfilterRouterpage1.js - get - 50 - obj -> " +JSON.stringify(  obj ));
        var keysArray = Object.keys(obj);
        console.log("HFheartdatapostsfilterRouterpage1.js - get - 52 - keysArray -> " + keysArray );
        for (var i = 0; i < keysArray.length; i++) {
        var key = keysArray[i]; // here is "name" of object property
        var value = obj[key]; // here get value "by name" as it expected with objects
        console.log(key, value);
        }
        //------------------------
        // find username using data_of_users
        Data_of_users.find({'user_id' : req.params.user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            //console.log("displayed data_of_users[0] : ", data_of_user[0]);
            console.log("63 displayed data_of_users[0]._id : ", data_of_user[0]._id);
            console.log("64 displayed data_of_users[0].username : ", data_of_user[0].username);
            
            //find email from Users
            Users.find({'_id' : req.params.user_id })  // from posts.js
            .then( (user) => { //dishes is in mongodb as a collection/database
                console.log("70 displayed users[0].email : ", user[0].email);
                // yyyy-mm-dd
                console.log("73 - date now => " + new Date().toISOString().slice(0, 10));
                res.render('../views/pages/HFheartdatapostsfilterpage1', { title: heartdataposts,
                                                                       the_date : new Date().toISOString().slice(0, 10),
                                                                       the_user_id : req.params.user_id,
                                                                       the_email : user[0].email,
                                                                       the_username : data_of_user[0].username }); 
            }, (err) => next(err) )
            .catch( (err) => next(err) );
        }, (err) => next(err) )
        .catch( (err) => next(err) );
        
        //res.statusCode = 200;
        //res.setHeader('Content-Type', 'application/json');  // looking for json string
        /* GET Hello World page. */

        //res.json( responses);  //return json string in res
        //console.log('responsesRouter.js - Query title req.query.fname => ' , req.query.fname);
        //res.redirect('/'); //home
    }, (err) => next(err) )
    .catch( (err) => next(err) );

});

module.exports = HFheartdatapostsfilterRouterpage1;
