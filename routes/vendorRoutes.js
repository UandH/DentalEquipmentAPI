var express = require('express');


var routes = function(Vendor){

    var vendorController = require('../Controllers/vendorController')(Vendor)

    var vendorRouter = express.Router();

    vendorRouter.use('/:vendorId', vendorController.findByIdInterceptor);
    vendorRouter.route('/')
        .post(vendorController.post)
        .get(vendorController.get)
        
    vendorRouter.route('/:vendorId')
        .get(vendorController.findById)
        .put(vendorController.update)
        .patch(vendorController.patch)
        .delete(vendorController.remove);
    return vendorRouter;
};

module.exports = routes;