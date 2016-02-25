
var Orden = require('../models/orden');
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
