const { Schema, SchemaTypes: Types, model } = require('mongoose');

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: [50, 'Name must be less than 50 characters']
    },
    age: {
        type: Number,
        required: true,
        min: [1, 'Age must be at least 1'],
        max: [120, 'Age must be less than 120']
    },
    born: {
        type: String,
        required: true,
        maxlength: [50, 'Born place must be less than 50 characters']
    },
    nameInMovie: {
        type: String,
        required: true,
        maxlength: [50, 'Name in movie must be less than 50 characters']
    },
    imageURL: {
        type: String,
        required: true,
        default: '/img/logo.png',
        match: [/^https?:\/\//, 'Image URL must be a valid URL']
    },
    movie: [{
        type: Types.ObjectId,
        ref: 'Movie'
    }]
});

const Cast = model('Cast', castSchema);

module.exports = { Cast };