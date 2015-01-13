/**
 * category .js 模型
 * @author huangjihua
 * @create 2015/1/12.
 */
var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category');
var Category = mongoose.model('Category', CategorySchema);

module.exports = CategorySchema;