const express = require('express');
const bodyParser = require('body-parser');

const db = require ('./db');

db('mongodb+srv://user:user1234@cluster0.64hbj.mongodb.net/user?retryWrites=true&w=majority');
// const router = require('./components/message/network');
const router = require('./network/routes');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(router);

router(app);
// app.use('/', function(req, res){
//     res.send('hola juan...ya estoy escuchando.');
// });


// router.post('/message', function( req, res){
//     res.send('Mensaje anadido- post');
// });

// !SERVIR ARCHIVOS ESTATICOS------------------
app.use('/app', express.static('public'));

// !-------------------------------------------
app.listen(3000);


console.log('La aplicacion esta escuchando en http://localhost:3000');