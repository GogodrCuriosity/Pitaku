/**
 * Created by Gogodr on 24/02/2016.
 */
var mongoose = require('mongoose');
var requestSchema = mongoose.Schema({
    titulo:String,
    descripcion:String,
    url:String,
    estado:Number,
    orden:mongoose.Schema.Types.ObjectId,
    propuestas:[mongoose.Schema.Types.ObjectId],
    usuario:mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Pedido', requestSchema);