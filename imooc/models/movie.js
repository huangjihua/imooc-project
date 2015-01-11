/**
 * moive .js
 * @author huangjihua
 * @create 2015/1/8.
 */
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;