const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data_of_user = new Schema ({
    user_id: { //foreign key gotten from user._id
        type: String,
        required : true,
    },
    username: {//foreign key gotten from user._id 
        type: String,
        required : true,
    },
    image : {
        type: String,
        default: '',
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state : {
        type:String,
        required: false
    },
    patient_or_caregiver : {
        type: String,
        default: '',
    },
    illness : {
        type: String,
        default: '',
    },
    brief_description : {
        type: String,
        default: '',
    },
    detailed_description : {
        type: String,
        default:''
    },
    online : {
        type: Boolean,
        required: true,
        default: false
    }
});


const Data_of_users = mongoose.model('Data_of_user', data_of_user);
//const schema = new mongoose.Schema({ name: 'string', size: 'string' });
//const Tank = mongoose.model('Tank', schema);
// Thus, for the example above, the model Tank is for the tanks collection in the database.

module.exports = Data_of_users;