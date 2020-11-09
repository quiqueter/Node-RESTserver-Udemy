
// Trabajara el modelo de datos
const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

let rolesVarios = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 'SUPER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

//Definimos el squema

let usuarioSquema = new Schema({
    nombre: {
        type: String,
        //Mensaje que enviare cuando la condicion no se cumpla
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El Contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        /*required: [true, 'El role es obligatorio'],*/
        default: 'USER_ROLE',
        // El role debe existir
        enum: rolesVarios
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


// No regresamos la contraseña
// El toJSON en un esquema se llama siempre cuando se intenta imprimir, como en este caso
// lo transformamos en una funcion para modificarlo
usuarioSquema.methods.toJSON = function() {
    
    let user = this;
    // Coje el objeto de ese usuario, obtenemos propiedades y metodos
    let usuerObject = user.toObject();
    // Borramos del objeto la contraseña
    delete usuerObject.password;
    // Devolvemos el objeto
    return usuerObject;
}

// Añadimos un pluggin para sacar un mensaje mas claro
usuarioSquema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});

// Esportamos el modelo Usuario
// Nombre y configuracion de usuario
module.exports = mongoose.model('Usuario', usuarioSquema)