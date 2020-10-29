require('./config/config')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')


// Funciones que se dispararan cuando pasen por estas lineas son Middlewares .USE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// ACTUALIZAR DATOS
app.get('/usuario', function (req, res) {
  res.send('GET usuario');
})
 
// CREAR NUEVOS REGISTROS
// No solo enviamos informacion sino que tambien podemos recibirla
// Permitiendo guardarlo en db -- Para esto es facil usar pkg bodyParser
// mismo que PUT, POST, DELETE
app.post('/usuario', function (req, res) {
    //res.send('POST usuario')
    let body = req.body;

    if ( body.nombre === undefined ) {
      res.status(400).json({
        ok: false,
        mensaje: 'El nombre es necesario'
      });
    } else {
      res.json({
          persona: body
      })
    }
  });

// ACTUALIZAR DATOS
app.put('/usuario/:id', function (req, res) {
    //res.send('PUT usuario')

    //Envia 
    let id = req.params.id;

    //salida
    res.json({
        id
    })

  })

// 'BORRAR DATOS' aunque lo mejor es no borrar sino almacenar y no usar
app.delete('/usuario', function (req, res) {
    res.send('DELETE usuario');
})

// process.env.PORT variable global
app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto 3000");
})
