$(function() {
    // 1. 全選、全不選功能
    // 把全選按鈕(checkall)的狀態賦值給三個小按鈕(j-checkbox)
    // 使用change事件
    $(".checkall").change(function() {
        // console.log($(this).prop("checked"));
        // $(".j-checkbox").prop("checked", true);
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));

        if($(this).prop("checked")){
            $(".cart-item").addClass("check-cart-item");
        }else {
            $(".cart-item").removeClass("check-cart-item");
        }
    }); 

    // 2. 如果小复選框被選中的個數等於3，就應該把全選按鈕選上，否則全選按鈕不選
    $(".j-checkbox").change(function() {
        // if(被選中的小复選框的個數 === 3) {
        //     就要選中全選按鈕
        // }else {
        //     不要選中全選按鈕
        // }

        // console.log($(".j-checkbox:checked").length);
        // $(".j-checkbox").length)是所有小复選框的個數

        if($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        }else{
            $(".checkall").prop("checked", false);
        }

        if($(this).prop("checked")){
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    getSum();
    $(".increment").click(function(){
        // 得到當前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);

        var p = $(this).parents().siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        // console.log(p);
        var price = (p * n).toFixed(2);
        
        // 小計模块
        $(this).parents().siblings(".p-sum").html("$" + price);
        getSum();
        

        
    });
    $(".decrement").click(function(){
        // 得到當前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // var p = $(this).parents().siblings(".p-price");
        // console.log(p);
        
        // console.log(n);
        if(n==1){
            return false;
        }else{
            n--;
            $(this).siblings(".itxt").val(n);
        }

        var p = $(this).parents().siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        // console.log(p);
        // var price = (p * n).toFixed(2);
        
        // 小計模块
        $(this).parents().siblings(".p-sum").html("$" + (p * n).toFixed(2));
        getSum();
    });

    // 用戶修改文本框的值 計算 小計模块
    $(".itxt").change(function(){
        var n = $(this).val();
        var p = $(this).parents().siblings(".p-price").html();
        p = p.substr(1);
        $(this).parents().siblings(".p-sum").html("$" + (p * n).toFixed(2));
        getSum(); 
    });

    // 計算總計和總額
    function getSum() {
        var count = 0; //計算總件數
        var money = 0; //計算總價錢
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val());
        }); 
        $(".amount-sum em").text(count);

         $(".p-sum").each(function(i, ele) {
             money += parseFloat($(ele).text().substr(1));
         });
         $(".price-sum em").text("$" + money.toFixed(2));
    }

    // 冊除商品
    // 1. 商品後面的刪除按鈕
    $(".p-action a").click(function(){
        $(this).parents(".cart-item").remove();
        getSum();
    });

    // 2. 刪除被選中的商品 
    $(".remove-batch").click(function(){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });

    // 3. 清空購物車，刪除全部商品 
    $(".clear-all").click(function(){
        $(".cart-item").remove();
        getSum();
    });

})