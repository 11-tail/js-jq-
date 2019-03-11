window.onload = function () {
    //-----------------------------弹出式下拉菜单和回到顶部------------------
    $(function () {
        var a = $('.nav'),
            d = $('.nav1'),
            b = a.offset();
        // console.log(b)//返回或设置导航栏相对于文档的偏移(位置)
        //加个屏幕滚动事件，c是滚动条相当于文档最顶端的距离
        $(document).on('scroll', function () {
            var c = $(document).scrollTop();
            // //当滚动的屏幕距离大于等于导航栏本身离最顶端的距离时（判断条件）给它加样式（根据自己业务的条件加样式，一般如下）*／
            if (b.top + 100 <= c) {
                d.removeClass('nav1').addClass('move'); //nav弹出
                $('.go').fadeIn(100); //回到顶部淡出
            } else {
                d.removeClass('move').addClass('nav1'); //nav收回
                $('.go').fadeOut(100); //回到顶部淡隐
            }
        })
        //回到顶部的点击事件
        $('.go').click(function () {
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        })
        //------------------------------------------------------------------

        //-----------------------------下拉菜单------------------------------
        //下拉选项卡点击事件
        var isok = true;
        $('#tab ol li').click(function () {
            var now = $(this).index();
            if (isok) {
                $('#tab ul li img').eq(now).stop().animate({
                    height: 350
                }, 300);
            } else {
                $('#tab ul li img').stop().eq(now).animate({
                    height: 0
                }, 300);
            }
            isok = !isok;
        });
    })
    //------------------------------------------------------------------------
    //---------------------侧栏广告------------------------------------------
    $(function () {
        $('#box4').hover(function () {
            $('#box4').stop().animate({
                'right': 0
            });
        }, function () {
            $('#box4').stop().animate({
                'right': -200
            })
        });
        //左边的
        $('#box2').hover(function () {
            $('#box2').stop().animate({
                'left': 0
            });
        }, function () {
            $('#box2').stop().animate({
                'left': -200
            })
        });
    });
    //--------------------------------------------------------------------------
    //--------------------------------选项卡----------------------------
    $(function () {
        //点击获得下标
        $("#tab1 ol li").click(function () {
            var now = $(this).index();
            tab1(now);
        });
        //封装切换函数
        function tab1(now) {
            $("#tab1 ol li").eq(now).addClass('active').siblings().removeClass('active');
            $("#tab1 ul li").eq(now).addClass('cur').siblings().removeClass('cur');
        }
    });
    //-----------------------------------------------------------------------
    //-------------------------------渐显渐隐轮播图---------------------
    $(function () {
        var timer = null;
        var cur = 0;
        var len = $(".img-box li").length;
        //鼠标滑过容器停止播放 点击事件出现
        $("#box3").hover(function () {
            clearInterval(timer);
            $('.prev')
                .stop()
                .animate({
                    'left': 0
                }, 200, 'linear');

            $('.next')
                .stop()
                .animate({
                    'right': 0
                }, 200, 'linear');
        }, function () {
            showImg();
            $('.prev')
                .stop()
                .animate({
                    'left': -41
                }, 200, 'linear');
            $('.next')
                .stop()
                .animate({
                    'right': -41
                }, 200, 'linear');
        });
        // 遍历所有圆点导航实现点击切换至对应的图片
        $(".list-box li").click(function () {
            clearInterval(timer);
            cur = $(this).index();
            $(this).addClass("active")
                .siblings().removeClass("active");

            $(".img-box li")
                .eq(cur)
                .fadeIn(1000)
                .siblings("li")
                .fadeOut(1000);
        });
        //定义图片切换函数
        function showImg() {
            timer = setInterval(function () {
                cur++;
                if (cur >= len) {
                    cur = 0;
                }
                carousel(cur)
            }, 2000);
        }
        showImg();
        //点击事件
        $('.prev').on('click', function () {
            //切到上一张
            cur = --cur < 0 ? $('.img-box li').size() - 1 : cur;
            // console.log(cur);
            carousel(cur)
        });
        $('.next').on('click', function () {
            //往下切换
            cur = ++cur > $('.img-box li').size() - 1 ? 0 : cur;
            // console.log(cur);
            carousel(cur)
        })
    });
    //轮播切换事件 点击原点切换事件
    function carousel(cur) {
        $(".img-box li")
            .eq(cur)
            .fadeIn(1000)
            .siblings("li")
            .fadeOut(1000);

        $(".list-box li")
            .eq(cur)
            .addClass("active")
            .siblings()
            .removeClass("active");
    }
}