function addMessage(user, message) {
    // console.log('Usuario: '+user);
    // console.log('Mensaje: '+message);
    return new Promise((resolve, reject) => {

        if(!user || !message){
            console.error('[message controller] No hay usuario o mensaje')
            reject('Los datos son incorrectos');
            return false;
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        };
    
        console.log(fullMessage);
        resolve(fullMessage);
    });



}

module.exports = {
    addMessage,
}