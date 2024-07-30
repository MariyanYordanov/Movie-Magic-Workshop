const { createMovie } = require("../services/movie");

module.exports = {
    createGet: (req, res) => {
        res.render('create', {title: 'Create Page'});
    },
    createPost: async (req, res) => {
        const movie = await createMovie(req.body);
        res.redirect('/details/' + movie.id);
    }
    // TODO edit and delete
};