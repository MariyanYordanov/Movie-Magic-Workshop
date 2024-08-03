const { createCast, getCastById } = require('../services/cast');

module.exports  = {
    castGet: (req, res) => {
        res.render('cast-create', { title: 'Create Cast Page' });
    },
    castPost: async (req, res) => {
        const { name, characterName } = req.body;
        if (!name || !characterName) {
            res.render('cast-create', { title: 'Non-Data Page', errors: { name: !name, characterName: !characterName }, cast: req.body });
            return;
        }
        const cast = await createCast(req.body);
        res.redirect('/cast-create', { title: 'Create Cast Page', cast });
    }
};