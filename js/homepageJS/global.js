var section = $('#first-content').offset().top;

$(window).scroll(function(){
	$('nav').toggleClass('scrolled', $(this).scrollTop() > section);
});



$('.dropdown').hover(function() {
	$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
	$('.dropdown-menu').css('top','55px');
  }, function() {
	$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
  });