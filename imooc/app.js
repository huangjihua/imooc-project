/**
 * Created by 继华 on 2014/11/30.
 */
var express=require('express');
var port = process.env.PORT||3000;
var app  =express();


app.set('views', './views/pages');
app.set('view engine','jade');
app.listen(port);

console.log('imooc started on port '+ port);

//index page 路由配置
app.get('/',function(req,res){
        res.render('index',{
            title: 'imooc 首页',
            moives: [
                {
                    title: "火线反攻",
                    _id: 1,
                    poster: "http://r2.ykimg.com/05160000546F0B4467379F61B70C02CE"
                },
                {
                    title: "火线反攻",
                    _id: 2,
                    poster: "http://r2.ykimg.com/05160000546F0B4467379F61B70C02CE"
                },
                {
                    title: "火线反攻",
                    _id: 3,
                    poster: "http://r2.ykimg.com/05160000546F0B4467379F61B70C02CE"
                },
                {
                    title: "火线反攻",
                    _id: 4,
                    poster: "http://r2.ykimg.com/05160000546F0B4467379F61B70C02CE"
                },
                {
                    title: "火线反攻",
                    _id: 5,
                    poster: "http://r2.ykimg.com/05160000546F0B4467379F61B70C02CE"
                }

            ]
        })
});

//detail page
app.get('/movie/:id',function(req,res){
    res.render('detail',{
        title:'imooc 详情页'
    })
});

//list page
app.get('/admin/list',function(req,res){
    res.render('list',{
        title:'imooc 列表页'
    })
});

//admin page
app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:'imooc 管理后台'
    })
});


