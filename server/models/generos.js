const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let generoSchema = new Schema({
    nombre_genero: {
        type: String,
        unique: true,
        required: [true, 'El nombre del genero es requerido']
    },
});

generoSchema.plugin(uniqueValidator, {
    message: '{PATH} existente'
});

module.exports = mongoose.model('Genero', generoSchema);