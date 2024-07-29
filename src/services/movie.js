const fs = require('fs');
const Movie = require('../models/Movie');

const filePath = './data/movies.json';

async function readFileAsync() {
    const data = await fs.readFile(filePath);
    return JSON.parse(data.toString());
};

async function writeFileAsync(data) {
    await fs.writeFile(filePath, JSON.stringify(data));
};

async function toMovieModel(data) {
    const movie = new Movie();

    movie.id = data.id;
    movie.title = data.title;
    movie.genre = data.genre;
    movie.director = data.director;
    movie.year = data.year;
    movie.imageURL = data.imageURL;
    movie.rating = data.rating;
    movie.description = data.description;

    return movie;
}

async function getAllMovies() {
    const movies = await readFileAsync();
    return movies.map(toMovieModel);
}

async function getMovieById(id) {
    const movies= await readFileAsync();
    const movie = movies.find(x => x.id === id);
    if(!movie){
        return undefined;
    }
    return toMovieModel(movie);
}

module.exports = { 
    getAllMovies,
    getMovieById
};