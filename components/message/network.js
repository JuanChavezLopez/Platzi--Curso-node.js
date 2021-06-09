
const express = require('express');

// !para enviar archivos

const multer = require('multer');

const response = require('../../network/response'); // hacemos la conexion con el archivo externo

const controller = require('./controller');

const router = express.Router();

// !SUBIR ARCHIVOS--------------

const upload = multer ({
    dest: 'public/files/',
});

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
});

// !INYECTAMOS INFORMACION
// !aca tambien esta el archivo enviado junto el el archivo file
router.post('/', upload.single('file'), function( req, res){
    // console.log(req.query);
    // console.log(req.file.originalname);
    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)

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

});


// !ELIMINAMOS INFORMACION
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