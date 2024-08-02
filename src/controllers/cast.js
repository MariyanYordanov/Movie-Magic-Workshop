module.exports  = {
    castGet: (req, res) => {
        res.render('cast', { title: 'Create Cast Page' });
    },
    castPost: async (req, res) => {
        const { name, character } = req.body;
        if (!name || !character) {
            res.render('cast', { title: 'Create Cast Page', errors: { name: !name, character: !character }, cast: req.body });
            return;
        }
        const cast = await createCast(req.body);
        res.redirect('/cast');
    }
}