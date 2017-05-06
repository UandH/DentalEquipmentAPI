var vendorController = function(Vendor){

    var findByIdInterceptor = function(req, res, next){
        Vendor.findById(req.params.vendorId, function(err,vendor){
            if(err)
                res.status(500).send(err);
            else if(vendor)
            {
                req.vendor = vendor;
                next();
            }
            else
            {
                res.status(404).send('No Vendor Found');
            }
        });
    }

    var post = function(req, res){
        var vendor = new Vendor(req.body);

        if(!req.body.vendorName){
            res.status(400);
            res.send('Vendor Name is Required');
        }
        else {
            vendor.save();
            res.status(201);
            res.send(vendor);
        }
    };

    var get = function(req, res){

        var query = {};

        if(req.query.genre)
        {
            query.genre = req.query.genre;
        }
        Vendor.find(query, function(err,vendors){
            if(err)
                res.status(500).send(err);
            else
                res.json(vendors);
        });
    };

    var findById = function(req, res){

            res.json(req.vendor);

        }

    var update = function(req, res){
            req.vendor.vendorName = req.body.vendorName;
            req.vendor.address = req.body.address;
            req.vendor.phone = req.body.phone;
            req.vendor.accountNum = req.body.accountNum;
            req.vendor.hasDirectOrder = req.body.hasDirectOrder;
            req.vendor.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.vendor);
                }
            });
        }

    var patch = function(req, res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.vendor[p] = req.body[p];
            }

            req.vendor.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.vendor);
                }
            });
        }

    var remove = function(req, res){
            req.vendor.remove(function(err){
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

module.exports = vendorController;