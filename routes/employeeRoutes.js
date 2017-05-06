var express = require('express');


var routes = function(Employee){

    var employeeController = require('../Controllers/employeeController')(Employee)

    var employeeRouter = express.Router();

    employeeRouter.use('/:employeeId', employeeController.findByIdInterceptor);
    employeeRouter.route('/')
        .post(employeeController.post)
        .get(employeeController.get)
        
    employeeRouter.route('/:employeeId')
        .get(employeeController.findById)
        .put(employeeController.update)
        .patch(employeeController.patch)
        .delete(employeeController.remove);
    return employeeRouter;
};

module.exports = routes;