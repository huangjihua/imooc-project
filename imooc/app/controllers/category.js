/**
 * category .js
 * @author huangjihua
 * @create 2015/1/12.
 */
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var _ = require('underscore'); //
//admin new category
exports.new = function (req, res) {
    res.render('category', {
        title: '环球影视 管理后台新增分类',
        category: {}
    });
};

//admin update category

//admin post category
exports.save = function (req, res) {
    var categoryObj = req.body.category;
    //获取需要更新数据的_id
    var id = categoryObj._id;
    var _category;

    if (id) {
        Category.findById(id, function (err, category) {
            if (err) {
                console.log(err);
            }
            _category = _.extend(category, categoryObj);
            _category.save(function (err, category) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/admin/category/list');
            });

        });
    } else {
        _category = new Category(categoryObj);
        _category.save(function (err, category) {
            if (err) {
                console.log(err);
            }
            res.redirect('/admin/category/list');
        });
    }
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


//category update page
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Category.findById(id, function (err, category) {
            res.render('category', {
                title: '管理后台 分类更新',
                category: category
            });
        });
    }
};

//category delete model
exports.del = function (req, res) {
    var id = req.query.id;
    if (id) {
        Category.remove({_id: id}, function (err, category) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
};
