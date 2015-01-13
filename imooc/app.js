/**
 * Created by 继华 on 2014/11/30.
 */
var express=require('express');
//NodeJS中的Path对象，用于处理目录的对象，提高开发效率
var path = require('path');
var bodyParser = require('body-parser');
//引入mongoose模块
var mongoose = require('mongoose');

//加载模型
var Movie = require('./app/models/movie');
//引入underscore模板  更新用的
var _ = require('underscore');

var port = process.env.PORT||3000;
var app  =express();
//file system --node 的文件操作 模块
var fs = require('fs');
//mongoose.connect('mongodb://username:password@host:port/database?options...');
mongoose.connect('mongodb://hank:123456@127.0.0.1/imooc');

// models loading
var models_path = __dirname + '/app/models';
var walk = function (path) {
    fs
        .readdirSync(path)
        .forEach(function (file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);
            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    require(newPath);
                }
            }
            else if (stat.isDirectory()) {
                walk(newPath);
            }
        });
};
walk(models_path);


app.set('views', './app/views/pages');
app.set('view engine','jade');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

//路由配置文件
require('./config/routes')(app);
//静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
//moment
app.locals.moment = require('moment');
app.listen(port);

console.log('imooc started on port '+ port);



