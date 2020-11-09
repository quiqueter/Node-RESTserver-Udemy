require('./config/config')

const express = require('express')
const mongoose = require('mongoose');

const app = express()

const bodyParser = require('body-parser')


// Funciones que se dispararan cuando pasen por estas lineas son Middlewares .USE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// rutas de usuario
app.use(require('./routes/usuario'));


//Conectamos mongo
mongoose.connect(process.eventNames.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(db => console.log('Conexion exitosa'))
.catch(error => handleError(error));

// process.env.PORT variable global
app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto : ${process.env.PORT}`);
})

