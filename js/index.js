$(function(){

    var flag = true;
    // 1. 顯示隠藏電梯導航 
    function toggleTool() {
        var toolTop = $(".recommend").offset().top;
        if($(document).scrollTop() >= toolTop){
            $(".fixedtool").fadeIn();
        }else {
            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function(){
        toggleTool();
        // 頁面滾動到某個內容區域，左側電梯導航li 相應添加和刪除current 類名
        if(flag) {
            $(".floor .w").each(function(i, ele){
                if($(document).scrollTop() >= $(ele).offset().top){
                    console.log(i);
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        }
    });

    // 2. 點击電梯導航頁面可以滾動到相應內容區域 
    $(".fixedtool li").click(function(){
        flag = false;
        console.log($(this).index());
        // 當每次點击 li 就需要計算出頁面要去往的位置
        // eq就是選出索引值 
        // 聲明變量，每次點击頁面就去相應索引值
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 頁面動畫效果 
        $("body, html").stop().animate({
            scrollTop: current
        }, function(){
            flag = true;
        });

        // 點击之後，讓當前的li 添加current類名，姐妹移除current 類名
        $(this).addClass("current").siblings().removeClass();

    })


});