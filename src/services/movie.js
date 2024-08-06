const mongoose = require("mongoose");
const { Movie } = require("../models/Movie");
const { Cast } = require("../models/Cast");

async function getAllMovies() {
    const movies = await Movie.find().lean();
    return movies;
}

async function getMovieById(id) {
    const movie = await Movie.findOne({ _id: id }).lean().populate('cast');
    return movie;
}

async function createMovie(data) {
    const movie = new Movie();

    movie.title = data.title;
    movie.genre = data.genre;
    movie.director = data.director;
    movie.year = Number(data.year);
    movie.imageURL = data.imageURL;
    movie.rating = Number(data.rating);
    movie.description = data.description;
    
    await movie.save();
    return movie;
}

async function searchAsync(title, genre, year) {
    const movies = await getAllMovies();
    let result = movies;

    if (title) {
        result = result.filter((x) =>
            x.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (genre) {
        result = result.filter((x) =>
            x.genre.toLowerCase().includes(genre.toLowerCase())
        );
    }

    if (year) {
        result = result.filter((x) => x.year == year);
    }

    return result;
}

async function createCast(data) {
    const cast = new Cast();

    cast.name = data.name;
    cast.character = data.character;
    cast.age = data.age;
    cast.born = data.born;
    cast.imageURL = data.imageURL;

    await cast.save();
    return cast;
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    searchAsync,
    createCast
};
