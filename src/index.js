// Métodos HTTP: GET, POST, PUT, DELETE
// tipos de parâmetros:
//Query params: request.query (Filtros, ordenação e paginação...)
//Route params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de registro)
//MongoDB (Não-relacional)
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-8dvtv.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);