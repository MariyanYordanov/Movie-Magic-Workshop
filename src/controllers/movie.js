const { createMovie } = require("../services/movie");

module.exports = {
    createGet: (req, res) => {
        res.render('create', {title: 'Create Page'});
    },
    createPost: async (req, res) => {
        
        const movie = req.body;
        const result = await createMovie(movie);

        res.redirect('/', '301');
    }
};