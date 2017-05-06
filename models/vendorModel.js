var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var vendorModel = new Schema({
    vendorName: {type: String},
    address: {type: String},
    phone: {type: String},
    accountNum: {type: String},
    hasDirectOrder: {type: Boolean}
});

module.exports= mongoose.model('Vendor', vendorModel);