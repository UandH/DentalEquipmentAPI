var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var equipmentModel = new Schema({
    serialNum: {type: String},
    cost: {type: Number},
    purchaseDate: {type: Date},
    hasWarranty: {type: Boolean, default:true},
    warrantyLength: {type: String}
});

module.exports= mongoose.model('Equipment', equipmentModel);