var express = require('express');
var app = express();
//start app using "node server.js"

//npm i multer  for uploading files
//npm i nodemailer for email
//npm i express express-session cookie-parser for sessions

//--------------------------------------------
//set up session stuff

const session = require('express-session');

/*
const cookieParser = require('cookie-parser');
*/

//----------------------------------------

var registerRouter = require('./routes/registerRouter');
var registerdisplaypageRouter = require('./routes/registerdisplaypageRouter');

var myprofileRouter     = require('./routes/myprofileRouter');
var myprofiletheirprofileRouter     = require('./routes/myprofiletheirprofileRouter');

var myprofilehomeRouter             = require('./routes/myprofilehomeRouter');



var myprofilesearchRouter     = require('./routes/myprofilesearchRouter');
var myprofileswhoisonlineRouterpage1     = require('./routes/myprofileswhoisonlineRouterpage1');
var myprofileswhoisonlineRouterpage2     = require('./routes/myprofileswhoisonlineRouterpage2');
var myprofileswhoisonlineRouterpage3     = require('./routes/myprofileswhoisonlineRouterpage3');
var myprofileswhoisonlineRouterpage4     = require('./routes/myprofileswhoisonlineRouterpage4');
var myprofileswhoisonlineRouterpage5     = require('./routes/myprofileswhoisonlineRouterpage5');
var myprofilesearchRouterpage1     = require('./routes/myprofilesearchRouterpage1');
var myprofilesearchRouterpage2     = require('./routes/myprofilesearchRouterpage2');
var myprofilesearchRouterpage3     = require('./routes/myprofilesearchRouterpage3');
var myprofilesearchRouterpage4     = require('./routes/myprofilesearchRouterpage4');
var myprofilesearchRouterpage5     = require('./routes/myprofilesearchRouterpage5'); 

var myprofilemenuRouter             = require('./routes/myprofilemenuRouter');
var myprofilemessagesRouter        = require('./routes/myprofilemessagesRouter');
var myprofilemessagedeleteRouter  = require('./routes/myprofilemessagedeleteRouter');
var myprofilereadmessageRouter    = require('./routes/myprofilereadmessageRouter');

var loginRouter                    = require('./routes/loginRouter');
var logindisplaypageRouter         = require('./routes/logindisplaypageRouter');
//var logoutRouter                   = require('./routes/logoutRouter');

var myprofilemessagetoreceiverRouter     = require('./routes/myprofilemessagetoreceiverRouter');
var myprofilemessageeditRouter           = require('./routes/myprofilemessageeditRouter');

var myprofilecityandstateRouter     = require('./routes/myprofilecityandstateRouter');
var myprofileeditcityandstateRouter = require('./routes/myprofileeditcityandstateRouter');

var myprofilephotoRouter     = require('./routes/myprofilephotoRouter');
//var myprofilephotouploadRouter     = require('./routes/myprofilephotouploadRouter');

var myprofilepatientorcaregiverRouter     = require('./routes/myprofilepatientorcaregiverRouter');
var myprofilepatientorcaregivereditRouter     = require('./routes/myprofilepatientorcaregivereditRouter');

var myprofilebriefdescriptionRouter = require('./routes/myprofilebriefdescriptionRouter');
var myprofilebriefdescriptioneditRouter = require('./routes/myprofilebriefdescriptioneditRouter');

var myprofiledetaileddescriptionRouter = require('./routes/myprofiledetaileddescriptionRouter');
var myprofiledetaileddescriptioneditRouter = require('./routes/myprofiledetaileddescriptioneditRouter');

//helloworld displays data
var HFhelloworldRouter   = require('./routes/HFquestionnaire_htmlRouter');
var HFheartdatapostsRouter            = require('./routes/HFheartdatapostsRouter'); //Someone signed in
var HFheartdatapostsRouter_no_user_id = require('./routes/HFheartdatapostsRouter_no_user_id'); //Someone browsing
var HFheartdatapostsfilterRouter = require('./routes/HFheartdatapostsfilterRouter');
var HFheartdatapostsfilterRouterpage1            = require('./routes/HFheartdatapostsfilterRouterpage1');
var HFheartdatapostsfilterRouterpage1_no_user_id = require('./routes/HFheartdatapostsfilterRouterpage1_no_user_id');
var HFheartdatapostsfilterRouterpage2 = require('./routes/HFheartdatapostsfilterRouterpage2');
var HFheartdatapostsfilterRouterpage3 = require('./routes/HFheartdatapostsfilterRouterpage3');
var HFheartdatapostsfilterRouterpage4 = require('./routes/HFheartdatapostsfilterRouterpage4');
var HFheartdatapostsfilterRouterpage5 = require('./routes/HFheartdatapostsfilterRouterpage5');
var HFheartdatapostscommentsRouter = require('./routes/HFheartdatapostscommentsRouter');

var HFheartdataposts_htmlRouter = require('./routes/HFheartdataposts_htmlRouter');
var HFheartdataposts_htmlsubmitRouter = require('./routes/HFheartdataposts_htmlsubmitRouter');
var HFheartdatapostsfilterRouterpage1  = require('./routes/HFheartdatapostsfilterRouterpage1');
var HFquestionnaire_htmlRouter =   require('./routes/HFquestionnaire_htmlRouter');
var HFheartdataRouter               =   require('./routes/HFheartdataRouter');

//establish connection with server
const connectDB = require('./DB/connection');

connectDB();

//installed
//npm install ejs@3.1.6
//npm install express@4.17.1
//npm i bootstrap
// set the view engine to ejs
//start using "node server.js"
app.set('view engine', 'ejs');



// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
        ];
        var tagline = "No programming concept is complete without a cute animal mascot.";
        
        res.render('pages/index', {
            mascots: mascots,
            tagline: tagline
          });
});

/*
//initialize cookieparser and session
app.use( cookieParser);
*/

app.use( session( {
    resave : true,
    saveUninitialized: true,
    secret: "46shagbark"
}));

//looks at who is online for sessions
app.get('/user', function(req,res ){
  return res.send( req.session.user);
});

//close a tab and destroy the session
app.get('/logout/:user_id', function(req , res){
    //req.session.destroy();
    const express = require('express');
    const bodyParser = require('body-parser');

    //need to connect to db
    const mongoose = require('mongoose');

    //const Heartdataposts = require('../models/heartdataposts');
    const Users = require('./models/user');
    const data_of_users = require('./models/data_of_users');

    console.log("logoutRouter.js - 114 User logging out req.params.user_id ->" + req.params.user_id );
    data_of_users.find({'user_id' : req.params.user_id })  // from posts.js
    .then( (data_of_user) => { //dishes is in mongodb as a collection/database
        console.log("logoutRouter.js - inside data_of_users.find - 117 -req.params.user_id ->" + req.params.user_id );
        console.log("logoutRouter.js - inside data_of_users.find - 118 - data_of_user[0]._id ->" + data_of_user[0]._id );

        var temp_id = data_of_user[0]._id ;
        console.log("logoutRouter.js - inside data_of_users.find - 121 - temp_id ->" + temp_id );
        //now that we have the _id field, update online to true
        data_of_users.findByIdAndUpdate({ _id: temp_id } //needs a variable not the data_of_user[]._id to do operation
            ,{ online : false }, function(err, result){
            console.log("inside findbyIDandUpdate - logoutRouter 125 :  data_of_user[0] -> " + data_of_user[0] );
            
            if(err){
                res.send(err)
            }
            else{
                res.render('../views/pages/index'); //title: obj.email
            }
            
           
            //res.render('../views/pages/myprofilehome', { the_user_id : temp_id  }); //title: obj.email
            //res.render('menu', { users : users.length }); //title: obj.email
        }, (err) => next(err) )
        .catch( (err) => next(err) );  //data_of_users.findByIdAndUpdate({ _id: data_of_user[0]._id }

    }, (err) => next(err) )
    .catch( (err) => next(err) );  //data_of_users.find({'user_id' : temp_id })  // from posts.js
    
});


// about register
app.get('/register_user', function(req, res) {
  res.render('pages/register_user');
});


// home page
/*
app.get('/home/:user_id', function(req, res) {
  console.log("Todd - app.js - get home - req.params.user_id => " + req.params.user_id );
  res.render('../../views/pages/myprofilehome/' + req.params.user_id);
});
*/

//declare where images are
app.use(express.static(__dirname+'/views/images'));

app.use('/messages/:user_id'                     , myprofilemessagesRouter ); //someone signed in
app.use('/messages'                              , myprofilemessagesRouter ); //someone browsing without signing in

app.use('/myprofile/:user_id'                    , myprofileRouter); //someone signed in
app.use('/myprofile'                             , myprofileRouter); //someone is browsing without 

//app.use('/myprofile'                  , myprofileRouter); // no userId passed in because nobody signed in yet
//app.use('/theirprofile/user/:user_id/receiver/:receiver_id'         , theirprofileRouter);
app.use('/myprofiletheirprofile/:user_id/:their_id'         , myprofiletheirprofileRouter); //someone signed in
app.use('/myprofiletheirprofile/:their_id'                  , myprofiletheirprofileRouter); // nobody signed in

app.use('/myprofilehome/:user_id'                           , myprofilehomeRouter);
app.use('/myprofilehome'                                    , myprofilehomeRouter);

app.use('/myprofilemenu/:user_id'                           , myprofilemenuRouter); //someone is signed into forum
app.use('/myprofilemenu'                                    , myprofilemenuRouter); //someone is browsing in forum

app.use('/myprofilesearch/:user_id/:their_id'               , myprofilesearchRouter);

app.use('/myprofilesearchwhoisonlinepage1/:user_id'         , myprofileswhoisonlineRouterpage1); // someone signed in
app.use('/myprofilesearchwhoisonlinepage1'                  , myprofileswhoisonlineRouterpage1); // nobody signed in
app.use('/myprofilesearchwhoisonlinepage2/:user_id'         , myprofileswhoisonlineRouterpage2);
app.use('/myprofilesearchwhoisonlinepage3/:user_id'         , myprofileswhoisonlineRouterpage3);
app.use('/myprofilesearchwhoisonlinepage4/:user_id'         , myprofileswhoisonlineRouterpage4);
app.use('/myprofilesearchwhoisonlinepage5/:user_id'         , myprofileswhoisonlineRouterpage5);

app.use('/myprofilemessagedelete/:user_id/:message_id'                , myprofilemessagedeleteRouter );

app.use('/login'                                 , loginRouter );
app.use('/logindisplaypage'                       , logindisplaypageRouter );

app.use('/myprofilesearchpage1/:user_id'         , myprofilesearchRouterpage1);
app.use('/myprofilesearchpage1'                  , myprofilesearchRouterpage1);
app.use('/myprofilesearchpage2/:user_id'         , myprofilesearchRouterpage2);
app.use('/myprofilesearchpage3/:user_id'         , myprofilesearchRouterpage3);
app.use('/myprofilesearchpage4/:user_id'         , myprofilesearchRouterpage4);
app.use('/myprofilesearchpage5/:user_id'         , myprofilesearchRouterpage5);

app.use('/myprofilemessagetoreceiver/:user_id/:their_id'         , myprofilemessagetoreceiverRouter); //someone signed in
app.use('/myprofilemessagetoreceiver/:their_id'                  , myprofilemessagetoreceiverRouter); //someone browsing
app.use('/myprofilemessageedit'                  , myprofilemessageeditRouter );
app.use('/myprofilereadmessage',  myprofilereadmessageRouter );

app.use('/myprofilecityandstate'         , myprofilecityandstateRouter);
app.use('/myprofilecityandstate/:user_id', myprofilecityandstateRouter);

app.use('/myprofileeditcityandstate/:user_id', myprofileeditcityandstateRouter); //someone is signed in
app.use('/myprofileeditcityandstate'         , myprofileeditcityandstateRouter); //someone is browsing

app.use('/myprofilephoto/:user_id'         , myprofilephotoRouter); //someone signed into site
app.use('/myprofilephoto'                  , myprofilephotoRouter); //someone is browsing the site
//app.use('/myprofilephotoupload/:user_id'   , myprofilephotouploadRouter);


app.use('/myprofilepatientorcaregiver/:user_id', myprofilepatientorcaregiverRouter); //someone is signed up
app.use('/myprofilepatientorcaregiver'         , myprofilepatientorcaregiverRouter); //someone is browsing

app.use('/myprofilepatientorcaregiveredit'         , myprofilepatientorcaregivereditRouter);


app.use('/myprofilebriefdescription/:user_id', myprofilebriefdescriptionRouter);//someone is signed up
app.use('/myprofilebriefdescription'         , myprofilebriefdescriptionRouter);//someone is browsing

app.use('/myprofilebriefdescriptionedit'     , myprofilebriefdescriptioneditRouter);

app.use('/myprofiledetaileddescription/:user_id', myprofiledetaileddescriptionRouter); //someone is signed in
app.use('/myprofiledetaileddescription'         , myprofiledetaileddescriptionRouter); //someone is browsing

app.use('/myprofiledetaileddescriptionedit', myprofiledetaileddescriptioneditRouter);

//HFhelloworld displays questionnaire data
app.use('/HFhelloworld', HFhelloworldRouter);
app.use('/HFheartdataposts/:user_id', HFheartdatapostsRouter );
app.use('/HFheartdataposts'                   , HFheartdatapostsRouter );
app.use('/HFheartdataposts_no_user_id'        , HFheartdatapostsRouter_no_user_id);
app.use('/HFheartdatapostsfind', HFheartdatapostsRouter );
app.use('/HFheartdatapostsfilter',HFheartdatapostsfilterRouter );
app.use('/HFheartdatapostsfilterpage1'                   ,HFheartdatapostsfilterRouterpage1 );
app.use('/HFheartdatapostsfilterRouterpage1_no_user_id'  ,HFheartdatapostsfilterRouterpage1_no_user_id );
app.use('/HFheartdatapostsfilterpage2',HFheartdatapostsfilterRouterpage2 );
app.use('/HFheartdatapostsfilterpage3',HFheartdatapostsfilterRouterpage3 );
app.use('/HFheartdatapostsfilterpage4',HFheartdatapostsfilterRouterpage4 );
app.use('/HFheartdatapostsfilterpage5',HFheartdatapostsfilterRouterpage5 );
 //display and new comments
app.use('/HFheartdatapostscomments', HFheartdatapostscommentsRouter );

app.use('/HFheartdataposts_html',              HFheartdataposts_htmlRouter);
app.use('/HFheartdataposts_html/:user_id',     HFheartdataposts_htmlRouter);
app.use('/HFheartdataposts_htmlsubmit', HFheartdataposts_htmlsubmitRouter)
app.use('/HFheartdatapostsfilterRouterpage1/:user_id', HFheartdatapostsfilterRouterpage1);
app.use('/HFquestionnaire_html/:user_id', HFquestionnaire_htmlRouter);
app.use('/HFheartdatas',       HFheartdataRouter );
app.use('/register', registerRouter);
app.use('/register_display_page', registerdisplaypageRouter);

//multer changes the extension of the file from an encrypted name into something we can read
var multer = require('multer');
    
var storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, './views/images')
    },
    filename: function (req,file,cb){
        console.log("app.upload -  file.fieldname -> " + file.fieldname );
        console.log("app.upload -  file.fieldname + Date.now() ->" + file.fieldname+'-'+Date.now() );
        console.log("app.upload -  file.mimetype ->" + file.mimetype);
        console.log("app.upload - " + file.mimetype.split('/').reverse()[0] );
        console.log("app.upload - " + file.fieldname+'-'+Date.now()+'.'+file.mimetype.split('/').reverse()[0])
        cb(null,file.fieldname+'-'+Date.now()+'.'+file.mimetype.split('/').reverse()[0]);
    },
});

var upload = multer({storage: storage}); 

app.post('/upload/:user_id', upload.single('photo'), (req, res) => {
  if(req.file) {
      //res.json(req.file);
      console.log("app.post('/upload - 236 ");
  }
  else throw 'error';
  console.log("Todd - 103");
  const express = require('express');
  const bodyParser = require('body-parser');

  //need to connect to db
  const mongoose = require('mongoose');

  //upload files
  
  console.log("Todd - 114");
  //const Users = require('../models/user');
  //const Heartdataposts = require('../models/heartdataposts');
  const data_of_users = require('./models/data_of_users');
  
  //const myprofilephotouploadRouter = express.Router({mergeParams: true}); // define dishRouter as an express router
  console.log("Todd - 114");
  //myprofilephotouploadRouter.use( bodyParser.json());
  //handle get request to server all dishes
  console.log("Todd - 122 inside app.post.js");
  //const myprofilephotouploadRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

  //myprofilephotouploadRouter.use( bodyParser.json());
  //handle get request to server all dishes
  console.log("Todd - 127 inside myprofilephotouploadRouter.js");
  console.log("POST '/:user_id- 128 inside myprofilephotouploadRouter /:user_id -  req.query " + JSON.stringify(req.query ));
  console.log("POST '/:user_id- 129 inside myprofilephotouploadRouter /:user_id -  req.body " + JSON.stringify(req.body ));
  console.log("POST '/:user_id- 130 inside myprofilephotouploadRouter /:user_id -  req.params.user_id " + req.params.user_id);
  //console.log("POST '/:user_id -131 inside myprofilephotouploadRouter /:user_id -  process.cwd() -> " + process.cwd() );
  const the_user_id = req.params.user_id;
  console.log("POST '/:user_id - inside myprofilephotouploadRouter - 133 - todd => " );
  console.log("POST '/:user_id - inside myprofilephotouploadRouter - 134 - the_user_id => " + the_user_id);
  
  console.log("136 displayed req.file : ", req.file );
  console.log("137 displayed req.file.originalname : ", req.file.originalname );
  console.log("138 displayed user_id : ", the_user_id );
  data_of_users.find({'user_id' : the_user_id })  // from posts.js
  .then( (data_of_user) => { //dishes is in mongodb as a collection/database
      //console.log("141 displayed data_of_users[0] : ", data_of_user[0]);
      console.log("142 displayed data_of_users[0]._id : ", data_of_user[0]._id);
      console.log("142 displayed data_of_users[0].username : ", data_of_user[0].username);

      user_id_answer = data_of_user[0]._id;
      console.log("145 displayed user_id_answer :  ", user_id_answer);
      console.log("147 displayed req.file.originalname :  ", req.file.originalname);
      console.log("147 displayed req.file.filename :  ", req.file.filename );
      data_of_users.findByIdAndUpdate({ _id: user_id_answer }
          ,{ image : req.file.filename  }, function(err, result){
          console.log("inside findbyIDandUpdate - 149 myprofilepatientorcaregivereditRouter : ");
          console.log("inside findbyIDandUpdate - 149 myprofilepatientorcaregivereditRouter :  the_user_id -> " + the_user_id);
          console.log("inside findbyIDandUpdate - 149 myprofilepatientorcaregivereditRouter :  data_of_user[0].username -> " + data_of_user[0].username);

          res.render('../views/pages/myprofilehome', { the_user_id : the_user_id ,
            the_username : data_of_user[0].username  }); 
      }, (err) => next(err) )
      .catch( (err) => next(err) );

  }, (err) => next(err) )
  .catch( (err) => next(err) );


});

app.listen(8080);
console.log('Server is listening on port 8080');

module.exports = app; //placed in to get npm start to run