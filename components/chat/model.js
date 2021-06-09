const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    users: [{
        type: Schema.ObjectId,
        ref: 'User',

    }
    ]
        
});

// !------------- usar el esquema -----------------------

const model = mongoose.model('chat', mySchema);
module.exports = model;