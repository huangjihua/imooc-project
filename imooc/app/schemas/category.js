/**
 * catetory .js
 * @author huangjihua
 * @create 2015/1/12.
 */
/**
 * movie .js
 * description: 电影分类操作
 * @author huangjihua
 * @create 2015/1/7.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
    name: String,
    movie: [{type: ObjectId, ref: "Movie"}],
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
//为模式添加一个staticMethod
//每次存储之前都要来调用pre ---save
CategorySchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

//添加静态方法
CategorySchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};
module.exports = CategorySchema;