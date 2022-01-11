const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heartdataSchema = new Schema ({
    activitiesafterdiagnosis: {
        type: String,
        default : 'dont know',
        required : true
    },
    amountoftimesleepingafterdiagnosis: {
        type: String,
        default : 'dont know',
        required : true
    },
    patientstoppedlivinglifeafterdiagnosis: {
        type: String,
        default : 'dont know',
        required : true
    },
    depressionafterdiagnosis: {
        type: String,
        default : 'dont know',
        required : true
    },  
    seeingfamilyandfriendsafterdiagnosis: {
        type: String,
        default : 'dont know',
        required : true
    }, 
    bedriddenafterdiagnosis: {
        type: String,
        default : 'dont know',
        required : true
    },  
    usingwalkercanewheelchairafterdiagnosis : {
        type: String,
        default : 'dont know',
        required : true
    },  
    dilatedleftventricle : {
        type: String,
        default : 'dont know',
        required : true
    },
    takingmelatoninandconenzymeq10afterdiagnosis : {
        type: String,
        default : 'dont know',
        required : true
    },
    nolongerdrivingafterdiagnosis : {
        type: String,
        default : 'dont know',
        required : true
    },
    nolongergoingoutsideafterdiagnosis : {
        type: String,
        default : 'dont know',
        required : true
    },
    stillusingacatheterbagafterdiagnosis : {
        type: String,
        default : 'dont know',
        required : true
    },
    patientwastoldtheyhadhowmuchtimetoliveafterdiagnosis : {
        type: String,
        default : 'dont know',
        required : true
    },
    extratimethepatienthaslivedafterdiagnosis : {
        type: String,
        default : 'dont know',
        required : true
    },
    patienthaspurplefeetwhenstandingafterdiagnosis : {
        type: String,
        default : 'dont know',
        required : true
    },
    patientseeswolveschasinghimindreamsafterdiagnosis : {
        type: String,
        default : 'dont know',
        required : true
    },
    patienthasstoppedlivingtheirlifeafterdiagnosis : {
        type: String,
        default : 'dont know',
        required : true
    }

});

var Heartdatas = mongoose.model('Heartdatas', heartdataSchema);

module.exports = Heartdatas;
