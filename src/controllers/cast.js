const { createCast } = require('../services/cast');

module.exports  = {
    castGet: (req, res) => {
        res.render('cast-create', { title: 'Create Cast Page' });
    },
    castPost: async (req, res) => {
        const errors = {
            name: !req.body.name,
            age: !req.body.age,
            born: !req.body.born,
            nameInMovie: !req.body.nameInMovie,
            imageURL: !req.body.imageURL
        };

        if(Object.values(errors).includes(true)){
            res.render('cast-create', {title: 'Create Error Page', errors, cast: req.body});
            return;
        }
        try {
            const cast = await createCast(req.body);
            res.redirect('/');
        } catch (error) {
            console.error('Error creating movie:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};