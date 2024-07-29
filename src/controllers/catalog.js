module.exports = {
    home: (req, res) => {
        res.render('home', {title: 'Home Page'});
    },
    details: (req, res) => {
        res.render('details', {title: 'Details Page'});
    },
    search: (req, res) => {
        res.render('search', {title: 'Search Page'});
    }
};