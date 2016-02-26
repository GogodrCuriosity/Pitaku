var Orden = require('../models/orden');
var Pedido = require('../models/pedido');
var Viaje = require('../models/viaje');

exports.getByViaje = function(req,res){
    var viaje = req.body.viajeId;
    Orden.find({ viaje: viaje }).exec(function (err, ordenes) {
        if (err) {
            res.json({status: "fail", data: err});
        } else {
            res.json({status: "ok", data: ordenes});
        }
    });
};
exports.getByPedido = function(req,res){
    var pedido = req.body.pedidoId;
    Orden.find({ pedido: pedido }).exec(function (err, ordenes) {
        if (err) {
            res.json({status: "fail", data: err});
        } else {
            res.json({status: "ok", data: ordenes});
        }
    });
};
exports.crearOrden = function(req,res){
    var pedidoId = req.body.pedidoId;
    var viajeId = req.body.viajeId;
    var precio = req.body.precio;

    Viaje.findOne({id:viajeId},function(err,viaje){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            Pedido.findOne({ id: pedidoId }, function (err, pedido){
                if(err){
                    res.json({status:"fail",data:err});
                }else{
                    if(pedido){
                        var orden = new Orden();
                        orden.viaje = viaje.id;
                        orden.pedido = pedido.id;
                        orden.precio = precio;
                        orden.estado = false;
                        orden.save(function(err,orden){
                            if(err){
                                res.json({status:"fail",data:err});
                            }else{
                                pedido.propuestas.push(orden.id);
                                pedido.save(function (err, pedido) {
                                    if (err){
                                        res.json({status:"fail",data:err});
                                    }else{
                                        res.json({status:"ok",data:orden});
                                    }
                                });
                            }
                        })
                    }else{
                        res.json({status:"fail",data:'Pedido no encontrado'});
                    }
                }
            });
        }
    });
};
exports.destruirOrden = function(req,res){
    var ordenId = req.body.ordenId;
    Orden.findOne({id:ordenId},function(err,orden){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            Pedido.findOne({ id: orden.pedido }, function (err, pedido){
                if(err){
                    res.json({status:"fail",data:err});
                }else{
                    if(pedido){
                        pedido.propuestas.splice(pedido.propuestas.indexOf(orden.id),1);
                        pedido.save(function (err, pedido) {
                            if (err){
                                res.json({status:"fail",data:err});
                            }else{
                                orden.remove(function (err, orden) {
                                    if (err){
                                        res.json({status:"fail",data:err});
                                    }else{
                                        res.json({status:"ok",data:orden});
                                    }
                                });
                            }
                        });
                    }else{
                        res.json({status:"fail",data:'Pedido no encontrado'});
                    }
                }
            });
        }
    });
};
exports.editarOrden = function (req, res) {
    var ordenId = req.body.ordenId;
    var precio = req.body.precio;
    Orden.findOne({id:ordenId},function(err,orden){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            orden.precio = precio;
            orden.save(function(err,orden){
                if(err){
                    res.json({status:"fail",data:err});
                }else{
                    res.json({status:"ok",data:orden});
                }
            })
        }
    });
};