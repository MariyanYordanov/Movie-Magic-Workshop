const { getAllMovies, getMovieById, searchAsync } = require('../services/movie');

module.exports = {
    home: async (req, res) => {
        const movies = await getAllMovies();
        res.render('home', { movies, title: 'Home Page' });
    },
    details: async (req, res) => {
        const id = req.params.id;
        
        const movie = await getMovieById(id);
            if (!movie) {
                res.status(404).render('404', { title: 'Movie Not Found' });
                return;
            }
            const isCreator = req.user && req.user._id == movie.creator;
            console.log(req.user._id);
            console.log(movie.creator);
            console.log(req.user);
            console.log(isCreator);
            res.render('details', { movie, isCreator, title: 'Details Page' });
    },
    search: async (req, res) => {
        const { title, genre ,year } = req.query;
        if (!title && !genre && !year) {
            res.render('search', { title: 'Non-Query Page' });
            return;
        }
        const movies = await searchAsync( title, genre, year);
        console.log(movies);
        res.render('search', { movies, title: 'Search Page' });
    }
}
