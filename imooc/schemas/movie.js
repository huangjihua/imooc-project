/**
 * movie .js
 * @author huangjihua
 * @create 2015/1/7.
 */
var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            detault: Date.now()
        }
    }
});

MovieSchema.pre('save', function (next) {
    if (this.isNew) {

    }
});
