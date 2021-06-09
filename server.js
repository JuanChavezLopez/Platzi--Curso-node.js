const express = require('express');
const app = express();

const server = require('http').Server(app);

const cors = require('cors');

const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require ('./db');
const router = require('./network/routes');

db('mongodb+srv://user:user1234@cluster0.64hbj.mongodb.net/user?retryWrites=true&w=majority');
// const router = require('./components/message/network');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

socket.connect(server);
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
server.listen(3000, function() {
    console.log('La aplicacion esta escuchando en http://localhost:3000');
    
});

