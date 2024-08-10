const { createMovie } = require("../services/movie");

module.exports = {
    createGet: (req, res) => {
        res.render("create", { title: "Create Page" });
    },
    createPost: async (req, res) => {
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
            const movie = await createMovie(req.user._id, req.body);
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
};
