// const { socket } = require('../../socket');
const store = require('./store');
const socket = require ('../../socket').socket;


function addMessage(chat, user, message, file) {
    // console.log('Usuario: '+user);
    // console.log('Mensaje: '+message);
    return new Promise((resolve, reject) => {
        if(!chat, !user || !message){
            console.error('[message controller] No hay usuario o mensaje')
            reject('Los datos son incorrectos');
            return false;
        }

        let fileUrl = '';
        if(file) {
            fileUrl = 'http://localhost:3000/app/files/'+ file.originalname;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        };
    
        store.add(fullMessage);

        socket.io.emit('message', fullMessage);
        // console.log(fullMessage);
        resolve(fullMessage);
    });
}

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    });
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        console.log(id);
        console.log(message);

        if(!id || !message) {
            reject('Invalid data');
            return false;
        }
       const result= await store.updateText(id, message);
       resolve(result);
    })
}

function deleteMessage(id) {
    return new Promise ((resolve, reject) => {
        if(!id) {
            reject('Id invalido');
            return false;
        }

        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,

}