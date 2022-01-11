const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//passport variables
//var passportLocalMongoose = require('passport-local-mongoose');

const commentSchema = new Schema ({
    has_been_read :{
        type: Boolean,
        required : true,
        default: false
    },
    date: {
        type: Date,
        required : true,
        default: new Date
    },
    sender_image: {
        type:String,
        required:true,
        default: 'noPhoto-2q.jpeg'
    },
    sender_id : {
        type: String,
        default:'0000000000000000000000000000',
        required : true
    },
    subject : {
        type : String,
        default:'Welcome to SpaceCHF',
        require : true
    },
    message : {
        type : String,
        default:'We hope you find the site useful',
        require : true
    }
    
});

const messageSchema = new Schema ({
    user_id : { //foreign key from user._id and data_of_users._user.id
        type: String,
        required : true,
    },
    username: {
        type: String,
        required: true,
    },
    comments: [commentSchema]
});

var Messages = mongoose.model('Message', messageSchema); 
// Thus, for the example above, the model Tank is for the tanks collection in the database.

module.exports = Messages;