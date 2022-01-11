const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//passport variables
//var passportLocalMongoose = require('passport-local-mongoose');

const user = new Schema ({
    username : {
        type: String,
        required : true,
    },
    the_password : {
        type: String,
        required : true,
    },
    email : {
        type: String,
        required : true,
    },
    admin: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model( 'user', user);
//const schema = new mongoose.Schema({ name: 'string', size: 'string' });
//const Tank = mongoose.model('Tank', schema);
// Thus, for the example above, the model Tank is for the tanks collection in the database.
//module.exports = Users;