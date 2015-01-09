/**
 * Created by 继华 on 2014/11/30.
 */
var express=require('express');
var path = require('path');
var bodyParser = require('body-parser');
//引入mongoose模块
var mongoose = require('mongoose');

//加载模型
var Movie = require('./models/movie');
//引入underscore模板  更新用的
var _ = require('underscore');

var port = process.env.PORT||3000;
var app  =express();
//mongoose.connect('mongodb://username:password@host:port/database?options...');
mongoose.connect('mongodb://hank:123456@127.0.0.1/imooc');

app.set('views', './views/pages');
app.set('view engine','jade');
// parse application/x-www-form-urlencoded
app.use(require('body-parser').urlencoded({extended: false}));
// parse application/json --问题关键
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('imooc started on port '+ port);

//index page 路由配置
app.get('/',function(req,res){
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            title: '环球影视 首页',
            moives: movies
            /*[
             {
             title: "心花路放",
             _id: 1,
             poster: "http://pic9.zhongsou.com/zfsimage/a3e53b35471f493f"
             },
             {
             title: "绣春刀",
             _id: 2,
             poster: "http://pic9.zhongsou.com/zfsimage/6a109fdb679a62d0"
             },
             {
             title: "催眠大师",
             _id: 3,
             poster: "http://pic9.zhongsou.com/zfsimage/b6975a4cbb9ceb3a"
             },
             {
             title: "盗马记",
             _id: 4,
             poster: "http://pic9.zhongsou.com/zfsimage/c4c2098625aa107e"
             },
             {
             title: "化妆师",
             _id: 5,
             poster: "http://pic9.zhongsou.com/zfsimage/f47aeb70be5aae42"
             }

             ]*/
        });
    });
});

//detail page
app.get('/movie/:id',function(req,res){
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: '环球影视 详情页',
            movie: movie
            /*{
             doctor: " 张震 刘诗诗 王千源 聂远 朱丹",
             country: "中国",
             title: "绣春刀",
             year: "2014",
             poster: "http://pic9.zhongsou.com/zfsimage/2f3917689e1678e2",
             language: "中文",
             flash: "http://player.youku.com/player.php/sid/XNzYzODM1Nzk2/v.swf",
             summary: "明朝崇祯皇帝登基后,权倾天下的大太监魏忠贤被弹劾辞官,阉党覆灭。锦衣卫授命追捕阉党,这一任务被指派给卢剑星(王千源 饰)、沈炼(张震 饰)、靳一川(李东学 饰)。这三人是结拜兄弟,不料想这桩不错的差事,却为后来三人..."
             }*/
        });
    });

});

//admin page
app.get('/admin/movie', function (req, res) {
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
});


//admin update movie
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: '环球影视  后台更新',
                movie: movie
            });
        });
    }
});


// admin post movie
app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if (id !== 'undefined') {
        debug.console(movieObj.title);
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
        debug.console(movieObj.title);
    }
});


//list page
app.get('/admin/list',function(req,res){
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
        title: '环球影视 列表页',
            movies: movies
            /*[
            {
                title: "心花路放",
                _id: 1,
                doctor: " 刘赫尧 宁浩",
                country: "大陆",
                year: "2014"
            },
            {
                title: "绣春刀",
                _id: 2,
                doctor: "路阳",
                country: "大陆",
                year: "2014"
            },
            {
                title: "催眠大师",
                _id: 3,
                doctor: " 陈正道",
                country: "大陆",
                year: "2014"
            },
            {
                title: "盗马记",
                _id: 4,
                doctor: " 李志毅",
                country: "香港",
                year: "2014"
            },
            {
                title: "化妆师",
                _id: 5,
                doctor: " 午马 林丰治",
                country: "大陆",
                year: "2014"
            }
             ]*/
    });
    });
});



