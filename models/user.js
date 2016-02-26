var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    nombre:String,
    apellido:String,
    dni:String,
    direccion:String,
    ciudad:String,
    pais:String,
    telefono:String,
    foto:String,
    local: {
        username: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String
    },
    google: {
        id: String,
        token: String,
        email: String
    },
    viajes:[mongoose.Schema.Types.ObjectId],
    pedidos:[mongoose.Schema.Types.ObjectId]


});

module.exports = mongoose.model('User', userSchema);