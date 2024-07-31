const { getAllMovies, getMovieById } = require('../services/movie');

module.exports = {
    home: async (req, res) => {
        try {
            const movies = await getAllMovies();
            res.render('home', { movies, title: 'Home Page' });
        } catch (error) {
            console.error('Error during fetching home page movies:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    details: async (req, res) => {
        const id = req.params.id;
        try {
            const movie = await getMovieById(id);
            if (!movie) {
                res.status(404).render('404', { title: 'Movie Not Found' });
                return;
            }
            res.render('details', { movie, title: 'Details Page' });
        } catch (error) {
            console.error('Error during fetching movie details:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    search: async (req, res) => {
        res.render('search', { title: 'Search Page' });
    }
}
