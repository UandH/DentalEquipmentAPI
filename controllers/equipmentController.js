var equipmentController = function(Equipment){

    var findByIdInterceptor = function(req, res, next){
        Equipment.findById(req.params.equipmentId, function(err,equipment){
            if(err)
                res.status(500).send(err);
            else if(equipment)
            {
                req.equipment = equipment;
                next();
            }
            else
            {
                res.status(404).send('No Equipment Found');
            }
        });
    }

    var post = function(req, res){
        var equipment = new Equipment(req.body);

        if(!req.body.serialNum){
            res.status(400);
            res.send('Serial Number is Required');
        }
        else {
            equipment.save();
            res.status(201);
            res.send(equipment);
        }
    };

    var get = function(req, res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        Equipment.find(query, function(err,equipments){
            if(err)
                res.status(500).send(err);
            else
                res.json(equipments);
        });
    };

    var findById = function(req, res){

            res.json(req.equipment);

        }

    var update = function(req, res){
            req.equipment.serialNum = req.body.serialNum;
            req.equipment.cost = req.body.cost;
            req.equipment.purchaseDate = req.body.purchaseDate;
            req.equipment.hasWarranty = req.body.hasWarranty;
            req.equipment.warrantyLength = req.body.warrantyLength;
            req.equipment.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.equipment);
                }
            });
        }

    var patch = function(req, res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.equipment[p] = req.body[p];
            }

            req.equipment.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.equipment);
                }
            });
        }

    var remove = function(req, res){
            req.equipment.remove(function(err){
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

module.exports = equipmentController;