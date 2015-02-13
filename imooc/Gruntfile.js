/**
 * Gruntfile .js
 * @author huangjihua
 * @create 2015/2/11.
 */
module.exports = function(grunt) {

    //debug:true,
    //    delayTime:1,
    //    env:{
    //    PORT:3000
    //},
    //cwd:__dirname
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 这里放插件的设置信息
        mochaTest:{
            options:{
                reporter:'spec'
            },
            src:['test/**/*.js']

        },
        concurrent:{
                tasks:['nodemon','watch'],
                options:{
                    logConcurrentOutput:true
                }
            }

    });

    // 载入要使用的插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.option('force',true);
    // 注册任务
    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('test', ['mochaTest']);

};
