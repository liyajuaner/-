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
// 回到顶部效果
$.fn.UiBackTop=function(){
    var ui=$(this);
    var el=$('<a href="#0" class="ui-backTop"></a>');
    ui.append(el);
    var windowHeight=$('window').height(); //获取屏幕高度
    $('window').on('scroll',function(){
        var top = $('body').scrollTop();//获取body的高度
        if(top > windowHeight){
            el.show();
        }else{
            el.hide();
        }
    });
    el.on('click',function(){
        $('window').scrollTop(0)
    })
}
// ui-slide部分
//	1. 左右箭头需要能控制翻页
//	2. 翻页的时候，进度点，要联动进行focus
//  3. 翻到第三页的时候，下一页需要回到 第一页，翻到第一页的时候，同理

//  4. 进度点，在点击的时候，需要切换到对应的页面

//  5. 没有（进度点点击、翻页操作）的时候需要进行自动滚动

//  6. 滚动过程中，屏蔽其他操作（自动滚动、左右翻页、进度点点击）

//	7. 高级-无缝滚动

$.fn.UiSlide = function(){

	var ui = $(this);

	var wrap = $('.ui-slide-wrap');

	var btn_prev = $('.ui-slide-arrow .left',ui);
	var btn_next = $('.ui-slide-arrow .right',ui);

	var items  = $('.ui-slide-wrap .item',ui);
	var tips  =$('.ui-slide-process .item',ui);

	//	预定义
	
	var current = 0;
	var size = items.size();
	var width = items.eq(0).width();
	var enableAuto = true;

	//	设置自动滚动感应（如果鼠标在 wrap 中，不要自动滚动）
	ui
	.on('mouseover',function(){
		enableAuto = false;
	})
	.on('mouseout',function(){
		enableAuto = true;
	})


	//	具体操作
	wrap
	.on('move_prev',function(){
		if(current<=0){
			current = size;
		}
		current = current - 1 ;
		wrap.triggerHandler('move_to',current);
	})
	.on('move_next',function(){
		if( current >= size-1){
			current = -1;
		}
		current = current + 1 ;
		wrap.triggerHandler('move_to',current);
	})
	.on('move_to',function(evt,index){
		wrap.css('left',index*width*-1);
		tips.removeClass('item_focus').eq(index).addClass('item_focus');
	})
	.on('auto_move',function(){

		setInterval(function(){
			enableAuto && wrap.triggerHandler('move_next');
		},2000);

	})
	.triggerHandler('auto_move');

	//	事件
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	});
	tips.on('click',function(){
		var index = $(this).index();
		wrap.triggerHandler('move_to',index);
	})

}

   
//脚本的页面逻辑
$(function(){
    $('.ui-search').UiSearch();
    $('body').UiBackTop();
    $('.ui-slide').UiSlide();
});
