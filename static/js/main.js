/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

    let $window = $(window),
        $body = $('body');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px']
    });

    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Touch?
    if (browser.mobile)
        $body.addClass('is-touch');

    // Forms.
    let $form = $('form');

    // Auto-resizing textareas.
    $form.find('textarea').each(function () {

        let $this = $(this),
            $wrapper = $('<div class="textarea-wrapper"></div>'),
            $submits = $this.find('input[type="submit"]');

        $this
            .wrap($wrapper)
            .attr('rows', 1)
            .css('overflow', 'hidden')
            .css('resize', 'none')
            .on('keydown', function (event) {

                if (event.keyCode == 13
                    && event.ctrlKey) {

                    event.preventDefault();
                    event.stopPropagation();

                    $(this).blur();

                }

            })
            .on('blur focus', function () {
                $this.val($.trim($this.val()));
            })
            .on('input blur focus --init', function () {

                $wrapper
                    .css('height', $this.height());

                $this
                    .css('height', 'auto')
                    .css('height', $this.prop('scrollHeight') + 'px');

            })
            .on('keyup', function (event) {

                if (event.keyCode == 9)
                    $this
                        .select();

            })
            .triggerHandler('--init');

        // Fix.
        if (browser.name == 'ie'
            || browser.mobile)
            $this
                .css('max-height', '10em')
                .css('overflow-y', 'auto');

    });

    // Menu.
    let $menu = $('#menu');

    $menu.wrapInner('<div class="inner"></div>');

    $menu._locked = false;

    $menu._lock = function () {

        if ($menu._locked)
            return false;

        $menu._locked = true;

        window.setTimeout(function () {
            $menu._locked = false;
        }, 350);

        return true;

    };

    $menu._show = function () {

        if ($menu._lock())
            $body.addClass('is-menu-visible');

    };

    $menu._hide = function () {

        if ($menu._lock())
            $body.removeClass('is-menu-visible');

    };

    $menu._toggle = function () {

        if ($menu._lock())
            $body.toggleClass('is-menu-visible');

    };

    $menu
        .appendTo($body)
        .on('click', function (event) {
            event.stopPropagation();
        })
        .on('click', 'a', function (event) {

            let href = $(this).attr('href');

            event.preventDefault();
            event.stopPropagation();

            // Hide.
            $menu._hide();

            // Redirect.
            if (href == '#menu')
                return;

            window.setTimeout(function () {
                window.location.href = href;
            }, 350);

        })
        .append('<a class="close" href="#menu">Close</a>');

    $body
        .on('click', 'a[href="#menu"]', function (event) {

            event.stopPropagation();
            event.preventDefault();

            // Toggle.
            $menu._toggle();

        })
        .on('click', function (event) {

            // Hide.
            $menu._hide();

        })
        .on('keydown', function (event) {

            // Hide on escape.
            if (event.keyCode == 27)
                $menu._hide();

        });

})(jQuery);


let slideIndex = 0;
let timeoutId = null;
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");

showSlides();

function currentSlide(index) {
    slideIndex = index;
    showSlides();
}

function plusSlides(step) {

    if (step < 0) {
        slideIndex -= 2;

        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
    }

    showSlides();
}

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove('active');
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add('active');
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(showSlides, 2500);
}