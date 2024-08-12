const { createMovie, getMovieById, updateMovie, deleteMovie } = require("../services/movie");

module.exports = {
    createGet: (req, res) => {
        res.render("create", { title: "Create Page" });
    },
    createPost: async (req, res) => {
        const creatorId = req.user._id; 

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
                errors
            });
            return;
        }

        try {

            const movie = await createMovie(creatorId, req.body);
            res.redirect("/details/" + movie._id);
            
        } catch (err) {

            res.render("create", { errors: { message: err.message } });
            return;
        }
    },
    editGet: async (req, res) => {

        const movieId = req.params.id;
        let movie;

        try{
            movie = await getMovieById(movieId);
            if(!movie){
                throw new Error('Movie not found');
            }
        } catch {
            res.render('404')
            return;
        }

        const isCreator = req.user._id == movie.creator.toString();
        if(!isCreator){
            res.redirect('/login');
            return;
        }

        res.render("edit", { movie });
    },
    editPost: async (req, res) => {
        const movieId = req.params.id;
        const isCreator = req.user._id;

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
            res.render('edit', {
                title: 'Edit Error Page',
                errors,
                movie: req.body,
            });
            return;
        }
        try{
            await updateMovie(movieId, req.body, isCreator);
        } catch (err) {
            if(err.message == 'Access denied'){
                res.redirect('/404');
            } else {
                res.render('404');
            }
            return;
        }
        res.redirect('/details/' + movieId);
    },
    deleteGet: async (req, res) => {


        const movieId = req.params.id;
        let movie;

        try{
            movie = await getMovieById(movieId);
            if(!movie){
                throw new Error('Movie not found');
            }
        } catch {
            res.render('404')
            return;
        }

        const isCreator = req.user._id == movie.creator.toString();
        if(!isCreator){
            res.redirect('/login');
            return;
        }

        res.render('delete', { movie });
    },
    deletePost: async (req, res) => {
        const movieId = req.params.id;
        const creatorId = req.user._id;

        try{
            await deleteMovie(movieId, creatorId);
        } catch (err) {
            if(err.message == 'Access denied'){
                res.redirect('/login');
            } else {
                res.render('404');
            }
        }

        return res.redirect('/');
    }
};
