const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');
//const Heartdataposts = require('../models/heartdataposts');
const user = require('../models/user');
const data_of_users = require('../models/data_of_users');

const myprofileeditcityandstateRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofileeditcityandstateRouter.use( bodyParser.json());
//handle get request to server all dishes

console.log('inside myprofileeditcityandstateRouter.js - /:post Todd myprofileeditcityandstateRouter ');
myprofileeditcityandstateRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req, res, next ) =>{ //'/myproflle',
    console.log("Todd -  inside myprofileeditcityandstateRouter 18 - get req.query ->" + JSON.stringify(req.query ));
    console.log("Todd -  inside myprofileeditcityandstateRouter 18 - get req.query.user_id ->" + JSON.stringify(req.query.user_id ));
    var user_id_answer;
    data_of_users.find({'user_id' : req.query.user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("displayed data_of_users[0]  22: ", data_of_user[0]);
        console.log("displayed data_of_users[0]  23 - req.query.user_id : ", req.query.user_id);
        console.log("displayed data_of_users[0]  24 - req.query.city : ", req.query.city);
        console.log("displayed data_of_users[0].user_id 25 ", data_of_user[0].user_id);
        console.log("displayed data_of_users[0]._id 26 ", data_of_user[0]._id);
        console.log("displayed data_of_users[0].city 27 ", data_of_user[0].city);
        console.log("displayed data_of_users[0].username 29 ", data_of_user[0].username);
        //we have a match on user_id
        // now update the record with city and state
        user_id_answer = data_of_user[0]._id;
        console.log("displayed 31 user_id_answer :  ", user_id_answer);
    
        console.log("before findbyIdandupdate 37 ");
        data_of_users.findByIdAndUpdate({ _id: user_id_answer }
            ,{city:req.query.city , state :req.query.state}, function(err, result){
            console.log("inside findbyIDandUpdate - myprofileeditcityandstate : ");
            if(err){
                res.send(err)
            }
            else{
                //res.send(result)
                res.render('../views/pages/myprofilehome', { the_user_id : req.query.user_id,
                                                    the_username : data_of_user[0].username }); //title: obj.email
            }
        }, (err) => next(err) )
        .catch( (err) => next(err) );   

    }, (err) => next(err) )
    .catch( (err) => next(err) );
})
//authenticate.verifyUser must be true to use put
//authenticate.verifyAdmin must be true too to use put

.post((req, res, next ) =>{ //'/myproflle',
    console.log("Todd -  inside myprofileeditcityandstateRouter 46 - post req.body ->" + JSON.stringify( req.body));
    console.log("Todd -  inside myprofileeditcityandstateRouter 47 - post req.query ->" + JSON.stringify(req.query ));
    console.log("Todd -  inside myprofileeditcityandstateRouter 48 - post req.params.user_id ->" + req.params.user_id);
    data_of_users.find({'user_id' : req.params.user_id })  // from posts.js
    .then( (data_of_users) => { //dishes is in mongodb as a collection/database
        console.log("displayed data_of_users : ", data_of_users);
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    /*
    data_of_users.findByIdAndUpdate(req.cookies['user_id'], {city : req.body.city },
                                                                        function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
            console.log("data_of_users has been updated");
            console.log("data_of_users post ->" + data_of_users);
            res.statusCode =  200;
            res.setHeader('Content-type', 'application/json');
            res.json(data_of_users);
        }
    });
    */
 
})

module.exports = myprofileeditcityandstateRouter;
