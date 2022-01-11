const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

//const Heartdataposts = require('../models/heartdataposts');
const Users = require('../models/user');
const data_of_users = require('../models/data_of_users');

const loginRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

loginRouter.use( bodyParser.json());
//handle get request to server all dishes



loginRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    
    
    
    console.log("loginRouter.js - User logged in");
    Users.find({})
    .then( (users) => { //dishes is in mongodb as a collection/database
        console.log('loginRouter.js - /:get 20 Query title req.query -> ' + JSON.stringify( req.query ));
        console.log('loginRouter.js - /:get 21 Query title users[0] -> ' + users[0] );
        console.log('loginRouter.js - /:get 22 Query title users.length -> ' + users.length );
        // matching address has to be inside for routing from password.js
        matching_email_address = false;
        for( i = 0; i < users.length ; i++){
            
            console.log('loginRouter.js - /:get 25 found entry matching_email_address --> ' + matching_email_address );
            if( matching_email_address == false ){
                var temp = req.query;
                //sessionStorage.setItem( 'email' , temp.email ); 
                //console.log('loginRouter.js - /:get 24 found entry essionStorage.getItem( email) -> ' + sessionStorage.getItem( 'email') );
                console.log('loginRouter.js - /:get 27 found entry temp.email -> ' + temp.email );
                console.log('loginRouter.js - /:get 27 found entry temp.password -> ' + temp.password );
                console.log('loginRouter.js - /:get 28 found entry users[' + i + '].email -> ' + users[i].email );
                let str1 = temp.email;
                let str2 = users[i].email;
                console.log('loginRouter.js - /:get 31 str1.localeCompare(str2) -> ' + str1.localeCompare(str2) );
                // check if email is empty
                if(  temp.email == ''){
                    res.send('<script>alert("Email box is blank.  Please fill in the email box")</script>') ;
                }else if( temp.password == ''){
                    res.send('<script>alert("Password box is blank.  Please fill in the password box")</script>') ;
                }else{
                    // compare str1 to str2 to see if there is a database match
                    if( str1.localeCompare(str2) == 0  && matching_email_address == false ){
                        console.log("loginRouter.js - -------------------------------------------------");
                        console.log('loginRouter.js - /:get 34 found entry user[' + i + '] -> ' + users[i] );
                        var temp_id = users[i]._id; // store id to pass to /home later
                        console.log('loginRouter.js - /:get 35 found entry i -> ' + i );
                        matching_email_address = true;
                        console.log('loginRouter.js - /:get 37 found entry matching_email_address -> ' + matching_email_address );
                        // found matching email address send a message
                        temp_json = '{ "email" : ' + '"' + temp.email + '"' + ' }';
                        console.log("loginRouter.js - /:get 40 temp_json->" + temp_json );
                        obj = JSON.parse( temp_json);
                        console.log("loginRouter.js - /:get 42 obj->" + JSON.stringify( obj) );
                        console.log("loginRouter.js - /:get 43 obj.email->" + obj.email );
                        console.log('loginRouter.js - /:get 44 users[' + i + '].username ->' + users[i].username );
                        let the_username = users[i].username ;
                        /*
                        //-----------------------------------------
                        // set up sessions for online user
                        const online_user = {
                            name : the_username,
                            email: obj.email
                        };
                        //set up session
                        req.session.user = online_user;
                        req.session.save();
                        //--------------------------------------
                        */
                        console.log('loginRouter.js - /:get 45 the_username ->' + the_username );
                        // - cookies ------------------------
                        // saving the data to the cookies
                        //res.cookie("email", obj.email);
                        //res.cookie("username", the_username );

                        //retrieve cookies that were saved and format them
                        //let Cookies = JSON.stringify(req.cookies)
                        //console.log("loginRouter.js - /:get 53 Cookies->" + Cookies);
                        //obj_cookies = JSON.parse( Cookies);
                        
                        //console.log("loginRouter.js - /:get 56 obj_cookies.email ->" + JSON.stringify( obj_cookies.email ));
                        //console.log("loginRouter.js - /:get 57 obj_cookies.username ->" + JSON.stringify( obj_cookies.username ));
                        //-- cookies ------------------------
                        console.log("loginRouter.js - ----------------74 users.length ->" + users.length );
                        console.log("loginRouter.js - ----------------75 - temp_id ->" + temp_id );

                        //-------------------------------------------------------------------------------
                        // turn data_of_users online to true
                        data_of_users.find({'user_id' : temp_id })  // from posts.js
                        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
                            console.log("loginRouter.js - inside data_of_users.find - 99 - temp_id ->" + temp_id );
                            console.log("loginRouter.js - inside data_of_users.find - 99 - data_of_user[0]._id ->" + data_of_user[0]._id );
                            console.log("loginRouter.js - inside data_of_users.find - 100 - data_of_user[0].username ->" + data_of_user[0].username );

                            //now that we have the _id field, update online to true
                            data_of_users.findByIdAndUpdate({ _id: data_of_user[0]._id }
                                ,{ online : true }, function(err, result){
                                console.log("inside findbyIDandUpdate - loginRouter 106 :  temp_id -> " + temp_id );
                                console.log("inside findbyIDandUpdate - loginRouter 107 :  data_of_user[0].online -> " + data_of_user[0].online );
                                /*
                                if(err){
                                    res.send(err)
                                }
                                else{
                                    res.send(result)
                                }
                                */
                                res.render('../views/pages/myprofilehome', { the_user_id : temp_id,
                                                                             the_username : data_of_user[0].username  }); //title: obj.email
                                //res.render('../views/pages/myprofilehome', { the_user_id : temp_id  }); //title: obj.email
                                //res.render('menu', { users : users.length }); //title: obj.email
                            }, (err) => next(err) )
                            .catch( (err) => next(err) );

                        }, (err) => next(err) )
                        .catch( (err) => next(err) );

                        
                    }else{
                        //--------------------------------------------------------------------------------------
                        if( temp.username == '' || temp.email == '' || temp.the_password == ''){  //is empty
                            console.log('loginRouter.js - req.query  46 IS empty=> ');
                            res.send('<script>alert("email an password selections are blank.  Please go back and fill in the boxes")</script>') ;
                            //res.render('index.html', { title: users });
                        }else{
                            // if reached end of file
                            console.log('loginRouter.js - req.query  53 no matches ');
                            if(  i == (users.length - 1) ){
                                res.send('<script>alert("email is not in database.  Please register using New User")</script>') ;
                            }
                        
                        }


                    }
                }
                
            }
            
        }
        
        //res.redirect('/'); //home
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    
     
     

    
    
});


module.exports = loginRouter;