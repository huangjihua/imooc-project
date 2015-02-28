/**
 * user .js
 * @author huangjihua
 * @create 2015/2/13.
 */
var crypto =require('crypto');
//对密码加密的模块
var bcrypt  =require('bcrypt');

function getRandomString(len) {
    if (!len) len = 16;
    return crypto.randomBytes(Math.ceil(len / 2).toString('hex'));
}

var should  =require('should');
var app  =require('../../app');
var mongoose =require('mongoose');
//var User=require('../../app/models/user');
var User = mongoose.model('User');

//test 测试用例
var user;
describe('<Unit Test',function(){
    descripe('Model User:', function () {
        before(function(done){
           user = {
               name:getRandomString(),
               password:'password'
           };
           done();
        });
    });
    //
    descripe('Before Method save', function () {
        it('should begin without test user', function (done) {
            User.find({name:user.name}, function (err) {
                users.should.have.length(0);

                done();
            })
        })
    });

    //测试用户save的时候不能有问题
    descripe('User save', function () {
        it('should save without problems', function (done) {
            var _user = new User(user);
            _user.save(function (err) {
                !should.exist(err);
                _user.remote(function (err) {
                    !should.exist(err);
                });
            });
        });
        //测试密码的生成是没问题的
        it('should password be hashed correctly', function (done) {
            var password   =user.password;
            var _user = new User(user);

            _user.save(function (err) {
                !should.exist(err);
                !_user.password.should.have.length(0);

                bcrypt,compare(password,_user.password, function (err,isMatch) {
                    should.not.exist(err);
                    isMatch.should.equal(true);
                    //如果跑通了删除这个实例
                    _user.remove(function (err) {
                        !should.exist(err);
                        done();
                    });
                });
            });
        });

        it('should have default role 0', function(done) {
            var _user = new User(user);

            _user.save(function(err) {
                _user.role.should.equal(0);

                _user.remove(function(err) {
                    done();
                });
            });
        });

        it('should fail to save an existing user', function(done) {
            var _user1 = new User(user);

            _user1.save(function(err) {
                should.not.exist(err);

                var _user2 = new User(user);

                _user2.save(function(err) {
                    should.exist(err);

                    _user1.remove(function(err) {
                        if (!err) {
                            _user2.remove(function(err) {
                                done();
                            });
                        }
                    });
                });
            });
        });

        after(function (done) {
            //clear user info
            done();
        });

    });
});

