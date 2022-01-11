const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const data_of_users = require('../models/data_of_users');

const myprofilephotoRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofilephotoRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - 18 inside myprofilephotoRouter.js");
myprofilephotoRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside myprofilephotoRouter /:user_id - 21 req.params.user_id " + req.params.user_id);
    //console.log("GET '/' -inside myprofilephotoRouter /:user_id - 22 process.cwd() -> " + process.cwd() );
    if( req.params.user_id != undefined ){  //Someone signed into site
        const the_user_id_answer = req.params.user_id;
        console.log("inside myprofilephotoRouter - 24 - the_user_id_answer => " + the_user_id_answer)
        data_of_users.find({ 'user_id' : the_user_id_answer })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            //console.log("displayed 27 myprofilephotoRouter - data_of_users[0] : ", data_of_user[0]);
            console.log("displayed 28 myprofilephotoRouter - data_of_users[0]._id : ", data_of_user[0]._id);
            console.log("displayed 29 myprofilephotoRouter - data_of_users[0].username : ", data_of_user[0].username);
            console.log("displayed 29 myprofilephotoRouter - data_of_users[0].image : ", data_of_user[0].image);

            user_id_answer = data_of_user[0].user_id;
            console.log("displayed 32 myprofilephotoRouter - user_id_answer :  ", user_id_answer);
        
            console.log("before findbyIdandupdate 34 -data_of_user[0].image ");
            // find old photo , open file and remove file if no the default
            if( data_of_user[0].image == 'noPhoto-2q.jpg'  ){
                //do nothing to alter photo
                console.log("before findbyIdandupdate 39 - do not alter - photo is noPhoto-2q.jpg" );
                console.log("displayed 40 myprofilephotoRouter - user_id_answer :  ", user_id_answer);
                console.log("displayed 41 myprofilephotoRouter - data_of_users[0].username : ", data_of_user[0].username);
                //don't unlink default photo
                res.render('../views/pages/myprofilephoto', { the_user_id : user_id_answer , 
                    the_username : data_of_user[0].username }); //title: obj.email 
            }else{  //image of than 'noPhoto-2q.jpg.
                
                fs = require('fs');
                //try to read the file
                
                const path = '../ejs-demo_templates_spacechf/views/images/' + data_of_user[0].image;
                console.log("before findbyIdandupdate 41 - path " + path );
                
                fs.readFile(path  , 'utf8', function (err,data) {
                    console.log("before findbyIdandupdate 43 - path " + path  );
                    
                    if (err) {
                    return console.log(err);
                    }
                    
                    console.log("myprofilephotoRouter - 46 - photo exists");
                    console.log("myprofilephotoRouter - 48 - path ->" + path);
                    
                    try {
                        
                        console.log("myprofilephotoRouter - 51 - file will be removed");
                        
                        fs.unlinkSync(path);
                        console.log("myprofilephotoRouter - 51 - file has been removed");
                        res.render('../views/pages/myprofilephoto', { the_user_id : user_id_answer , 
                            the_username : data_of_user[0].username }); //title: obj.email 
                        //file removed
                        
                    } catch(err) {
                    console.error(err)
                    }
                    
                });
                
                // noPhoto-2q.jpg read, untouched
                res.render('../views/pages/myprofilephoto', { the_user_id : user_id_answer , 
                    the_username : data_of_user[0].username }); //title: obj.email 
            }


        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }else{
        res.render('../views/pages/register_user'); //someone is just browsing
    }
    
});


myprofilephotoRouter.route('/:user_id')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("GET '/:user_id inside myprofilephotoRouter /:user_id - 28 req.params.user_id " + req.params.user_id);
    console.log("GET '/:user_id inside myprofilephotoRouter /:user_id - 29 process.cwd() -> " + process.cwd() );
    const the_user_id = req.params.user_id.toString();
    console.log("GET '/:user_id inside myprofilephotoRouter - 35 - data_of_users => " + data_of_users);
    console.log("GET '/:user_id inside myprofilephotoRouter - 36 - the_user_id => " + the_user_id);
    data_of_users.find({ 'user_id' : the_user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("displayed 39 myprofilephotoRouter - data_of_users[0] : ", data_of_user[0]);
        console.log("displayed 40 myprofilephotoRouter - data_of_users[0]._id : ", data_of_user[0]._id);
        console.log("displayed 41 myprofilephotoRouter - data_of_users[0].username : ", data_of_user[0].username);

        user_id_answer = data_of_user[0]._id;
        console.log("displayed 44 myprofilephotoRouter - user_id_answer :  ", user_id_answer);
    
        console.log("before findbyIdandupdate 46 -myprofilephotoRouter ");
        res.render('../views/pages/myprofilephoto', { the_user_id : the_user_id , 
            the_username : data_of_user[0].username }); //title: obj.email 
    }, (err) => next(err) )
    .catch( (err) => next(err) );

           
        //res.redirect('/'); //home
});


module.exports = myprofilephotoRouter;
