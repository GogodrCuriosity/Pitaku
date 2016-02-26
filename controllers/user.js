var User = require('../models/user');
exports.updateUsuario = function (req, res) {
    var id = req.body.id;
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var dni = req.body.dni;
    var direccion = req.body.direccion;
    var ciudad = req.body.ciudad;
    var pais = req.body.pais;
    var telefono = req.body.telefono;
    var foto = req.body.foto;
    User.findOne({ id: id }, function (err, usuario){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            if(usuario){
                if(nombre)
                usuario.nombre = nombre;
                if(apellido)
                    usuario.apellido = apellido;
                if(dni)
                    usuario.dni = dni;
                if(direccion)
                    usuario.direccion = direccion;
                if(ciudad)
                    usuario.ciudad = ciudad;
                if(pais)
                    usuario.pais = pais;
                if(telefono)
                    usuario.telefono = telefono;
                if(foto)
                    usuario.foto = foto;

                usuario.save(function (err, usuario) {
                    if (err){
                        res.json({status:"fail",data:err});
                    }else{
                        res.json({status:"ok",data:usuario});
                    }
                });
            }else{
                res.json({status:"fail",data:'Usuario no encontrado'});
            }
        }
    });
};
exports.getById = function(req,res){
    var id = req.params.id;
    User.findOne({ id: id }, function (err, usuario){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            if(usuario){
                res.json({status:'ok',data:usuario});
            }else{
                res.json({status:"fail",data:'Usuario no encontrado'});
            }
        }
    });
};
exports.destruirUsuario = function (req, res) {
    var id = req.body.id;
    User.findOne({ id: id }, function (err, usuario){
        if(err){
            res.json({status:"fail",data:err});
        }else{
            if(usuario){
                usuario.remove(function (err, usuario) {
                    if (err){
                        res.json({status:"fail",data:err});
                    }else{
                        res.json({status:"ok",data:usuario});
                    }
                });
            }else{
                res.json({status:"fail",data:'Usuario no encontrado'});
            }
        }
    });
};