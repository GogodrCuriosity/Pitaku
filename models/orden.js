var mongoose = require('mongoose');
var orderSchema = mongoose.Schema({
    viaje:ObjectId,
    pedido:ObjectId,
    precio:Number,
    estado:Boolean
});

module.exports = mongoose.model('Orden', orderSchema);