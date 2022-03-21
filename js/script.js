$(document).ready(function () {

    // 위로 가기
    let gotop = $('.go-top');
    gotop.click(function () {
        $('html').animate({
            scrollTop: 0
        }, 500);
    });

    // 이미지 슬라이드 영역
    let slider_line = $('.sw-slider-line'); // 늘어나는 라인 span
    let slide_delay = 3000;
    let sw_slider = new Swiper('.sw-slider', {
        loop: true,
        autoplay: {
            delay: slide_delay,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
        },
        on: {
            slideChangeTransitionStart: function () {
                // 만약에 보여질 슬라이드가 
                // data-delay 가 있다면 data-delay 의 값을 이용하고 
                // 그렇지 않다면
                // 3000을 사용하겠다.
                let temp = $('.swiper-slide-active').attr('data-delay');
                // 숫자로 바꾼다.
                temp = parseInt(temp);
                // 컴퓨터는 1000 이 1초다
                temp = temp * 1000;
                // 값을 체크
                if (isNaN(temp)) {
                    slide_delay = 3000;
                }else{
                    slide_delay = temp;
                }

                // autoplay의 deleay 는 변경이 안된다.                
                this.params.autoplay.delay = slide_delay;

                slider_line.css('width', '0%');
            },
            slideChangeTransitionEnd: function () {
                slider_line.css('width', '0%');
                slider_line.stop().animate({
                    width: '103%'
                }, slide_delay)
            }
        }
    });

    let slider_pause = $('.sw-slider-pause');
    slider_pause.click(function () {
        let temp = $(this).hasClass('sw-slider-pause-active');
        if (temp != true) {
            $(this).addClass('sw-slider-pause-active');
            sw_slider.autoplay.stop();
            slider_line.stop();
        } else {
            $(this).removeClass('sw-slider-pause-active');
            sw_slider.autoplay.start();
            slider_line.stop().animate({
                width: '101%'
            }, slide_delay);
        }
    });

    // gnb 기능
    let header = $('.header');
    let logo = $('.logo');
    let gnb_a = $('.mainmenu');
    let header_sub = $('.header-sub');

    // 헤더 고정
    $(window).scroll(function () {
        let temp = $(window).scrollTop();
        if (temp > 175) {
            header.addClass('header-fixed');
            header.addClass('header-active-fixed');
            header_sub.addClass('header-sub-fixed');
            logo.addClass('logo-fixed');
            gnb_a.css('line-height', '80px')
        } else {
            header.removeClass('header-fixed');
            header.removeClass('header-active-fixed');
            header_sub.removeClass('header-sub-fixed')
            logo.removeClass('logo-fixed');
            gnb_a.removeAttr('style')
        }
    });

    let gnb = $('.gnb');
    gnb.mouseenter(function () {
        header.addClass('header-active')
    });
    gnb.mouseleave(function () {
        header.removeClass('header-active')
    });


    // 더보기 버튼 기능
    let more_bt = $('.more-bt');

    // overflow:hidden div 를 높이를 변경한다
    let contents_list_wrap = $('.contents-list-wrap');

    // 1 라인당 보여줄 높이 px
    let contents_list_h = 470;

    // 현재 2 라인은 보여주고 있었다.
    let contents_list_count = 2;

    // 총 라인의 개수
    let contents_list_total = 5;

    // 더보기 버튼을 클릭
    more_bt.click(function () {

        // 2 줄씩 증가하기 때문에 2를 더한다.
        contents_list_count += 2; // 2 + 2 = 4    

        // 만약에 총 개수 보다 더 커진다면 
        if (contents_list_count >= contents_list_total) {

            // 최대 개수로 셋팅한다.
            contents_list_count = contents_list_total;
        }
        // 높이 값을 계산한다.  = 470 * 보여줄 라인 수
        let temp = contents_list_h * contents_list_count;

        // overflow:hidden 에 높이 값에 넣어준다.
        contents_list_wrap.css('height', temp);
    });

    // 위로 가기 아래에서 고정
    $(window).scroll(function () {
        let go_mc = $('.go-mc');
        if ($(document).scrollTop() + $(window).height() > $('.footer').offset().top) {
            go_mc.addClass('fixed-b')
        } else {
            go_mc.removeClass('fixed-b')
        }
    });

});