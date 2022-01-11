const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    author : {
        type: String,
        required : true,
        default : ''
    },
    datepicker : {
        type : Date,
        required : true
    },
    comment : {
        type: String
    }
});


const heartdatapostSchema = new Schema ({
    author : {
        type: String,
        required : true,
        default : ''
    },
    email : {
        type: String,
        required : true,
        default : ''
    },
    category :  {
        type : String,
        required : true
    },
    datepicker : {
        type : String,
        required : true
    },
    replys_subject : {
        type: String,
        required : true,
        default : ''
    },
    replys: {
        type: String,
        required : true,
        default : ''
    },
     comments: [commentSchema]
});
/*
},{
    timestamps: true
});
    /*
    post_01_to_replys : {
        type: String,
        default : ''
    },
    post_02_to_replys : {
        type: String,
        default : ''
    },
    post_03_to_replys : {
        type: String,
        default : ''
    },
    post_04_to_replys : {
        type: String,
        default : ''
    },
    post_05_to_replys : {
        type: String,
        default : ''
    },
},{
    timestamps: true
});
*/

const Heartdataposts = mongoose.model('Heartdatapost', heartdatapostSchema);
//const schema = new mongoose.Schema({ name: 'string', size: 'string' });
//const Tank = mongoose.model('Tank', schema);
// Thus, for the example above, the model Tank is for the tanks collection in the database.
module.exports = Heartdataposts;