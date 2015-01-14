/**
 * routes .js
 * 路由相对应的映射
 * @author huangjihua
 * @create 2015/1/12.
 */
var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var Category = require('../app/controllers/category');

module.exports = function (app) {

    //Index
    app.get('/', Index.index);

    //Category -电影分类
    app.get('/admin/category/new', Category.new);
    app.post('/admin/category', Category.save);
    app.get('/admin/category/list', Category.list);
    app.get('/admin/category/update/:id', Category.update);
    //Movie
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/movie/new', Movie.new);
    app.get('/admin/movie/update/:id', Movie.update);
    app.post('/admin/movie', Movie.savePoster, Movie.save);
    app.get('/admin/movie/list', Movie.list);
    app.delete('/admin/movie/list', Movie.del);

}