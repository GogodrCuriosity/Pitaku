var Viaje = require('../models/viaje');
exports.crearViaje = function(req,res){
    var vueloSalida = req.body.vueloSalida;
    var vueloRegreso = req.body.vueloRegreso;
    var viaje = new Viaje();
    viaje.vueloSalida = vueloSalida;
    viaje.vueloRegreso = vueloRegreso;
    viaje.save(function (err, viaje) {
        if (err){
            res.json({status:"fail",data:err});
        }else{
            res.json({status:"ok",data:viaje});
        }
    });
};
exports.editarViaje = function (req, res) {
    var id = req.body.id;
    var vueloSalida = req.body.vueloSalida;
    var vueloRegreso = req.body.vueloRegreso;
    Viaje.findOne({ id: id }, function (err, viaje){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            if(viaje){
                if(vueloSalida)
                    viaje.vueloSalida = vueloSalida;
                if(vueloRegreso)
                    viaje.vueloRegreso = vueloRegreso;
                viaje.save(function (err, viaje) {
                    if (err){
                        res.json({status:"fail",data:err});
                    }else{
                        res.json({status:"ok",data:viaje});
                    }
                });
            }else{
                res.json({status:"fail",data:'Viaje no encontrado'});
            }
        }
    });
};
exports.getById = function(req,res){
    var id = req.params.id;
    Viaje.findOne({ id: id }, function (err, viaje){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            if(viaje){
                res.json({status:'ok',data:viaje});
            }else{
                res.json({status:"fail",data:'Viaje no encontrado'});
            }
        }
    });
};
exports.getByUser = function(req,res){
    var user = req.body.userId;
    Viaje.find({ user: user }).exec(function (err, viajes) {
        if (err) {
            res.json({status: "fail", data: err});
        } else {
            res.json({status: "ok", data: viajes});
        }
    });
};
exports.destruirViaje = function (req, res) {
    var id = req.body.id;
    Viaje.findOne({ id: id }, function (err, viaje){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            if(viaje){
                viaje.remove(function (err, viaje) {
                    if (err){
                        res.json({status:"fail",data:err});
                    }else{
                        res.json({status:"ok",data:viaje});
                    }
                });
            }else{
                res.json({status:"fail",data:'Viaje no encontrado'});
            }
        }
    });
};