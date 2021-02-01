const express = require('express');
const Disco = require('../models/discografias');

const { verificaToken } = require('../middlewares/autenticacion');

const jwt = require('jsonwebtoken');

const app = express();



//================================================
//================================================
//                    POST
//================================================
//================================================


//================================================
//      Alta de Discografias
//================================================
app.post('/nuevoDisco', (req, res) => {
    let body = req.body;

    let disco = new Disco({
        nombre_disco: body.nombre_disco,
        idartista: body.idartista,
        anio: body.anio,
        urlPortada: body.urlPortada
    });

    disco.save((err, discoDB) => {
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
                message: 'Disco agregado correctamente'
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
//      Todos los Discos
//================================================
app.get('/listaDiscografias', (req, res) => {

    Disco.find({}, 'nombre_disco anio urlPortada')
        .sort('nombre_disco')
        .populate('idartista', 'nombre_artista')
        .exec((err, discoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }

            if (discoDB.length === 0) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'Sin resultados'
                    }
                });
            }

            res.json({
                ok: true,
                items: discoDB.length,
                results: discoDB
            });
        });
});



//================================================
//      Filtrar Discos
//================================================
app.get('/filtrarDiscografias', (req, res) => {
    let search = req.query.search;
    let regex = new RegExp(search, 'i');
    Disco.find({ nombre_disco: regex }, 'nombre_disco anio urlPortada')
        .sort('nombre_disco')
        .populate('idartista', 'nombre_artista')
        .exec((err, discoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }

            if (discoDB.length === 0) {
                return res.status(400).json({
                    ok: false,
                    items: discoDB.length,
                    error: {
                        message: 'Sin resultados'
                    }
                });
            }

            res.json({
                ok: true,
                items: discoDB.length,
                results: discoDB
            });
        });
});


//================================================
//      Filtrar Discos Por Artista
//================================================
app.get('/filtrarDiscoArtista', (req, res) => {
    let search = req.query.search;
    let regex = new RegExp(search, 'i');
    Disco.find({ idartista: regex }, 'nombre_disco anio urlPortada')
        .sort('nombre_disco')
        // .populate('idartista', 'nombre_artista')
        .exec((err, discoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }

            if (discoDB.length === 0) {
                return res.status(400).json({
                    ok: false,
                    items: discoDB.length,
                    error: {
                        message: 'Sin resultados'
                    }
                });
            }

            res.json({
                ok: true,
                items: discoDB.length,
                results: discoDB
            });
        });
});



module.exports = app;