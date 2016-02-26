/**
 * Created by Gogodr on 24/02/2016.
 */
var mongoose = require('mongoose');
var viajeSchema = mongoose.Schema({
    usuario:mongoose.Schema.Types.ObjectId,
    ordenes:[mongoose.Schema.Types.ObjectId],
    vueloSalida:{
        ciudad:String,
        pais:String,
        fecha:Date,
        codigoVuelo:String
    },
    vueloRegreso:{
        ciudad:String,
        pais:String,
        fecha:Date,
        codigoVuelo:String
    }
});

module.exports = mongoose.model('Viaje', viajeSchema);