const { Schema, SchemaTypes: Types, model } = require('mongoose');

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    },
    born: {
        type: String,
        required: true,
        maxlength: 50
    },
    nameInMovie: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageURL: {
        type: String,
        required: true,
        default: '/img/logo.png',
        //match: [/^https?:\/\//, 'Image URL must be a valid URL']
    },
    movie: [{
        type: Types.ObjectId,
        ref: 'Movie'
    }]
});

const Cast = model('Cast', castSchema);

module.exports = { Cast };