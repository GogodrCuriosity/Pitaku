var Pedido = require('../models/pedido');
var Orden = require('../models/orden');

exports.crearPedido = function(req,res){
    var titulo = req.body.titulo;
    var descripcion = req.body.descripcion;
    var url = req.body.url;
    var usuarioId = req.body.usuarioId;
    var pedido = new Pedido();
    pedido.titulo = titulo;
    pedido.descripcion = descripcion;
    pedido.url = url;
    pedido.estado = 0;
    pedido.usuario = usuarioId;
    pedido.save(function (err, pedido) {
        if (err){
            res.json({status:"fail",data:err});
        }else{
            res.json({status:"ok",data:pedido});
        }
    });
};

exports.getByUser = function(req,res){
    var user = req.body.userId;
    Pedido.find({ user: user }).exec(function (err, pedidos) {
        if (err) {
            res.json({status: "fail", data: err});
        } else {
            res.json({status: "ok", data: pedidos});
        }
    });
};

exports.cambiarEstado = function(req,res){
    var id = req.body.id;
    var estado = req.body.estado;
    Pedido.findOne({ id: id }, function (err, pedido){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            if(pedido){

                pedido.estado = estado;
                pedido.save(function (err, pedido) {
                    if (err){
                        res.json({status:"fail",data:err});
                    }else{
                        res.json({status:"ok",data:pedido});
                    }
                });
            }else{
                res.json({status:"fail",data:'Pedido no encontrado'});
            }
        }
    });
};

exports.confirmarOrden = function(req,res){
    var id = req.body.id;
    var ordenId = req.body.orden;
    Pedido.findOne({ id: id }, function (err, pedido){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            if(pedido){
                Orden.findOne({id:ordenId},function(err,orden){
                    if(err){
                        res.json({status:"fail",data:err});
                    }else{
                        if(orden){
                            pedido.orden = ordenId;
                            pedido.save(function (err, pedido) {
                                if (err){
                                    res.json({status:"fail",data:err});
                                }else{
                                    orden.estado = true;
                                    orden.save(function(err,orden){
                                        if(err){
                                            res.json({status:"fail",data:err});
                                        } else{
                                            res.json({status:"ok",data:pedido});
                                        }
                                    });
                                }
                            });
                        }else{
                            res.json({status:"fail",data:'Orden no encontrado'});
                        }
                    }
                });
            }else{
                res.json({status:"fail",data:'Pedido no encontrado'});
            }
        }
    });
};