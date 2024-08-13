const { Schema, SchemaTypes: Types, model } = require('mongoose');

const movieSchema = new Schema({
    title: { 
        type: String,
        required: true,
        minlength: [5, 'Title must be at least 5 characters long'],
        maxlength: [50, 'Title must be less than 50 characters'],
        match: [/^[A-Za-z0-9 ]+$/gi, 'Title must contain only English letters, digits and spaces']
    },
    genre: {
        type: String,
        required: true,
        maxlength: [50, 'Genre name must be less than 50 characters']
    },
    director: {
        type: String,
        required: true,
        maxlength: [50, 'Director name must be less than 50 characters']
    },
    year: {
        type: Number,
        required: true,
        min: [1900, 'Year must be at least 1900'],
        max: [(new Date().getFullYear() + 2), 'Year must be less than the next year']
    },
    imageURL: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Image URL must start with http:// or https://']
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must be less than 10']
    },
    description: {
        type: String,
        minlength: [10, 'Description must be at least 10 characters long'],
        required: [1000, 'Description must be less than 1000 characters']
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