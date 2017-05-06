var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var equipModelModel = new Schema({
    modelDescription: {type: String},
    type: {type: String} 
});

module.exports= mongoose.model('EquipModel', equipModelModel);