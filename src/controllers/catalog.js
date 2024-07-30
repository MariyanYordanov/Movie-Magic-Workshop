const { getAllMovies } = require("../services/movie");

module.exports = {
    home: async (req, res) => {
        const movies = await getAllMovies();
        res.render('home', {movies});
    },
    details: (req, res) => {
        res.render('details', {title: 'Details Page'});
    },
    search: (req, res) => {
        res.render('search', {title: 'Search Page'});
    }
};