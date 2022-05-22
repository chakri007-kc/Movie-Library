const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        // movieslist: [{
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'Article'
        // }]
    },{
        collection: 'userdata'
    }
)

const model = mongoose.model('UserDate', User);
module.exports = model;