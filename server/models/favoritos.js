const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let favoritosSchema = new Schema({
    idsong: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'SongList'
    },
    artista: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Artista'
    }
});

favoritosSchema.plugin(uniqueValidator, {
    message: '{PATH} existente'
});

module.exports = mongoose.model('Favoritos', favoritosSchema);