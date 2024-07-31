const fs = require("fs/promises");
const { Movie } = require("../models/Movie");

const filePath = "./data/database.json";

async function readFileAsync() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data.toString());
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function writeFileAsync(data) {
  await fs.writeFile(filePath, JSON.stringify(data));
}

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
  const allMovies = await readFileAsync();
  const movies = allMovies.map((x) => toMovieModel(x));
  return movies;
}

async function getMovieById(id) {
  const movies = await readFileAsync();
  const movie = movies.find((x) => x.id == id);

  return movie ? toMovieModel(movie) : movie;
}

async function createMovie(data) {
  const movie = new Movie();
  const id = await uuid();

  movie.id = id;
  movie.title = data.title;
  movie.genre = data.genre;
  movie.director = data.director;
  movie.year = data.year;
  movie.imageURL = data.imageURL;
  movie.rating = data.rating;
  movie.description = data.description;

  const movies = await readFileAsync();
  movies.push(movie);
  await writeFileAsync(movies);

  return toMovieModel(movie);
}

async function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function searchAsync(query) {
  const movies = await readFileAsync();
  const url = new URLSearchParams(query);
  const title = url.get("title");
  const genre = url.get("genre");
  const year = url.get("year");

  const result = movies.filter(
    (x) =>
      x.title.includes(title) ||
      x.genre.includes(genre) ||
      x.year.includes(year)
  );
  return result.map((x) => toMovieModel(x));
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  searchAsync,
};
