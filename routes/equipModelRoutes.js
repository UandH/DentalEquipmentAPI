var express = require('express');


var routes = function(EquipModel){

    var equipModelController = require('../Controllers/equipModelController')(EquipModel)

    var equipModelRouter = express.Router();

    equipModelRouter.use('/:equipModelId', equipModelController.findByIdInterceptor);
    equipModelRouter.route('/')
        .post(equipModelController.post)
        .get(equipModelController.get)
        
    equipModelRouter.route('/:equipModelId')
        .get(equipModelController.findById)
        .put(equipModelController.update)
        .patch(equipModelController.patch)
        .delete(equipModelController.remove);
    return equipModelRouter;
};

module.exports = routes;