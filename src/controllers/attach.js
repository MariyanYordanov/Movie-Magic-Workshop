const { getCastByIdAsync, getAllCasts} = require('../services/cast');
const { getMovieById } = require('../services/movie');

module.exports = {
    attachGet: async (req, res) => {

        const id = req.params.id;
        console.log(id);
        const movie = await getMovieById(id);

        if(!movie) {
            res.render('404');
            return;
        }

        const allCasts = await getAllCasts();

        console.log(allCasts);

        res.render('cast-attach', {movie, allCasts, title: 'Attach Cast'});
    },
    attachPost: async (req, res) => {
        const movieId = req.params._id;
        const castId = req.body.cast._id;

        const movie = await getMovieById(movieId);

        if (!movie) {
            res.render('404');
            return;
        }

        if (movie.cast.includes(castId)) {
            res.render('404');
            return;
        }

        const cast = await getCastByIdAsync(castId);

        if (!cast) {
            res.render('404');
            return;
        }

        movie.cast.push(cast);
        await movie.save();

        res.redirect(`/details/${movieId}`);
    }
};