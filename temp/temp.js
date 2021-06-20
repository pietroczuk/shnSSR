jQuery(function ($) {

    setTimeout(function () {
        var carousel = jQuery('#heroslider .elementor-image-carousel-wrapper');
        var swiperInstance = carousel.data('swiper');
        if (swiperInstance) {
            var swiperIndex = swiperInstance.activeIndex;
            if (swiperIndex == 1) {
                jQuery('#pizza').addClass('pruszActiveBtn');
            }
            if (swiperIndex == 0) {
                jQuery('#dania').addClass('pruszActiveBtn');
            }
            jQuery('#pizza').click(function () {
                swiperInstance.slideTo(1);
                swiperIndex = swiperInstance.activeIndex;
                if (swiperIndex == 1) {

                    jQuery(this).addClass('pruszActiveBtn');
                    jQuery('#dania').removeClass('pruszActiveBtn');
                } else {
                    jQuery(this).removeClass('pruszActiveBtn');
                }

            });

            jQuery('#dania').click(function () {
                swiperInstance.slideTo(0);
                swiperIndex = swiperInstance.activeIndex;
                if (swiperIndex == 0) {
                    jQuery(this).addClass('pruszActiveBtn');
                    jQuery('#pizza').removeClass('pruszActiveBtn');
                } else {
                    jQuery(this).removeClass('pruszActiveBtn');
                }
            });
        }
    }, 200);
});