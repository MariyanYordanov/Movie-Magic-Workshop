const { getAllMovies, getMovieById, searchAsync } = require('../services/movie');

module.exports = {
    home: async (req, res) => {
        const movies = await getAllMovies();
        res.render('home', { movies, title: 'Home Page' });
    },
    details: async (req, res) => {
        const id = req.params.id;
        console.log(id);
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
