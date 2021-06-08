const db = require('mongoose');

// mongodb://user:user1234@ds255107.mlab.com:55107/telegrom
db.Promise = global.Promise;


async function connect(url) {
   await  db
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        .then((db) => console.log("Mongodb is connected to", db.connection.host))
        .catch((err) => console.log(err));
    
    console.log('[db conectada con exito');
}

module.exports = connect;