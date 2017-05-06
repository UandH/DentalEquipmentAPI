var express = require('express');


var routes = function(EquipRepair){

    var equipRepairController = require('../Controllers/equipRepairController')(EquipRepair)

    var equipRepairRouter = express.Router();

    equipRepairRouter.use('/:equipRepairId', equipRepairController.findByIdInterceptor);
    equipRepairRouter.route('/')
        .post(equipRepairController.post)
        .get(equipRepairController.get)
        
    equipRepairRouter.route('/:equipRepairId')
        .get(equipRepairController.findById)
        .put(equipRepairController.update)
        .patch(equipRepairController.patch)
        .delete(equipRepairController.remove);
    return equipRepairRouter;
};

module.exports = routes;