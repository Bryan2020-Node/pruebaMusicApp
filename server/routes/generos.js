const express = require('express');
const Genero = require('../models/generos');

const { verificaToken } = require('../middlewares/autenticacion');

const jwt = require('jsonwebtoken');

const app = express();



//================================================
//================================================
//                    POST
//================================================
//================================================


//================================================
//      Crear Genero
//================================================
app.post('/nuevoGenero', (req, res) => {
    let body = req.body;

    let genero = new Genero({
        nombre_genero: body.nombre_genero
    });

    genero.save((err, generoDB) => {
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
                message: 'Genero creado correctamente'
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
//      Todos los Generos
//================================================
app.get('/listaGeneros', (req, res) => {

    Genero.find({}, 'nombre_genero')
        .sort('nombre_genero')
        .exec((err, generoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }

            if (generoDB.length === 0) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'Sin resultados'
                    }
                });
            }

            res.json({
                ok: true,
                items: generoDB.length,
                results: generoDB
            });
        });
});


//================================================
//      Filtrar Generos
//================================================
app.get('/filtrarGeneros', (req, res) => {
    let search = req.query.search;
    let regex = new RegExp(search, 'i');
    Genero.find({ nombre_genero: regex }, 'nombre_genero')
        .sort('nombre_genero')
        .exec((err, generoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }

            if (generoDB.length === 0) {
                return res.status(400).json({
                    ok: false,
                    items: generoDB.length,
                    error: {
                        message: 'Sin resultados'
                    }
                });
            }

            res.json({
                ok: true,
                items: generoDB.length,
                results: generoDB
            });
        });
});


module.exports = app;