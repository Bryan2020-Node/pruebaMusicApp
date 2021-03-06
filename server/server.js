require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');
//cors para acceder a la api desde cualquier pagina
app.use(cors());

app.use(express.static(__dirname + '../..//public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;

    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', 3000);
});