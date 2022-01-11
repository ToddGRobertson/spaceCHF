const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

const Heartdataposts = require('../models/heartdataposts');

const HFheartdatapostsfilterRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

HFheartdatapostsfilterRouter.use( bodyParser.json());
HFheartdatapostsfilterRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('HFheartdatapostsfilterRouter.js - get - 14 Query title req.query => ' , req.query);
    console.log('HFheartdatapostsfilterRouter.js - get - Query title req.query.keys => ' , req.query.keys);
    console.log('HFheartdatapostsfilterRouter.js - get - 16 Query title req.query.activitiesafterdiagnosis => ' , req.query.activitiesafterdiagnosis);
    console.log('HFheartdatapostsfilterRouter.js - get - Query title req.body => ' , req.body);
    console.log('HFheartdatapostsfilterRouter.js - get - 18 Query title req.query => ' , req.query);
    Heartdataposts.find({"category" : "heart_failure"}).lean()  // from posts.js
    .then( (heartdataposts) => { //dishes is in mongodb as a collection/database
        console.log("HFheartdatapostsfilterRouter.js - get 21 - heartdataposts " + heartdataposts );
        console.log("HFheartdatapostsfilterRouter.js - get 21 - heartdataposts[0] " + JSON.stringify(heartdataposts[0] ));
        //console.log("heartdatapostsRouter.js - get - JSON Parse -> " + JSON.stringify( JSON.parse(heartdataposts[0]) ));
        //------------------------
        //does something similar to extraction, just wanted to see it
        var string = '{"key1": "value", "key2": "value1", "Key3": [] }'; //{"key31":"value 31"}
        console.log("HFheartdatapostsfilterRouter.js - get - 27 - JSON Parse(string) -> " + JSON.stringify( JSON.parse(string) ) );
        console.log("HFheartdatapostsfilterRouter.js - get - 28 - string -> " + string );
        var obj = JSON.parse(string);
        console.log("HFheartdatapostsfilterRouter.js - get - 30 - obj -> " +JSON.stringify(  obj ));
        var keysArray = Object.keys(obj);
        console.log("HFheartdatapostsfilterRouter.js - get - 32 - keysArray -> " + keysArray );
        for (var i = 0; i < keysArray.length; i++) {
        var key = keysArray[i]; // here is "name" of object property
        var value = obj[key]; // here get value "by name" as it expected with objects
        console.log(key, value);
        }
        //------------------------
        res.render('HFheartdatapostsfilter', { title: heartdataposts });
        //res.statusCode = 200;
        //res.setHeader('Content-Type', 'application/json');  // looking for json string
        /* GET Hello World page. */

        //res.json( responses);  //return json string in res
        //console.log('responsesRouter.js - Query title req.query.fname => ' , req.query.fname);
        //res.redirect('/'); //home
    }, (err) => next(err) )
    .catch( (err) => next(err) );

});

module.exports = HFheartdatapostsfilterRouter;
