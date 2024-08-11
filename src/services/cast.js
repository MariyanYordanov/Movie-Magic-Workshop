const { Cast } = require("../models/Cast");
const { Movie } = require("../models/Movie");
const mongoose = require("mongoose");

async function createCast(data) {
    const cast = new Cast({
        name: data.name,
        age: data.age,
        born: data.born,
        nameInMovie: data.nameInMovie,
        imageURL: data.imageURL,
    });

    await cast.save();
    return cast;
}

async function getCastByIdAsync(id) {
    const cast = await Cast.findOne({ _id: id }).lean();
    return cast;
}

async function attachCast(movieId, castId, userId) {
    
    const movie = await Movie.findById(movieId);

    if(userId != movie.creator.toString()){
        throw new Error('Access denied');
    }

    if (!movie) {
        throw new Error("Movie not found");
    }

    if(movie.cast.includes(castId)){
        throw new Error("Cast already attached");
    }

    const cast = await Cast.findOne().where("_id").equals(castId);

    if (!cast) {
        throw new Error("Cast not found");
    }

    movie.cast.push(cast);
    await movie.save();
    
    return movie;
};

async function getAllCasts(){
    const casts = await Cast.find().lean();
    return casts;
}

module.exports = { createCast, getCastByIdAsync, attachCast, getAllCasts };
