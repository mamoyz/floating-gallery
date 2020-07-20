$(document).ready(function () {
    if ('ontouchstart' in document.documentElement) {
        $('#cursor').hide();
    }
	
    var xp = 0, yp = 0, mouseX = 0, mouseY = 0;
    var centerX = $(window).innerWidth() / 2;
    var centerY = $(window).innerHeight() / 2;
    var touchable = false;
    var mouseMoved = false;
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
    $(window).on('load', function () {
		
        setTimeout(() => {
            $('.page-template-page-gallery').addClass('loaded');
        }, 0);
        setTimeout(() => {
            $('.page-template-page-gallery').addClass('no-transition');
        }, 2500);
        setTimeout(() => {
            $('.page-template-page-gallery .gallery-item').fadeIn(500);
        }, 2600);
        setTimeout(() => {
            touchable = true;
        }, 4000);
    });
    $(window).on('resize', function () {
        centerX = $(window).innerWidth() / 2;
        centerY = $(window).innerHeight() / 2;
    });
    $(document).mousemove(function (e) {
        $('#cursor').css({ 'top': e.pageY, 'left': e.pageX });
        if (!touchable) return false;
        mouseMoved = true;
        voyageGallery(e.pageX, e.pageY);
		
    });


    $(document).on('touchmove', function (e) {
        if (!touchable) return false;
        mouseMoved = true;
        voyageGallery(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
    });
    function voyageGallery(eX, eY) {
        mouseX = eX;
        mouseY = eY;
        $.each($('.page-template-page-gallery .gallery-container .gallery-item'), function (index) {
            let itemCenterX = $(this).offset().left + $(this).innerWidth() * 0.5;
            let itemCenterY = $(this).offset().top + $(this).innerHeight() * 0.5;
            let maxR = Math.sqrt(Math.pow(itemCenterX, 2) + Math.pow(itemCenterY, 2));
            let Xr = Math.abs(itemCenterX - mouseX);
            let Yr = Math.abs(itemCenterY - mouseY);
            let r = Math.sqrt(Math.pow(Xr, 2) + Math.pow(Yr, 2));
            let scale = (1 - (r / maxR)) + 0.4;
		
            setTimeout(() => {
                if (scale > 0.8) {
                    $(this).find('img').css({ 'transform': 'scale(' + scale + ')' });
                }
                else {
                    $(this).find('img').css({ 'transform': 'scale(0.5)' });
                }
				
            }, 15);
            setTimeout(() => {
                if (scale > 0.7) {
                    $(this).css({ 'z-index': parseInt((1 - (r / maxR)) * 10000) });
                }
                if (scale > 1) {
                    $(this).find('img').css({ 'opacity': '1' });
                } else {
                    $(this).find('img').css({ 'opacity': '0.8' });
                }
            }, 100);
        });
    }
    var loop = setInterval(function () {
        if (touchable && mouseMoved) {
            xp += (mouseX - xp) / 12;
            yp += (mouseY - yp) / 12;
            $('.page-template-page-gallery .gallery-container .gallery-item').css({ 'transform': 'translate(' + parseInt((centerX - xp) * 0.8) + 'px,' + parseInt((centerY - yp) * 0.8) + 'px)' });
        } else {
            // $('.page-template-page-gallery .gallery-container .gallery-item').css({ 'transform': 'translate(0,0)' });	
        }
    }, 10);
});