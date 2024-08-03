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
        };

        if(Object.values(errors).includes(true)){
            res.render('cast-create', {title: 'Create Error Page', errors, cast: req.body});
            return;
        }
        try {
            const cast = await createCast(req.body);

            // Логиране на върнатия обект за отстраняване на грешки
            console.log('Created movie:', cast);

            if (!cast || !cast._id) {
                throw new Error('Movie creation failed or missing _id');
            }

            res.redirect('/details/' + cast._id);
        } catch (error) {
            console.error('Error creating movie:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};