const express = require('express');
const app = express();

app.use(require('./generos'));
app.use(require('./artistas'));
app.use(require('./discografias'));
app.use(require('./songs'));
app.use(require('./favoritos'));


module.exports = app;