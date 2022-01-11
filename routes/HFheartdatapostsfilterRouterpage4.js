const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

const Heartdataposts = require('../models/heartdataposts');

const HFheartdatapostsfilterRouterpage4 = express.Router({mergeParams: true}); // define dishRouter as an express router

HFheartdatapostsfilterRouterpage4.use( bodyParser.json());
HFheartdatapostsfilterRouterpage4.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('HFheartdatapostsfilterRouterpage4.js - get - 14 Query title req.query => ' , req.query);
    console.log('HFheartdatapostsfilterRouterpage4.js - get - Query title req.query.keys => ' , req.query.keys);
    console.log('HFheartdatapostsfilterRouterpage4.js - get - 16 Query title req.query.activitiesafterdiagnosis => ' , req.query.activitiesafterdiagnosis);
    console.log('HFheartdatapostsfilterRouterpage4.js - get - Query title req.body => ' , req.body);
    console.log('HFheartdatapostsfilterRouterpage4.js - get - 18 Query title req.query => ' , req.query);
    //paginate
    let {page, size} = req.query;
    if( !page ){
        page = 4;
        console.log('HFheartdatapostsfilterRouterpage4.js - get 23 page -> ' + page);
    }
    if( !size){
        size = 100; //defaut docs per page
        console.log('HFheartdatapostsfilterRouterpage4.js - get 27 size -> ' + size);
    }
    //size should be a string value
    const limit = parseInt( size );
    const skip = ( page -1 )*limit; //page =1 skip 0 documents
                              //page = 2 skip 1*10 documents
    console.log('HFheartdatapostsfilterRouterpage4.js - 33 page -> ' + page );
    console.log('HFheartdatapostsfilterRouterpage4.js - 34 size -> ' + size );
    console.log('HFheartdatapostsfilterRouterpage4.js - 35 limit -> ' + limit );
    console.log('HFheartdatapostsfilterRouterpage4.js - 36 skip -> ' + skip );
    Heartdataposts.find({"category" : "heart_failure"}, {},  {limit : limit, skip : skip }).sort({ 'datepicker': -1 })  // from posts.js
    .then( (heartdataposts) => { //dishes is in mongodb as a collection/database
        console.log("HFheartdatapostsfilterRouterpage4.js - get 21 - heartdataposts " + heartdataposts );
        console.log("HFheartdatapostsfilterRouterpage4.js - get 21 - heartdataposts[0] " + JSON.stringify(heartdataposts[0] ));
        //console.log("heartdatapostsRouter.js - get - JSON Parse -> " + JSON.stringify( JSON.parse(heartdataposts[0]) ));
        //------------------------
        //does something similar to extraction, just wanted to see it
        var string = '{"key1": "value", "key2": "value1", "Key3": [] }'; //{"key31":"value 31"}
        console.log("HFheartdatapostsfilterRouterpage4.js - get - 27 - JSON Parse(string) -> " + JSON.stringify( JSON.parse(string) ) );
        console.log("HFheartdatapostsfilterRouterpage4.js - get - 28 - string -> " + string );
        var obj = JSON.parse(string);
        console.log("HFheartdatapostsfilterRouterpage4.js - get - 30 - obj -> " +JSON.stringify(  obj ));
        var keysArray = Object.keys(obj);
        console.log("HFheartdatapostsfilterRouterpage4.js - get - 32 - keysArray -> " + keysArray );
        for (var i = 0; i < keysArray.length; i++) {
        var key = keysArray[i]; // here is "name" of object property
        var value = obj[key]; // here get value "by name" as it expected with objects
        console.log(key, value);
        }
        //------------------------
        res.render('HFheartdatapostsfilterpage4', { title: heartdataposts });
        //res.statusCode = 200;
        //res.setHeader('Content-Type', 'application/json');  // looking for json string
        /* GET Hello World page. */

        //res.json( responses);  //return json string in res
        //console.log('responsesRouter.js - Query title req.query.fname => ' , req.query.fname);
        //res.redirect('/'); //home
    }, (err) => next(err) )
    .catch( (err) => next(err) );

});

module.exports = HFheartdatapostsfilterRouterpage4;
