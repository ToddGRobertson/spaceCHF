const express = require('express');
const bodyParser = require('body-parser');

//need to connect to db
const mongoose = require('mongoose');

const Heartdataposts = require('../models/heartdataposts');
const Data_of_users = require('../models/data_of_users');

const HFheartdatapostsRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

HFheartdatapostsRouter.use( bodyParser.json());
console.log("inside 12  HFheartdatapostsRouter ");

//handle get request to server all dishes
HFheartdatapostsRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {
    console.log('heartdatapostsRouter.js - get - 17 Query title req.params.user_id => ' , req.params.user_id);
    if( req.params.user_id != undefined ){  //someone is signed in
        const the_user_id = req.params.user_id;
        console.log('heartdatapostsRouter.js - get - 19 Query title the_user_id => ' , the_user_id);

        Data_of_users.find({'user_id' : the_user_id })  // from posts.js
        .then( (data_of_user) => { //dishes is in mongodb as a collection/database
            //console.log("heartdatapostsRouter 24 data_of_users[0] : ", data_of_user[0]);
            console.log("heartdatapostsRouter the_user_id : ", the_user_id);
            console.log("heartdatapostsRouter 26 data_of_users[0].username : ", data_of_user[0].username);

            Heartdataposts.find({'category' : 'heart_failure'})  // from posts.js
            .then( (heartdataposts) => { //dishes is in mongodb as a collection/database
                console.log("heartdatapostsRouter.js - 30 get - Todd" + heartdataposts );
                console.log("heartdatapostsRouter.js - 31 get - the_user_id -> " + the_user_id );

                //find username using data_of_user
                

                res.render('../views/pages/HFheartdataposts', { title: heartdataposts,
                                                                the_user_id : the_user_id ,
                                                                the_username : data_of_user[0].username });
                //res.statusCode = 200;
                //res.setHeader('Content-Type', 'application/json');  // looking for json string
                /* GET Hello World page. */
        
                //res.json( responses);  //return json string in res
                //console.log('responsesRouter.js - Query title req.query.fname => ' , req.query.fname);
                //res.redirect('/'); //home
            }, (err) => next(err) )
            .catch( (err) => next(err) );

            //res.render('../views/pages/myprofilebriefdescription', { the_user_id : the_user_id,
            //                                                        the_username : data_of_user[0].username  }); //title: obj.email 
        }, (err) => next(err) )
        .catch( (err) => next(err) );

    }else{   //someone is browsing
        Heartdataposts.find({'category' : 'heart_failure'})  // from posts.js
        .then( (heartdataposts) => { //dishes is in mongodb as a collection/database
            console.log("heartdatapostsRouter.js - 30 get - Todd" + heartdataposts );
            //console.log("heartdatapostsRouter.js - 31 get - the_user_id -> " + the_user_id );

            //find username using data_of_user
            
            res.render('../views/pages/HFheartdataposts_no_user_id', { title: heartdataposts});
           
        }, (err) => next(err) )
        .catch( (err) => next(err) );
        
    }
    

    /*
    if( JSON.stringify(req.query) === '{}' ){  //is empty//in postman none button selected before send

        

    }else{
        console.log('heartdatapostsRouter.js - get - not null - req.query  not null ');
        console.log('heartdatapostsRouter.js - get - not null - req.query  -> ', req.query );
        //Heartdatas.create
        Heartdataposts.create( req.query )  //req.body
        .then( (heartdataposts) => {
            console.log('Heartdataposts created');
            res.statusCode = 200;
            //res.set('Content-Type', 'text/html');
            //res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Content-Type', 'application/json');  // looking for json string
            //res.render(  heartdatas );
            res.json( heartdataposts);  //return json string in res
            //console.log('heartdataRouter.js - get - not null - Query title req.query.activitiesafterdiagnosis => ' , req.query.activitiesafterdiagnosis);
            //res.redirect('/helloworld'); //home
        }, (err) => next(err) )
        .catch( (err) => next(err) );
        

    }

    */

    

})
.post((req,res, next) => {
    //in postman none button selected before send
    console.log('HFheartdatapostsrouter.js - /:post 87 Query title req.params.user_id => ' , req.params.user_id);
    console.log('HFheartdatapostsrouter.js - /:post Query title req.query=> ' , req.query);
    console.log('HFheartdatapostsrouter.js - /:post 89 Query title req.body=> ' , JSON.stringify( req.body ));
    let temp = req.query;
    console.log('HFheartdatapostsrouter.js - /:post 91 Query title temp => ' , JSON.stringify( temp ));
    console.log('HFheartdatapostsrouter.js - /:post Query title temp.category => ' , temp.category );
    console.log('HFheartdatapostsrouter.js - /:post 93 Query title temp.replys_author => ' , temp.replys_author );
    console.log('HFheartdatapostsrouter.js - /:post Query title temp.datepicker => ' , temp.datepicker );
    console.log('HFheartdatapostsrouter.js - /:post 95 Query title temp.replys => ' , temp.replys );
    let new_str_temp_email = temp.email
    let new_str_temp_replys = temp.replys;
    let new_str_second_temp_replys_subject= temp.replys_subject;
    let new_str_third = temp.comment;

    //let str = new_str.replace("'","\'");
    console.log("\n new_str_temp_email before -> 80 " + new_str_temp_email);
    console.log("\n new_str_temp_replys before -> 81 " + new_str_temp_replys);
    console.log("\n new_str_second_temp_replys_subject before -> 84 " + new_str_second_temp_replys_subject);
    // remove apostrophe from replys_subject
    let new_str_second_temp_replys_subject_remove_apostrophe = new_str_second_temp_replys_subject.replace(/'/g, "");
    // remove double quote from the replys_subject
    let new_str_second_temp_replys_subject_remove_apostrophe_remove_double_quote = new_str_second_temp_replys_subject_remove_apostrophe.replace(/"/g, "");
    // define str_second for use later
    let str_second = new_str_second_temp_replys_subject_remove_apostrophe_remove_double_quote;
    //---------------------------------------------
    console.log("\n str_second after ->  92 " + str_second);
    // remove apostrophe from the replys
    let str_temp_replys_remove_apostrophe= new_str_temp_replys.replace(/'/g, "");
    // remove double quote from the replys
    let str_temp_replys = str_temp_replys_remove_apostrophe.replace(/"/g, "");

    console.log("\n  str_temp_replys After ->  98 " + str_temp_replys);
    //remove blanks
    let str_temp_replys_II = str_temp_replys.replace(/(\s\s)+/g, '') //HimynameisFlavio
    console.log("\n  str_temp_replys_II After ->  101 " + str_temp_replys_II);
    //remove \n
    let str_temp_replys_III = str_temp_replys_II.replace(/\n+/g, '') //HimynameisFlavio
    console.log("\n  str_temp_replys_III After ->  104 " + str_temp_replys_III);
    //let str_second = new_str_second.replace("'", "\'");

    //----------------------------------------------
    let str1 = "Mr Blue has a blue house and a blue car";
    let result = str1.replace(/blue/g, "red"); 
    console.log("\n result -> " +  result );
    //----------------------------------------------
    console.log("\n new_str_third before -> 100 " + new_str_third);
    let str_third = new_str_third.replace(/'/g, "");
    console.log("\n str_third after -> 95  " + str_third);
    let second_str= ""; //initialize

    //building a functioning JSON string
    if( str_third == ''){
        console.log('HFheartdatapostsrouter.js - /:post  107 str_third is null');
        second_str = '{ "author" : ' + '"' + temp.replys_author + '"' +
                    ', "email" :   ' + '"' + temp.email     + '"' +
                    ', "category" : ' + '"' + temp.category + '"' +
                    ', "datepicker" : ' + '"' + temp.datepicker + '"' +
                    ', "replys_subject" : ' + '"' + str_second + '"' + 
                    ', "replys" : ' + '"' + str_temp_replys_III  + '"' + 
                    ', "comment" : [' + '] } ';
    }else{
        second_str = '{ "author" : ' +  '"' + temp.replys_author + '"' +
                     ', "email" :   ' + '"' + temp.email     + '"' +
                     ', "category" : ' + '"' + temp.category + '"' +
                     ' "datepicker" : ' + '"' + temp.datepicker + '"'  +
                     ' "replys_subject" : ' + '"' + str_second + '"' + 
                     ', "replys" : ' + '"' + str_temp_replys_III  + '"' + 
                     ', "comment" : [' + '"' + str_third + '"'  + ']}';
    }
    
    console.log('HFheartdatapostsrouter.js - /:post pre parse - Query title second_str  => 124' , second_str );
    var obj = JSON.parse(second_str);
    console.log('HFheartdatapostsrouter.js - /:post parse Query title obj  => 126 ' , obj);
    var keysArray = Object.keys(obj);
    console.log("HFheartdatapostsrouter.js - get - keysArray 128 -> " + keysArray );
    //need obj for to create it
    //check for blank input
    if(  temp.replys_subject == ''){
        res.send('<script>alert("Heart failure subject box is blank.  Please fill in the subject box")</script>') ;
    }else if(  temp.replys == ''){
        res.send('<script>alert("Your heart failure question or statement is blank.  Please fill in the  box")</script>') ;
    }else{
        Heartdataposts.create( obj  )  //heartdataposts is the model
        .then( (heartdataposts) => { //heartdataposts is in mongodb as a collection/database
            console.log("HFheartdatapostsrouter.js - Heartdataposts created 132 " + heartdataposts);
            //res.render('responses', { title: responses });
            ///////res.statusCode = 200;
            //res.setHeader('Content-Type', 'application/json');  // looking for json string
            /* GET Hello World page. */

            /////res.json( heartdataposts);  //return json string in res
            //---------------------------------------------------------------------------------
            //the heartdatapost is created, now display it
            Heartdataposts.find({'category' : 'heart_failure'})  // from posts.js
            .then( (heartdataposts) => { //dishes is in mongodb as a collection/database
                console.log("HFheartdatapostsrouter.js - get - 143 Todd" + heartdataposts );
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
                console.log('HFheartdatapostsrouter.js /:commentId 165');
                let mailOptions = {
                    from : 'herokugroupheartdisease@gmail.com', //sender address
                    to : 'trobert612t@netscape.net', //list of recipients
                    subject : 'From supportgroupheartdisease ' + `${req.body.datepicker}` + '- new heart failure post' + ' from ' + `${req.body.replys_author}`,  //subject line
                    text : `${req.body.replys}`, //'Hello World', //subject body
                    html: `${req.body.replys}` //'<b>Hello World </b>?'
                };
                console.log("HFheartdatapostsrouter.js - 169  - after mail options");

                transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("HFheartdatapostsrouter.js - 175 - sent email");
                }); 
                //------------------------------------------------------------------
                res.render('HFheartdataposts', { title: heartdataposts });
                //res.statusCode = 200;
                //res.setHeader('Content-Type', 'application/json');  // looking for json string
                /* GET Hello World page. */
        
                //res.json( responses);  //return json string in res
                //console.log('responsesRouter.js - Query title req.query.fname => ' , req.query.fname);
                //res.redirect('/'); //home
            }, (err) => next(err) )
            .catch( (err) => next(err) );
            //-----------------------------------------------------------------------------------
            //console.log('responsesRouter.js - Query title req.query.fname => ' , req.query.fname);
            //res.redirect('/'); //home
        }, (err) => next(err) )
        .catch( (err) => next(err) );
    }
    

});

console.log("heartdatapostsrouter.js - just before post ");
HFheartdatapostsRouter.route('/:postId')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.post((req,res, next) => {
    //in postman none button selected before send
    console.log('heartdatapostsrouter.js - /:postId Query title req.params.postId => ' , req.params.postId);
    console.log('heartdatapostsrouter.js - /:postId Query title req.query=> ' , req.query);
    console.log('heartdatapostsrouter.js - /:postId Query title req.body=> ' , JSON.stringify( req.body ));
    Heartdataposts.create( req.body)
    .then( (heartdataposts) => { //dishes is in mongodb as a collection/database
        console.log("heartdatapostsrouter.js - Todd" + post );
        //res.render('responses', { title: responses });
        res.statusCode = 200;
        //res.setHeader('Content-Type', 'application/json');  // looking for json string
        /* GET Hello World page. */

        res.json( heartdataposts);  //return json string in res
        //console.log('responsesRouter.js - Query title req.query.fname => ' , req.query.fname);
        //res.redirect('/'); //home
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    /*if( req.params.dishId != null){
        res.end('will send details of the dish: ' + req.params.dishId + ' to you!');
    }else{  //if /dishes execute this
        res.end('will send all the dishes to you');
    }*/
    

});

HFheartdatapostsRouter.route('/:commentId/comments') 
.post((req,res,next) => {
    console.log( "heartdatapostsRouter - post req.params.commentId -> "+ req.params.commentId);
    Heartdataposts.findById( req.params.commentId)
    .then( (heartdatapost) => {
        if( heartdatapost != null){
            //dish may not exist.   Build it, save it and return it
            console.log( "heartdatapostsRouter - post req.body -> "+ req.body );
            heartdatapost.comments.push(req.body);
            heartdatapost.save()
            .then(( heartdatapost) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');  // looking for json string
                res.json(heartdatapost);
            }, (err ) => next(err));
            //res.json( dish.comments);  //return json string in res

        }
        else{ //dish doesn't exist
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404; //not found
            return next(err);
        }
    }, (err) => next(err) )
    .catch( (err) => next(err) );
    /*if( req.params.dishId != null){
        res.end('Post not supported on /dishes/'  + req.params.dishId )
    }else{
        res.end('Will add the dish: ' + req.body.name + ' with details -> ' + req.body.description );
    }*/
    
});


module.exports = HFheartdatapostsRouter;
