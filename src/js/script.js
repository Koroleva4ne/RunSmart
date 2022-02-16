$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron_left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron_right.png"></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: true,
                    dotsClass: 'slick-dots',
                    arrows: false
                }
            },
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    function toggleSlide (item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    /* Modal */
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function valideForms(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, укажите свое имя",
                phone: "Пожалуйста, укажите свой номер телефона",
                email: {
                  required: "Пожалуйста, укажите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+7(999) 999-99-99");
    
    $('form').submit(function(e) {
        e.preventDefault(); /* отмена перезагрузки сайта при отправке форм */
        if (!$(this).valid()) { /* чтобы не отправлялась пустая форма */
            return;
        }
        $.ajax({ /* отправка форм на сервер */
            type: "POST", /* получить/отдать(POST) данные */
            url: "mailer/smart.php", /* куда */
            data: $(this).serialize() /* какие данные нужно отправить ($()) и подготовка перед отправкой на сервер serialize() */
        }).done(function() { /* действие после отправки формы */
            $(this).find("input").val(""); /* очистка всех кнопок */
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset'); /* все формы должны очиститься */
        });
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    new WOW().init();
});