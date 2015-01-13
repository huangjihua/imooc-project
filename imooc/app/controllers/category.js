/**
 * category .js
 * @author huangjihua
 * @create 2015/1/12.
 */
var mongoose = require('mongoose');
var Category = mongoose.model('Category');

//admin new category
exports.new = function (req, res) {
    res.render('category', {
        title: '环球影视 管理后台新增分类',
        category: {name: ''}
    });
};

//admin update category

//admin post category
exports.save = function (req, res) {
    var _category = req.body.category;
    var category = new Category(_category);
    category.save(function (err, category) {
        if (err) {
            console.log(err);
        }
        res.redirect('/admin/category/list');
    });
};

//categorylist page
exports.list = function (req, res) {
    Category.fetch(function (err, categories) {
        if (err) {
            console.log(err);
        }
        res.render('categorylist', {
            title: '环球影视 分类列表页',
            categories: categories
        });
    });
};
