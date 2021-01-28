const express = require('express');
const Song = require('../models/songs');

const { verificaToken } = require('../middlewares/autenticacion');

const jwt = require('jsonwebtoken');

const app = express();



//================================================
//================================================
//                    POST
//================================================
//================================================


//================================================
//      Alta de Canciones
//================================================
app.post('/nuevaCancion', (req, res) => {
    let body = req.body;

    let song = new Song({
        titulo: body.titulo,
        urlSong: body.urlSong,
        iddisco: body.iddisco,
        idartista: body.idartista
    });

    song.save((err, songDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: err
                }
            });
        }

        res.json({
            ok: true,
            results: {
                message: 'Cancion agregada correctamente'
            }
        });
    });
});


//================================================
//================================================
//                    GET
//================================================
//================================================


//================================================
//      Todas las canciones
//================================================
app.get('/listaCanciones', (req, res) => {

    Song.find({}, 'titulo urlSong urlPortada')
        .sort('titulo')
        .populate('iddisco', 'urlPortada nombre_disco')
        .populate('idartista', 'nombre_artista')
        .exec((err, songDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }

            if (songDB.length === 0) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'Sin resultados'
                    }
                });
            }

            res.json({
                ok: true,
                items: songDB.length,
                results: songDB
            });
        });
});



//================================================
//      Filtro de canciones
//================================================
app.get('/filtrarCanciones', (req, res) => {
    let search = req.query.search;
    let regex = new RegExp(search, 'i');
    Song.find({ titulo: regex }, 'titulo urlSong urlPortada')
        .sort('titulo')
        .populate('iddisco', 'urlPortada nombre_disco')
        .populate('idartista', 'nombre_artista')
        .exec((err, songDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }

            if (songDB.length === 0) {
                return res.status(400).json({
                    ok: false,
                    items: songDB.length,
                    error: {
                        message: 'Sin resultados'
                    }
                });
            }

            res.json({
                ok: true,
                items: songDB.length,
                results: songDB
            });
        });
});

module.exports = app;