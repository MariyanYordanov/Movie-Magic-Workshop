const { Schema, SchemaTypes: Types, model } = require('mongoose');

const movieSchema = new Schema({
    title: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        match: [/^[A-Za-z0-9 ]+$/gi, 'Title must contain only English letters, digits and spaces']
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
        match: [/^https?:\/\/.+/, 'Image URL must start with http:// or https://']
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    description: {
        type: String,
        minlength: 10,
        required: 1000
    },
    cast: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
});   

const Movie = model('Movie', movieSchema);

module.exports = { Movie };