const { getAllMovies, getMovieById, searchAsync } = require('../services/movie');
const { Router } = require('express');

const catalogController = Router();

catalogController.get('/', async (req, res) => {
    const movies = await getAllMovies();
    res.render('home', { movies, title: 'Home Page' });
});

catalogController.get('/about', (req, res) => {
    res.render('about', {title: 'About Page'});
});

catalogController.get('/search', async (req, res) => {
    const { title, genre ,year } = req.query;
    if (!title && !genre && !year) {
        res.render('search', { title: 'Non-Query Page' });
        return;
    }
    const movies = await searchAsync( title, genre, year);
    console.log(movies);
    res.render('search', { movies, title: 'Search Page' });
});

catalogController.get('/details/:id',  async (req, res) => {
    const id = req.params.id;
    let movie;
    try{
        movie = await getMovieById(id);
    } catch {
        res.status(404).render('404', { title: 'Error Details Page' });
        return;
    }

    movie.isCreator = req.user?._id == movie.creator;
    res.render('details', { movie });
});

catalogController.get('/404', (req, res) => {
    res.render('404', {title: 'Page Not Found'});
});

catalogController.get('*', (req, res) => {
    res.render('404', {title: 'Page Not Found'});
});

catalogController.all('*', (req, res) => {
    res.render('404', {title: 'Page Not Found'});
});

module.exports = { catalogController };