/**
 * movie .js
 * @author huangjihua
 * @create 2015/1/12.
 */
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
var Category = mongoose.model('Category');
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
    Category.find({}, function (err, categories) {
        res.render('admin', {
            title: '环球影视 管理后台',
            movie: {},
            categories: categories
        });
    });
};

//admin update movie
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            Category.find({}, function (err, categories) {
                res.render('admin', {
                    title: '环球影视  后台更新',
                    movie: movie,
                    categories: categories
                });
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

    if (id) {
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
        _movie = new Movie(movieObj);

        var categoryId = movieObj.category;
        //传入的分类名称
        var categoryName = movieObj.categoryName;

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            //选中分类情况
            if (categoryId) {
                //在相应分类中增加当前电影ID
                Category.findById(categoryId, function (err, category) {
                    category.movie.push(movie._id);
                    category.save(function (err, category) {
                        res.redirect('/movie/' + movie._id);
                    });
                });
            } else if (categoryName) {
                //未选分类，填写了分类名称，需新增分类
                var category = new Category({
                    name: categoryName,
                    movie: [movie._id]
                });
                category.save(function (err, category) {
                    //还需要把当前的新增的分类ID 保存到当前电影里
                    movie.category = category._id;
                    movie.save(function (err, movie) {
                        res.redirect('/movie/' + movie._id);
                    });
                });
            } else {

            }
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