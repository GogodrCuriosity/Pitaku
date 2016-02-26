var mongoose = require('mongoose');
var orderSchema = mongoose.Schema({
    viaje:mongoose.Schema.Types.ObjectId,
    pedido:mongoose.Schema.Types.ObjectId,
    precio:Number,
    estado:Boolean
});

module.exports = mongoose.model('Orden', orderSchema);