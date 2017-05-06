var express = require('express');


var routes = function(Equipment){

    var equipmentController = require('../Controllers/equipmentController')(Equipment)

    var equipmentRouter = express.Router();

    equipmentRouter.use('/:equipmentId', equipmentController.findByIdInterceptor);
    equipmentRouter.route('/')
        .post(equipmentController.post)
        .get(equipmentController.get)
        
    equipmentRouter.route('/:equipmentId')
        .get(equipmentController.findById)
        .put(equipmentController.update)
        .patch(equipmentController.patch)
        .delete(equipmentController.remove);
    return equipmentRouter;
};

module.exports = routes;