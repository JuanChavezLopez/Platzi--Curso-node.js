
const express = require('express');

const response = require('../../network/response'); // hacemos la conexion con el archivo externo

const controller = require('./controller');

const router = express.Router();

// !PEDIMOS INFORMACION
router.get('/', function( req, res){
    const filterMessages = req.query.user || null;


    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200)
        })
        .catch( e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        })
    // console.log(req.headers);
    // res.header({
    //     "custom-header": "Nuestro valor personalizado",
    // });
    // res.send('Lista de mensajes');
    // response.success(req, res, 'Lista de mensajes');
});

// !INYECTAMOS INFORMACION

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

// !ACTUALIZAMOS INFORMACION

router.patch('/:id', function(req, res){
    console.log(req.params.id);

    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch( e => {
            response.error(req, res, 'Error interno', 500, e);
        });

    // res.send('ok');
});

router.delete('/:id', function(req, res){
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch( e => {
            response.error(req, res, 'Error interno', 500, e);
        })
})

module.exports = router;