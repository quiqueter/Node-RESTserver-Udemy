

// DECLARAMOS VARIABLES Y CONSTANTES DE FORMA GLOBAL COMO P.E Process


// -----------------------
//   PUERTO
// -----------------------
process.env.PORT = process.env.PORT || 3000;
console.log(`2 Escuchando el puerto : ${process.env.PORT}`);

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
    urlDB = 
    'mongodb+srv://quiqueter:ud4xrQ69Zo1m9dxp@cluster0.6dbnm.mongodb.net/cafe?retryWrites=true&w=majority'
   ;
};
console.log(`urlDB : ${urlDB}`);

process.eventNames.URLDB = urlDB;


