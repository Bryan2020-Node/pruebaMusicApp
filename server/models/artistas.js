const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let artistaSchema = new Schema({
    nombre_artista: {
        type: String,
        required: [true, 'El Artista es necesario'],
        unique: true
    },
    idgenero: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Genero'
    },
    vocalista: {
        type: String,
        default: null
    }
});

artistaSchema.plugin(uniqueValidator, {
    message: '{PATH} existente'
});

module.exports = mongoose.model('Artista', artistaSchema);