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
//系统级别的读写文件的模块
var fs = require('fs');
//路径模块
var path =require('path');
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
        var posterData = req.files.uploadPoster;
        var filePath = posterData.path;
        //获取图片原始名字，用来判断
        var  orginalFilename =posterData.orginalFilename;
        if(orginalFilename){
            fs.readFile(filePath, function (err,data) {
                //时间戳，用来命名新的图片的名字
               var timestamp  = Date.now();
                //获取图片类型后缀，png,jpg等
                var type = posterData.type.split('/')[0];
                var poster =timestamp+'.'+type;
                //存入一个新的文件夹中
                var newpath = path.join(__dirname,'../../','/public/upload/'+poster);
                fs.writeFile(newpath,data, function (err) {
                    //写入成功后的poster挂到req上,save里需要用到
                    req.poster= poster;
                    //进入下一个流程
                    next();
                });
            });
        }else{
            next();
        }
};

// admin post movie
exports.save = function (req, res) {
    var movieObj = req.body.movie;
    var id = movieObj._id;
    var _movie;
    //海报图片上传-上传了才进行电影数据更新---采用一个中间件来实现上传
    //存在新的海报地址
    if(req.poster){
        //重写movieObj.poster的地址
        movieObj.poster=req.poster;
    }
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