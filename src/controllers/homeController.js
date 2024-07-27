module.exports = {
    homeController: (req, res) => {
        res.render('home', {title: 'Home Page'});
    }
};