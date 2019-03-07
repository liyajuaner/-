$.fn.UiSearch = function(){
    var ui= $(this);
    $('.ui-search-selected',ui).on('click',function(){
        $('.ui-search-list').show();
        return false;
    });
    $('.ui-search-list a',ui).on('click',function(){
        $('.ui-search-selected',ui).text($(this).text());
        $('.ui-search-list',ui).hide();
        return false;
    });
    $('body').on('click',function(){
            $('.ui-search-list',ui).hide();
        })
}

$(function(){
    $('.ui-search').UiSearch();
});
