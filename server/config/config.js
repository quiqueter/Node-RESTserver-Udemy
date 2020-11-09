

// DECLARAMOS VARIABLES Y CONSTANTES DE FORMA GLOBAL COMO P.E Process


// -----------------------
//   PUERTO
// -----------------------
process.env.PORT = process.env.PORT || 3000;
console.log(`2 Escuchando el puerto : ${process.env.PORT}`);
console.log(`entorno : ${process.env.NODE_ENV}`);
// -----------------------
//   ENTORNO
// -----------------------
// Variable que establece heroku
// Si existe estoy corriendo en produccion sino estare en desarollo
process.env.NODE_ENV = process.env.NODE_ENV|| 'dev';
console.log(`process.env.NODE_ENV : ${process.env.NODE_ENV}`);


// -----------------------
//   Base de Datos
// -----------------------

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    // Local
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    // Mongo Atlas
     urlDB = process.env.MONGO_URI // LLamamos a la variable de entorno nueva
    'mongodb+srv://quiqueter:ud4xrQ69Zo1m9dxp@cluster0.6dbnm.mongodb.net/cafe?retryWrites=true&w=majority'
   ;
};
console.log(`urlDB : ${urlDB}`);

process.eventNames.URLDB = urlDB;


/*
con estas variables podemos subir a github el usuario y contraseña ocultos en el codigo

heroku config:set nombre="enrique"   declaro una nueva variable de entorno con heroku
EJEMPLO:
heroku config:set MONGO_URI="mongodb+srv://quiqueter:ud4xrQ69Zo1m9dxp@cluster0.6dbnm.mongodb.net/cafe?retryWrites=true&w=majority"

heroku config:get nombre            obtengo la nueva variable para usarla
heroku config
heroku config:unset nombre  elimino la variable de entorno
*/