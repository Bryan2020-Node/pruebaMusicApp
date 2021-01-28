const express = require('express');
const Artista = require('../models/artistas');

const { verificaToken } = require('../middlewares/autenticacion');

const jwt = require('jsonwebtoken');

const app = express();



//================================================
//================================================
//                    POST
//================================================
//================================================


//================================================
//      Alta de Artistas
//================================================
app.post('/nuevoArtista', (req, res) => {
    let body = req.body;

    let artista = new Artista({
        nombre_artista: body.nombre_artista,
        idgenero: body.idgenero,
        vocalista: body.vocalista
    });

    artista.save((err, artistaDB) => {
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
                message: 'Artista creado correctamente'
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
//      Todos los Artistas
//================================================
app.get('/listaArtistas', (req, res) => {

    Artista.find({})
        .sort('nombre_artista')
        .populate('idgenero', 'nombre_genero')
        .exec((err, artistaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }

            if (artistaDB.length === 0) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'Sin resultados'
                    }
                });
            }

            console.log(artistaDB);
            res.json({
                ok: true,
                items: artistaDB.length,
                results: artistaDB
            });
        });
});

//================================================
//      Filtrar Artistas
//================================================
app.get('/filtrarArtistas', (req, res) => {
    let search = req.query.search;
    let regex = new RegExp(search, 'i');
    Artista.find({ nombre_artista: regex })
        .sort('nombre_artista')
        .populate('idgenero', 'nombre_genero')
        .exec((err, artistaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }

            if (artistaDB.length === 0) {
                return res.status(400).json({
                    ok: false,
                    items: artistaDB.length,
                    error: {
                        message: 'Sin resultados'
                    }
                });
            }

            console.log(artistaDB);
            res.json({
                ok: true,
                items: artistaDB.length,
                results: artistaDB
            });
        });
});



module.exports = app;