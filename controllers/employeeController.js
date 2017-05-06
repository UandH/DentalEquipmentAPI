var employeeController = function(Employee){

    var findByIdInterceptor = function(req, res, next){
        Employee.findById(req.params.employeeId, function(err,employee){
            if(err)
                res.status(500).send(err);
            else if(employee)
            {
                req.employee = employee;
                next();
            }
            else
            {
                res.status(404).send('No Employee Found');
            }
        });
    }

    var post = function(req, res){
        var employee = new Employee(req.body);

        if(!req.body.name){
            res.status(400);
            res.send('Name is Required');
        }
        else {
            employee.save();
            res.status(201);
            res.send(employee);
        }
    };

    var get = function(req, res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        Employee.find(query, function(err,employees){
            if(err)
                res.status(500).send(err);
            else
                res.json(employees);
        });
    };

    var findById = function(req, res){

            res.json(req.employee);

        }

    var update = function(req, res){
            req.employee.name = req.body.name;
            req.employee.password = req.body.password;
            req.employee.admin = req.body.admin;
            req.employee.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.employee);
                }
            });
        }

    var patch = function(req, res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.employee[p] = req.body[p];
            }

            req.employee.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.employee);
                }
            });
        }

    var remove = function(req, res){
            req.employee.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        }

    return {
        post: post,
        get: get,
        findById: findById,
        update: update, 
        patch: patch,
        remove: remove,
        findByIdInterceptor: findByIdInterceptor
    }
}

module.exports = employeeController;