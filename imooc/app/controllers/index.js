/**
 * index.js .js
 * @author huangjihua
 * @create 2015/1/12.
 */
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
var Category = mongoose.model('Category');

//index page
exports.index = function (req, res) {
    Category
        .find({})
        .populate({path: 'movie', select: 'title poster', options: {limit: 5}})
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