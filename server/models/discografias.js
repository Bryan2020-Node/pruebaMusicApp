const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let discografiaSchema = new Schema({
    nombre_disco: {
        type: String,
        required: [true, 'El nombre del disco es necesario'],
        unique: true
    },
    idartista: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Artista'
    },
    anio: {
        type: Number,
        required: [true, 'El año es obligatorio']
    },
    urlPortada: {
        type: String,
        default: null
    }
});

discografiaSchema.plugin(uniqueValidator, {
    message: '{PATH} existente'
});

module.exports = mongoose.model('Disco', discografiaSchema);