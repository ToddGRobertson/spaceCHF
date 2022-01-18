const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');



//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
//const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');
const Messages = require('../models/messages');

const myprofiledeleteRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

myprofiledeleteRouter.use( bodyParser.json());
//handle get request to server all dishes
console.log("Todd - inside 18 myprofiledeleteRouter.js");
myprofiledeleteRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log("inside 21 myprofiledeleteRouter /");
    console.log("inside 22 myprofiledeleteRouter /:user_id - 22 req.params.user_id " + req.params.user_id);
    if( req.params.user_id == undefined ){  //someone is browsing
        //res.render('../views/pages/register_user' ); 
    }else{   //some is signed in
        //delete User JSON file for this user
        Data_of_users.find({'user_id' : req.params.user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            //console.log("displayed 29 data_of_users[0] : ", data_of_user[0]);
            console.log("myprofiledeleteRouter displayed 30 data_of_users[0]._id : ", data_of_user[0]._id);
            console.log("myprofiledeleteRouter displayed 30 data_of_users[0].image : ", data_of_user[0].image);
            console.log("myprofiledeleteRouter displayed 31 data_of_users[0].username : ", data_of_user[0].username);
            //if data_of_user[0].image != noPhoto-2q.jpg, delete it.
            if( data_of_user[0].image == 'noPhoto-2q.jpg'  ){
                //do nothing to alter photo
                console.log("myprofiledeleteRouter - 36 before findbyIdandupdate - do not alter - photo is noPhoto-2q.jpg" );
                console.log("myprofiledeleteRouter - 38 displayed myprofilephotoRouter - data_of_users[0].username : ", data_of_user[0].username);
                console.log("myprofiledeleteRouter - 39 displayed myprofilephotoRouter - photo was noPhoto-2q.jpg - not deleted");


                // need to complete this if photo is of the unknown to delete the rest of the stuff
                // remove data_of_user[0] entry
                //data_of_user[0]._id
                Data_of_users.findByIdAndDelete(data_of_user[0]._id, function (err, docs) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log("Deleted data_of_users JSON entry : ", docs);
                    }
                });
                // now remove the messages tables
                console.log("myprofiledeleteRouter - 84 req.params.user_id : ", req.params.user_id );
                Messages.find({'user_id' : req.params.user_id })  // from posts.js
                .then( (message) => { //messages is in mongodb as a collection/database
                    console.log("myprofiledeleteRouter - 87 message: ", message );
                    console.log("myprofiledeleteRouter - 88 message[0]._id: ", message[0]._id );
                    const message_id = message[0]._id;
                    Messages.findByIdAndDelete( message_id, function (err, docs) {
                        if (err){
                            console.log(err)
                        }
                        else{
                            console.log("myprofiledeleteRouter 97 Deleted messages JSON entry : ", docs);
                            console.log("myprofiledeleteRouter 98 Deleted messages req.params.user_id : ", req.params.user_id);
                            Users.find({'_id' : req.params.user_id })
                            .then( (user) => { //messages is in mongodb as a collection/database
                                
                                console.log("myprofiledeleteRouter - 101 user[0]._id: ", user[0]._id );
                                const user_id = user[0]._id;
                                Users.findByIdAndDelete( user_id , function (err, docs) {
                                    if (err){
                                        console.log(err)
                                    }
                                    else{
                                        console.log("Deleted 108 users JSON entry : ", docs);
                                        res.render('../views/pages/index');
                                    }
                                });
                            });
                        }
                    });
                    // now get read to delete users


                }, (err) => next(err) )
                .catch( (err) => next(err) );
            }else{
                //try to read the file
                fs = require('fs');
                //try to read the file

                const path = '../ejs-demo_templates_spacechf_iphone/views/images/' + data_of_user[0].image;
                console.log("myprofiledeleteRouter - 46 before findbyIdandupdate - path " + path );
                
                fs.readFile(path  , 'utf8', function (err,data) {
                    console.log("myprofiledeleteRouter - 49 before findbyIdandupdate - path " + path  );
                    
                    if (err) {
                    return console.log(err);
                    }
                    
                    console.log("myprofiledeleteRouter - 55 - photo exists");
                    console.log("myprofiledeleteRouter - 56 - path ->" + path);
                    
                    try {
                        
                        console.log("myprofiledeleteRouter - 60 - file will be removed");
                        
                        fs.unlinkSync(path);
                        console.log("myprofiledeleteRouter - 63 - file has been removed");
                        
                        //file removed
                        
                    } catch(err) {
                    console.error(err)
                    }
                    
                });
                // remove data_of_user[0] entry
                //data_of_user[0]._id
                Data_of_users.findByIdAndDelete(data_of_user[0]._id, function (err, docs) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log("Deleted data_of_users JSON entry : ", docs);
                    }
                });
                // now remove the messages tables
                console.log("myprofiledeleteRouter - 84 req.params.user_id : ", req.params.user_id );
                Messages.find({'user_id' : req.params.user_id })  // from posts.js
                .then( (message) => { //messages is in mongodb as a collection/database
                    console.log("myprofiledeleteRouter - 87 message: ", message );
                    console.log("myprofiledeleteRouter - 88 message[0]._id: ", message[0]._id );
                    const message_id = message[0]._id;
                    Messages.findByIdAndDelete( message_id, function (err, docs) {
                        if (err){
                            console.log(err)
                        }
                        else{
                            console.log("myprofiledeleteRouter 97 Deleted messages JSON entry : ", docs);
                            console.log("myprofiledeleteRouter 98 Deleted messages req.params.user_id : ", req.params.user_id);
                            Users.find({'_id' : req.params.user_id })
                            .then( (user) => { //messages is in mongodb as a collection/database
                                
                                console.log("myprofiledeleteRouter - 101 user[0]._id: ", user[0]._id );
                                const user_id = user[0]._id;
                                Users.findByIdAndDelete( user_id , function (err, docs) {
                                    if (err){
                                        console.log(err)
                                    }
                                    else{
                                        console.log("Deleted 108 users JSON entry : ", docs);
                                        res.render('../views/pages/index');
                                    }
                                });
                            });
                        }
                    });
                    // now get read to delete users


                }, (err) => next(err) )
                .catch( (err) => next(err) );
            }

            //res.render('../views/pages/myprofilebriefdescription', { the_user_id : the_user_id,
            //                                                        the_username : data_of_user[0].username  }); //title: obj.email 
        }, (err) => next(err) )
        .catch( (err) => next(err) );

        /*
        User.findByIdAndDelete(req.params.user_id, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Deleted : ", docs);
            }
        });   
        */

        //res.render('../views/pages/myprofilecityandstate'); //
    }
           
        //res.redirect('/'); //home
 

    
    
});


module.exports = myprofiledeleteRouter;
