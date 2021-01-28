const express = require('express');
const Favoritos = require('../models/favoritos');

const { verificaToken } = require('../middlewares/autenticacion');

const jwt = require('jsonwebtoken');

const app = express();



//================================================
//================================================
//                    POST
//================================================
//================================================


//================================================
//      Añadir a favorito
//================================================
app.post('/addFavorito', (req, res) => {
    let body = req.body;

    let favorito = new Favoritos({
        idsong: body.idsong,
        artista: body.artista
    });

    favorito.save((err, favoritoDB) => {
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
                message: 'Añadido correctamente'
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
//      Mis favoritos
//================================================
app.get('/misFavoritos', (req, res) => {

    Favoritos.find({})
        .sort('nombre_genero')
        .populate('idsong', 'titulo')
        .populate('artista', 'nombre_artista')
        .exec((err, favoritoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: err
                    }
                });
            }

            if (favoritoDB.length === 0) {
                return res.status(400).json({
                    ok: false,
                    items: favoritoDB.length,
                    error: {
                        message: 'Sin resultados'
                    }
                });
            }

            res.json({
                ok: true,
                items: favoritoDB.length,
                results: favoritoDB
            });
        });
});


// //================================================
// //      Filtrar Generos
// //================================================
// app.get('/filtrarGeneros', (req, res) => {
//     let search = req.query.search;
//     let regex = new RegExp(search, 'i');
//     Genero.find({ nombre_genero: regex }, 'nombre_genero')
//         .sort('nombre_genero')
//         .exec((err, generoDB) => {
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     error: {
//                         message: err
//                     }
//                 });
//             }

//             if (generoDB.length === 0) {
//                 return res.status(400).json({
//                     ok: false,
//                     items: generoDB.length,
//                     error: {
//                         message: 'Sin resultados'
//                     }
//                 });
//             }

//             res.json({
//                 ok: true,
//                 items: generoDB.length,
//                 results: generoDB
//             });
//         });
// });


module.exports = app;