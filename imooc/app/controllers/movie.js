/**
 * movie .js
 * @author huangjihua
 * @create 2015/1/12.
 */
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
//var  Category =mongoose.model('Category');

var _ = require('underscore');

//detail page
exports.detail = function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: '环球影视 详情页',
            movie: movie
        });
    });
};

//admin new page
exports.new = function (req, res) {
    res.render('admin', {
        title: '环球影视 管理后台',
        movie: {
            title: "",
            doctor: "",
            country: "",
            year: "",
            poster: "",
            flash: "",
            summary: "",
            language: ""
        }
    });
};

//admin update movie
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: '环球影视  后台更新',
                movie: movie
            });
        });
    }
};

// admin post savePoster
exports.savePoster = function (req, res, next) {

};

// admin post movie
exports.save = function (req, res) {
    var movieObj = req.body.movie;
    var id = movieObj._id;
    var _movie;

    if (id !== 'undefined') {
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });
    }
};


//list page
exports.list = function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: '环球影视 列表页',
            movies: movies
        });
    });
};

//list delete movie
exports.del = function (req, res) {
    //参数是通过?id=XXXX的方式传的，所以用query.id
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
};