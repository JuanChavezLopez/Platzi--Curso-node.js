
const express = require('express');

const response = require('../../network/response'); // hacemos la conexion con el archivo externo

const controller = require('./controller');

const router = express.Router();

router.get('/', function( req, res){
    console.log(req.headers);
    res.header({
        "custom-header": "Nuestro valor personalizado",
    });
    // res.send('Lista de mensajes');
    response.success(req, res, 'Lista de mensajes');
});

router.post('/', function( req, res){
    // console.log(req.query);

    controller.addMessage(req.body.user, req.body.message)

    // !como estamos trabajando con promesas
    .then((fullMessage) => {
        response.success(req, res, fullMessage, 201);
    })
    .catch(e => {
        response.error(req, res, 'Informacion invalida', 400, 'Error en el controlador');
    });
});

module.exports = router;