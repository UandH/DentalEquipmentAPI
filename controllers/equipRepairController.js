var equipRepairController = function(EquipRepair){

    var findByIdInterceptor = function(req, res, next){
        EquipRepair.findById(req.params.equipRepairId, function(err,equipRepair){
            if(err)
                res.status(500).send(err);
            else if(equipRepair)
            {
                req.equipRepair = equipRepair;
                next();
            }
            else
            {
                res.status(404).send('No Equipment Repair Found');
            }
        });
    }

    var post = function(req, res){
        var equipRepair = new EquipRepair(req.body);

        if(!req.body.problemDescription){
            res.status(400);
            res.send('Problem Description is Required');
        }
        else {
            equipRepair.save();
            res.status(201);
            res.send(equipRepair);
        }
    };

    var get = function(req, res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        EquipRepair.find(query, function(err,equipRepairs){
            if(err)
                res.status(500).send(err);
            else
                res.json(equipRepairs);
        });
    };

    var findById = function(req, res){

            res.json(req.equipRepair);

        }

    var update = function(req, res){
            req.equipRepair.problemDescription = req.body.problemDescription;
            req.equipRepair.dateSent = req.body.dateSent;
            req.equipRepair.dateReceived = req.body.dateReceived;
            req.equipRepair.repairDescription = req.body.repairDescription;
            req.equipRepair.cost = req.body.cost;
            req.equipRepair.isWarranty = req.body.isWarranty;
            req.equipRepair.warrantyLength = req.body.warrantyLength;
            req.equipRepair.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.equipRepair);
                }
            });
        }

    var patch = function(req, res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.equipRepair[p] = req.body[p];
            }

            req.equipRepair.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.equipRepair);
                }
            });
        }

    var remove = function(req, res){
            req.equipRepair.remove(function(err){
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

module.exports = equipRepairController;