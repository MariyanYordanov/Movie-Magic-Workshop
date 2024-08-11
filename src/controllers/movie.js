const { createMovie, getMovieById } = require("../services/movie");

module.exports = {
    createGet: (req, res) => {
        res.render("create", { title: "Create Page" });
    },
    createPost: async (req, res) => {
        const creatorId = req.user._id; 
        // guard clause
        const errors = {
            title: !req.body.title,
            genre: !req.body.genre,
            director: !req.body.director,
            year: !req.body.year,
            imageURL: !req.body.imageURL,
            rating: !req.body.rating,
            description: !req.body.description,
        };

        if (Object.values(errors).includes(true)) {
            res.render("create", {
                title: "Create Error Page",
                errors,
                movie: req.body,
            });
            return;
        }

        try {
            const movie = await createMovie(creatorId, req.body);
            res.redirect("/details/" + movie._id);
        } catch (err) {
            res.render("create", {
                title: "Create Error Page",
                errors,
                movie: req.body,
            });
            return;
        }
    },
    // TODO edit and delete
    editGet: async (req, res) => {

        const movieId = req.params.id;

        const movie = await getMovieById(movieId);
        if(!movie){
            res.render('404', {title: 'Not Found Movie'})
            return;
        }

        const isCreator = req.user._id == movie.creator.toString();
        if(!isCreator){
            res.redirect('/login');
            return;
        }

        res.render("edit", { movie });
    },
    editPost: (req, res) => {
        res.render("edit", { title: "Edit Page" });
    },
};
