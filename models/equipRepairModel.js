var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var equipRepairModel = new Schema({
    problemDescription: {type: String},
    dateSent: {type: Date},
    dateReceived: {type: Date},
    repairDescription: {type: String},
    isWarranty: {type: Boolean},
    warrantyLength: {type: String}
});

module.exports= mongoose.model('EquipRepair', equipRepairModel);