const { getCastByIdAsync } = require('../services/cast');
const { attachCast } = require('../services/cast');

module.exports = {
    attachGet: async (req, res) => {
        res.render('cast-attach', { title: 'Attach Page' });
    },
    attachPost: async (req, res) => {
        const { id } = req.params._id;
        const { movie } = req.body;

        await getCastByIdAsync(id);
        await attachCast(movie, id);

        res.redirect('/');
    }
};