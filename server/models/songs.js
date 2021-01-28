const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const songSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        unique: true
    },
    urlSong: {
        type: String,
        required: [true, 'La url es Obligatoria'],
        unique: true
    },
    iddisco: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Disco'
    },
    idartista: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Artista'
    },

});

songSchema.plugin(uniqueValidator, {
    message: '{PATH} existente'
});


module.exports = mongoose.model('SongList', songSchema);