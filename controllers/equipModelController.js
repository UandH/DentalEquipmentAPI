var equipModelController = function(EquipModel){

    var findByIdInterceptor = function(req, res, next){
        EquipModel.findById(req.params.equipModelId, function(err,equipModel){
            if(err)
                res.status(500).send(err);
            else if(equipModel)
            {
                req.equipModel = equipModel;
                next();
            }
            else
            {
                res.status(404).send('No Equipment Model Found');
            }
        });
    }

    var post = function(req, res){
        var equipModel = new EquipModel(req.body);

        if(!req.body.modelDescription){
            res.status(400);
            res.send('Model Description is Required');
        }
        else {
            equipModel.save();
            res.status(201);
            res.send(equipModel);
        }
    };

    var get = function(req, res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        EquipModel.find(query, function(err,equipModels){
            if(err)
                res.status(500).send(err);
            else
                res.json(equipModels);
        });
    };

    var findById = function(req, res){

            res.json(req.equipModel);

        }

    var update = function(req, res){
            req.equipModel.modelDescription = req.body.modelDescription;
            req.equipModel.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.equipModel);
                }
            });
        }

    var patch = function(req, res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.equipModel[p] = req.body[p];
            }

            req.equipModel.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.equipModel);
                }
            });
        }

    var remove = function(req, res){
            req.equipModel.remove(function(err){
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

module.exports = equipModelController;