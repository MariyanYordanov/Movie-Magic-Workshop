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


async function attachCast(movieId, castId) {

    const movie = await Movie.findOne().where("_id").equals(movieId);

    if (!movie || !cast) {
        return false;
    }

    if(movie.cast.includes(castId)){
        return false;

    }

    const cast = await Cast.findOne().where("_id").equals(castId);

    if (!cast) {
        return false;
    }

    movie.cast.push(cast);
    await movie.save();
    
    return true;
};

module.exports = { createCast, getCastByIdAsync, attachCast};
