const mongoose = require("mongoose");
const { Movie } = require("../models/Movie");

async function getAllMovies() {
  const movies = await Movie.find().lean();
  return movies;
}

async function getMovieById(id) {
  const movie = await Movie.findOne({ _id: id }).lean().populate("cast");
  return movie;
}

async function createMovie(data) {
  const movie = new Movie();

  movie.title = data.title;
  movie.genre = data.genre;
  movie.director = data.director;
  movie.year = data.year;
  movie.imageURL = data.imageURL || '/img/logo.png';
  movie.rating = data.rating;
  movie.description = data.description;
  movie.cast = data.cast || [];

  await movie.save();
  return movie;
}

async function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function searchAsync(title, genre, year) {
  const movies = await getAllMovies();
  let result = movies;

  if (title) {
    result = result.filter((x) => x.title.toLowerCase().includes(title.toLowerCase()));
  }

  if (genre) {
    result = result.filter((x) => x.genre.toLowerCase().includes(genre.toLowerCase()));
  }

  if (year) {
    result = result.filter((x) => x.year == year);
  }

  return result;
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  searchAsync,
};
