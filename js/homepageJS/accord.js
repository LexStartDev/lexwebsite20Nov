jQuery('.accordion .accord-title').click(function(){
  	jQuery(this).toggleClass('active');
  	jQuery(this).siblings().removeClass('active');
  	var accord_content = jQuery(this).next('.accord-content');
  	jQuery(accord_content).slideToggle().toggleClass('active').siblings('.accord-content').removeClass('active').slideUp();
  })