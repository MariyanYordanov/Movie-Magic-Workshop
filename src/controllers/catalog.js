const { getAllMovies, getMovieById } = require("../services/movie");

module.exports = {
    home: async (req, res) => {
        const movies = await getAllMovies();
        res.render('home', {movies, title: 'Home Page'});
    },
    details: async (req, res) => {

        const id = req.params.id;
        const movie = await getMovieById(id);

        if(!movie){
            res.render('404', {title: 'Movie Not Found'});
            return;
        }

        res.render(`details`, {movie, title: 'Details Page'});
    },
    search: (req, res) => {
        res.render('search', {title: 'Search Page'});
    }
};