const fs = require('fs');
const Movie = require('../models/Movie');

const filePath = './data/movies.json';

async function readFileAsync() {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
}

async function writeFileAsync(data) {
    await fs.promises.writeFile(filePath, JSON.stringify(data));
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
    
    return movie ? toMovieModel(movie) : movie;
}

module.exports = { 
    getAllMovies,
    getMovieById
};