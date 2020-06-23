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

    // 精靈圖 
    var icon = document.querySelectorAll('.service_ico');
    for(var i = 0; i < icon.length; i++) {
        var index = i * 44;
        icon[i].style.backgroundPosition = '0 -' + index + 'px';
    };

    // input 光標點击後input val消失 
    var text = document.querySelector('.text');
    text.onfocus = function() {
        // console.log('focus');
        if(text.value === 'search content'){
            this.value = '';
        }
        // after focus, change the color of text 
        this.style.color = '#333';
    }

    text.onblur = function() {
        //  console.log('unfocus');
        if(text.value === '') {
            this.value = 'search content';
        }

        this.style.color = '#ccc';
    }

    var lis = document.querySelectorAll('.circle-li');
    for(var i = 0; i<lis.length; i++){
        lis[i].onmouseover = function() {
            for(var i=0; i<lis.length; i++){
                lis[i].className = 'circle-li';
            }
            this.className = 'current circle-li';
        }
    }

    var nav = document.querySelector('.nav_shortcut');
    var lis = nav.children;
    for(var i=0; i<lis.length; i++){
        lis[i].onmouseover = function () {
            this.children[2].style.display = 'block';

        }
        lis[i].onmouseout = function () {
            this.children[2].style.display = 'none';
        }
    }
    




});