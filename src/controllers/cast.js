const { createCast } = require('../services/cast');
const { isUser } = require('../middlewares/guards');

const { getAllCasts, attachCast} = require('../services/cast');
const { getMovieById } = require('../services/movie');

const { Router } = require('express');

const castRouter = Router();

castRouter.get('/cast-create', isUser, (req, res) => {
    res.render('cast-create', { title: 'Create Cast Page' });
});

castRouter.post('/cast-create', isUser, async (req, res) => {
    const errors = {
        name: !req.body.name,
        age: !req.body.age,
        born: !req.body.born,
        nameInMovie: !req.body.nameInMovie,
        imageURL: !req.body.imageURL
    };

    if(Object.values(errors).includes(true)){
        res.render('cast-create', {title: 'Error Create Page', errors, cast: req.body});
        return;
    }

    try {
        const cast = await createCast(req.body);
        res.redirect('/');
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).send('Internal Server Error');
    }
});

castRouter.get('/attach/:id', isUser, async (req, res) => {

    const id = req.params.id;
    
    const movie = await getMovieById(id);
        if (!movie) {
            res.status(404).render('404', { title: 'Error Detail Page' });
            return;
        }

    const allCasts = await getAllCasts();

    res.render('cast-attach', { movie, allCasts, title: 'Attach Cast Page' });
});

castRouter.post('/attach/:id', isUser, async (req, res) => {

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

        res.render('cast-attach',  { movie, allCasts, error: true, title: 'None Cast'});

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
});

module.exports  = { castRouter };