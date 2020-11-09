
const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const app = express()

const Usuario = require('../models/usuario');


// ACTUALIZAR DATOS
app.get('/usuario', function (req, res) {
    
    // req.query.desde parametro que va entrar al hacer el servicio ?desde=5
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite ||5;
    limite = Number(limite);

    // Devolvemos todos los usuarios de la bd
    // El string filtra para que solo aparezcan esos datos
    Usuario.find({estado: true}, 'nombre email role estado google img')
           .skip(desde) //Salta x registros
           .limit(limite) //limite de registros
           .exec( (err, usuarios) => {
                // Hay un error
                if (err) {
                    return res.status(400).json({
                        OK: false,
                        err
                    })
                } 

                // en {} del count va la misma condicion que en el finde {}, en este caso no hay condion por lo que los trae todos
                Usuario.count({estado: true}, (err, conteo) =>{
                    
                    res.json({
                        OK: true,
                        usuarios,
                        total: conteo
                    })
                })
           }) 
    //res.send('GET usuario');
  })
   
  // CREAR NUEVOS REGISTROS
  // No solo enviamos informacion sino que tambien podemos recibirla
  // Permitiendo guardarlo en db -- Para esto es facil usar pkg bodyParser
  // mismo que PUT, POST, DELETE
  app.post('/usuario', function (req, res) {
      //res.send('POST usuario')
      let body = req.body;
  
      // Creamos un usuario(objeto de bd) usando el modelo que hemos creado
      let usuario = new Usuario({
          nombre:   body.nombre,
          email:    body.email,
          // guarfamos la contra encriptada usando bcrypt pkg
          // 10 es el numero de vueltas que voy a darle al hash
          password: bcrypt.hashSync(body.password, 10) ,
          role:     body.role
      })

      // Guardamos el usuario en la bd // USUARIODB es la respuesta del usuario guardado en la db
      // Se usa save de mongoose
      usuario.save((err, usuarioDB) => {
        
        // Hay un error
        if (err) {
            return res.status(400).json({
                OK: false,
                err
            })
        } 

        // No vamos a enviar al usuario final la contraseña
        //usuarioDB.password = null;
        // Lo hemos hecho directamente en el esquema 

        res.json({
            OK: true,
            usuario: usuarioDB
        })

      })
    });
  
  // ACTUALIZAR DATOS 
  app.put('/usuario/:id', function (req, res) {
      //res.send('PUT usuario')
  
      //Envia 
      let id = req.params.id;
      // Recogemos la info del body
      // Usando pick hacemos un arreglo para determinar las propiedades que si se pueden actualizar
      let body = _.pick(req.body, ['nombre','email','img','role','estado']);      

      //Usuario es el schema
      // new true nos envia el usuario actualizado al lanzar la peticion PUT
      Usuario.findByIdAndUpdate(id, body, {new:true, runValidators: true}, (err, usuarioDB) =>{

        // Hay un error
        if (err) {
            return res.status(400).json({
                OK: false,
                err
            })
        }
        //salida
        res.json({
            ok: true,
            usuario: usuarioDB
        })
      })
    })
  
  // 'BORRAR DATOS' aunque lo mejor es no borrar sino almacenar y no usar
  app.delete('/usuario/:id', function (req, res) {
      
    //Recupero el id
    let id = req.params.id;
    //Recupero la informacion
    let estadoUsuario = {
        estado: false
    };
    
    // Cambiamos el estado a false, no se elimina fisicamente de la bd
    Usuario.findByIdAndUpdate(id, estadoUsuario, {new:true}, (err, usuarioInactivo) => {
        //Hay un error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (usuarioInactivo === null) {
            return res.status(400).json({
                OK: false,
                error: 'Usuario no encontrado'
            })
        }

        //let usuarioInactivado = usuarioInactivo.body.estado = false

        res.json({
            ok: true,
            usuarioInactivo,
            mensaje: 'Usuario borrado'
        }) ;
    });



    // Fisicamente eliminamos el registro
    /*
    Usuario.findByIdAndDelete(id, (err, usuarioBorrado) =>{
        // Hay un error
        if (err) {
            return res.status(400).json({
                OK: false,
                err
            })
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                OK: false,
                error: 'Usuario no encontrado'
            })
        }

        res.json({
            ok:true,
            usuario: usuarioBorrado
        })
    })*/
    
    //res.send('DELETE usuario');
  })


// Exporto el archivo de app con as configuraciones de los usuarios
module.exports = app;