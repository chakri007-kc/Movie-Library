const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;

const listSchema = new mongoose.Schema({
    listName:{
        type: String,
        required: true
    },
    movieList:[{}],
    public:{
        type: Boolean,
        required: true
    },
    postedBy:{
        type: ObjectId,
        ref: 'User',
    }
    },{
        collection: 'listdata'
    }

)

const List = mongoose.model('List', listSchema);
module.exports = List;