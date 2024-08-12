const { getAllCasts, attachCast} = require('../services/cast');
const { getMovieById } = require('../services/movie');
const movie = require('./movie');

module.exports = {
    attachGet: async (req, res) => {

        const id = req.params.id;
        
        const movie = await getMovieById(id);
            if (!movie) {
                res.status(404).render('404', { title: 'Movie Not Found' });
                return;
            }

        const allCasts = await getAllCasts();

        res.render('cast-attach', {movie, allCasts, title: 'Attach Cast'});
    },
    attachPost: async (req, res) => {

        const movieId = req.params.id;
        const castId = req.body.cast;
        const creatorId = req.user._id;

        if(!movieId || !castId){
            res.status(400, 'Bad Request').end();
            return;
        }

        if(castId == 'none'){

            const movie = await getMovieById(movieId);
            const allCasts = await getAllCasts();

            res.render('cast-attach',  {movie, allCasts, error: true, title: 'None Cast'});

            return;
        }

        try {
            await attachCast(movieId, castId, creatorId);

        } catch (error) {
            console.log(error.message);
            res.status(400).render('404', { title: 'Cast Not Found' });
            return;
        }

        res.redirect(`/details/${movieId}`);
    }
};