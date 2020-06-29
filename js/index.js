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



    // 輪播圖 
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    focus.addEventListener('mouseover', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseout', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click(); 
        }, 2000) 
    });

    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for(var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);

        li.addEventListener('click', function() {
            for (var i=0; i<ol.children.length; i++){
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            // num = index;
            // circle = index;
            num = circle = index;
            animate(ul, -index * focusWidth); 
        })
    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var num = 0;
    var circle = 0;
    var flag = true;

    arrow_r.addEventListener('click', function() {
        if(flag) {
            flag = false;
            if(num == ul.children.length-1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num*focusWidth, function() {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length){
                circle = 0;
            }
            circleChange();
        }
    })


    arrow_l.addEventListener('click', function() {
        if(flag) {
            flag = false;
            if(num == 0) {
                num = ul.children.length-1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num*focusWidth, function() {
                flag = true;
            });
            circle--;
            // if (circle < 0){
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
        
        
    });
    function circleChange() {
        for(var i=0; i<ol.children.length; i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    var timer = setInterval(function() {
        arrow_r.click(); 
    }, 2000)
    
     







    // keyup to focus 
    var search = document.querySelector('.text');
    document.addEventListener('keyup', function(e) {
        //console.log(e.keyCode);   取得S鍵代碼
        if(e.keyCode === 83) {
            search.focus();
        }
    })


    // search block 字體輸入時字體放大顯示效果 
    var con = document.querySelector('.con');
    var con_input = document.querySelector('.con_text');

    con_input.addEventListener('keyup', function() {
        // console.log('1111');
        if(this.value==''){
            con.style.display = 'none';
        }else {
            con.style.display = 'block';
            con.innerHTML = this.value;
        }
    })

    // 失去焦點，就display none 
    con_input.addEventListener('blur' ,function() {
        con.style.display = 'none';
    })
    // 得到焦點，就display block 
    con_input.addEventListener('focus' ,function() {
        if(this.value !== '') {
            con.style.display = 'block';
        }
    })
    




});