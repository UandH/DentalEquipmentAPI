var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var employeeModel = new Schema({
    name: {type: String},
    password: {type: String},
    admin: {type: Boolean, default:false}
});

module.exports= mongoose.model('Employee', employeeModel);