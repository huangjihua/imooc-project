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
};
//search page
//,options: {limit: 2,skip:index} 分页有问题
exports.search = function (req, res) {
    var catId =req.query.cat;
    var q  =req.query.q;
    var page=parseInt(req.query.p,10)||1;//默认不存在为1

    console.log(req.query.p);
    var pageSize = 2;
    //数据库数据默认应从0开始所以需要-1
    var index = (page-1)*pageSize;
    if(catId){
        Category
            .find({_id:catId})
            .populate({
                path: 'movie',
                select: 'title poster'})
            .exec(function (err, categories) {
                if (err) {
                    console.log(err);
                }
                var category = categories[0]||{};
                var  movies= category.movie||[];
                console.log(movies.length);
                var results = movies.slice(index,(index + pageSize)); //分页取数据
                console.log(index +"-"+(index+pageSize) );
                res.render('results', {
                    title: '环球影视 结果列表页面',
                    keyword:category.name,
                    currentPage:page,
                    totalPage:Math.ceil(movies.length/pageSize),
                    query: 'cat='+catId,
                    movies: results
                });
                console.log(Math.ceil(movies.length/pageSize));
            });
    }
    else{
        //catId不存在时采用关键搜索
        Movie
            .find({title:new RegExp(q+'.*','i')})
            .exec(function (err,movies) {
                if(err){
                    console.log(err);
                }
                var results = movies.slice(index,(index+pageSize));
                res.render('results',{
                    title: '环球影视 结果列表页面',
                    keyword:q,
                    currentPage:page,
                    totalPage:Math.ceil(movies.length/pageSize),
                    query: 'q='+catId,
                    movies: results
                });
            });
    }
}