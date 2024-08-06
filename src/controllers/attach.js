const { getCastByIdAsync, getAllCasts} = require('../services/cast');
const { getMovieById } = require('../services/movie');
const movie = require('./movie');

module.exports = {
    attachGet: async (req, res) => {

        const id = req.params.id;
        console.log(id);
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

        if(!movieId || !castId){
            res.status(400, 'Bad Request').end();
            return;
        }

        const movie = await getMovieById(movieId);

        if(castId === 'none'){
            const allCasts = await getAllCasts();
            res.render('cast-attach',  {movie, allCasts, error: true, title: 'None Cast'});
            return;
        }

        


    //     if (movie.cast.includes(castId)) {
    //         res.render('404');
    //         return;
    //     }

    //     const cast = await getCastByIdAsync(castId);

    //     if (!cast) {
    //         res.render('404');
    //         return;
    //     }

    //     movie.cast.push(cast);
    //     await movie.save();

    //     res.redirect(`/details/${movieId}`);
    }
};