const { Schema, SchemaTypes: Types, model } = require('mongoose');

const movieSchema = new Schema({
    title: { 
        type: String,
        required: true,
        maxlength: 50,
    },
    genre: {
        type: String,
        required: true,
        maxlength: 50
    },
    director: {
        type: String,
        required: true,
        maxlength: 50
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear()
    },
    imageURL: {
        type: String,
        required: true,
        default: 'http://localhost:3000/src/static/img/logo.webp',
        validate: /^http?/
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    description: {
        type: String,
        required: 1000
    },
    cast: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }]
});   

const Movie = model('Movie', movieSchema);

module.exports = { Movie };