const express = require('express');
const message = require('../components/message/network');
const user = require('../components/user/network');
const chat = require('../components/chat/network');


// ! EN LAS RUTAS VAMOS A CONFIGUGAR EL ACCESO Y REDIRIGIRLOS A LOS SERVICIOS
const routes = function(server) {
    server.use('/message', message);
    server.use('/user', user);
    server.use('/chat', chat);
}

module.exports = routes;