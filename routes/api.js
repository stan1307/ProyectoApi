//Eventos
var express = require('express');
var router = express.Router();

/* GET home page. */
function initApiRoute(db){
var Eventos = db.collection('Eventos');
var Usuarios=db.collection('Usuarios');

  router.get('/getEventos', function(req, res, next) {
      Eventos.find({}).sort({Evento:-1}).limit(3).toArray(function(err, Eventos){
      if (err) {
          res.status(500).json({"error":"Error al obtener documentos Eventos"});
      }else {
        res.status(200).json(Eventos);
      }
    })// end toArray
  }); // end getEventos

  router.post('/createitem', function(req,res,next){
    if(!req.session.user){
        res.status(404).json({"error":"solo administrador"});
    }
    else {
            var Evento = {Evento:"",
                         estado:"",
                         fecha :"",
                         hora  : "",
                         Locacion: ""
                        };
                        Evento.Evento= req.body.Evento;
                        Evento.estado= req.body.estado;
                        Evento.fecha= req.body.fecha;
                        Evento.hora=req.body.hora;
                        Evento.Locacion=req.body.Locacion;

                        Eventos.insertOne(Evento, function(err,result){
                          if (err) {
                            res.status(500).json({"error":"No se pudo insertar el evento"});
                          } else {
                            res.status(200).json({"inserted":"Evento Registrado"});
                          }
                        })
    }

  });//end createitem


router.post('/usuario', function(req,res,next){

   if(!req.session.user){
      res.status(404).json({"error":"solo administrador"});
   }
   else{
     var Usuario = {Correo:"",
     Contrasenia:""
   };

   Usuario.Correo= req.body.Correo;
   Usuario.Contrasenia= req.body.Contrasenia;

   Usuarios.insertOne(Usuario, function(err,result){
 if (err) {
   res.status(500).json({"error":"No se pudo insertar el usuario"});
 } else {
   res.status(200).json({"inserted":"usuario Registrado"});
 }
})
   }
    });//end crear usuario

    router.post('/login', function(req,res){
      var Usuario = {Correo:"",
       Contrasenia:""
     };
     Usuario.Correo= req.body.Correo;
     Usuario.Contrasenia= req.body.Contrasenia;

    Usuarios.findOne(Usuario, function(err,user){
      if (err) {
        return res.status(500).send();
      }
      if(!user){
        return res.status(404).send();
      }
        req.session.user=user;
        return  res.status(200).json(user);
    })
  });//end log usuario

 router.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('#principal');
 });
  return router;
}; // end initApiRoute

  module.exports = initApiRoute;
