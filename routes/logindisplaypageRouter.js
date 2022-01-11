const express = require('express');
const bodyParser = require('body-parser');

//npm install mongoose@5.1.7
//npm install mongoose-currency@0.2.0
//npm install process - navigate working directory at bottom
//npm install path  - navigate directory and list files
//npm install fs    files list
const mongoose = require('mongoose');

//const Heartdataposts = require('../models/heartdataposts');
const User = require('../models/user');
const Data_of_users = require('../models/data_of_users');
const Messages = require('../models/messages');

const logindisplaypageRouter = express.Router({mergeParams: true}); // define dishRouter as an express router

logindisplaypageRouter.use( bodyParser.json());
//handle get request to server all dishes
matching_email_address = false;
matching_username = false;
console.log("inside 22 registerdisplaypageRouter");
logindisplaypageRouter.route('/')  //line 18 in index.js specifies dishRouter is assigned to /dishes
.get((req,res, next) => {

    res.render('../views/pages/logindisplaypage');

}); //.get((req,res, next) => {


module.exports = logindisplaypageRouter;