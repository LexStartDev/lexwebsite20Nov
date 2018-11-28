var section = $('#first-content').offset().top;

$(window).scroll(function(){
	$('nav').toggleClass('scrolled', $(this).scrollTop() > section);
});
