/**
 * admin.js .js
 * @author huangjihua
 * @create 2015/1/11.
 */
$(function () {
    //-电影删除
    del('/admin/list?id=');
    //-分类删除
    del('/admin/category/list?id=');

    //豆瓣同步
    doubanSync();
});

function del(url) {
    $('.del').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);
        $.ajax({
            type: 'DELETE',
            url: url + id
        }).done(function (results) {
            if (results.success === 1) {
                if (tr.length > 0) {
                    tr.remove();
                }
            }
        });

    });
}

function doubanSync(){
    $('#douban').blur(function () {
      var douban  =$(this);
      var id=douban.val();
        if(id){
            $.ajax({
                url:'https://api.douban.com/v2/movie/subject/'+id,
                cache:true,
                type:'get',
                dataType:'jsonp',
                crossDomain:true,
                success: function (data) {
                    $('#inputTitle').val(data.title);
                    $('#inputDoctor').val(data.directors[0].name);
                    $('#inputCountry').val(data.countries[0]);
                    $('#inputCategory').val(data.genres); //分类
                    //$('#inputLanguage').val('英语');
                    $('#inputPoster').val(data.images.large);
                    $('#inputYear').val(data.year);
                    $('#inputSummary').val(data.summary);
                }
            });
        }
    });
}