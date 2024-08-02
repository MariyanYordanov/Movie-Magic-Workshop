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
    charecterName: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageURL: String,
    movie: [{
        type: Types.ObjectId,
        ref: 'Movie'
    }]
});

const Cast = model('Cast', castSchema);

module.exports = { Cast };