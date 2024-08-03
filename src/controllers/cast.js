const { createCast, getCastById } = require('../services/cast');

module.exports  = {
    castGet: (req, res) => {
        res.render('cast-create', { title: 'Create Cast Page' });
    },
    castPost: async (req, res) => {
        const errors = {
            name: !req.body.name,
            characterName: !req.body.characterName,
            age: !req.body.age,
            born: !req.body.born,
            imageURL: !req.body.imageURL,
            movie: !req.body.movie,
        };

        if(Object.values(errors).includes(true)){
            res.render('cast-create', {title: 'Create Error Page', errors, cast: req.body});
            return;
        }

        const cast = await createCast(req.body);
        res.redirect('/');
    }
};