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