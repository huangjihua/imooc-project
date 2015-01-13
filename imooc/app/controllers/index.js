/**
 * index.js .js
 * @author huangjihua
 * @create 2015/1/12.
 */
var Movie = require('../models/movie');
var Category = require('../models/category');

//index page
exports.index = function (req, res) {
    Category
        .find({})
        .populate({path: 'movies', options: {limit: 5}})
        .exec(function (err, categories) {
            if (err) {
                console.log(err);
            }
            res.render('index', {
                title: '环球影视 首页',
                categories: categories
            });
        });

}