(function ($) {
	$(function () {
		primaryMenuHandler();
		activeMenu();
		faqSection();
		reviewSection();
		slickSlider();
		menuColor();
		backToTop();
	});

	function primaryMenuHandler() {
		$('.ham-open').click(function () {
			$('.main-navigation').addClass('slide-menu');
		});

		$('.ham-close').click(function () {
			$('.main-navigation').removeClass('slide-menu');
		});

		// 	var toggle1 = $( '#primary-menu > .menu-item-has-children > a' );
		// 	toggle1.click(function() {
		// $(this).toggleClass('special');
		// $(this).find('+ .sub-menu').slideToggle(400);
		// 	});


		// 	var toggle2 = $( '#primary-menu >  .menu-item-has-children > .sub-menu > .menu-item-has-children' );
		// 	toggle2.click(function() {
		// $(this).find('> .sub-menu').slideToggle(400);
		// $(this).find('> a').toggleClass('special');
		// 	});
	}

	function activeMenu() {
		$('#primary-menu li:nth-child(1) a').addClass("active");
		//smoothscroll

		$('#primary-menu a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");

			$('a').each(function () {
				$(this).removeClass('active');
			})
			$(this).addClass('active');

			var target = this.hash,
				menu = target;
			$target = $(target);
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top + 2
			}, 500, 'swing', function () {
				window.location.hash = target;
			});
		});
	}

	function faqSection() {
		//Tabs		
		$('.tabs .tab-links a').on('click', function (e) {
			var currentAttrValue = $(this).attr('href');

			// Show/Hide Tabs
			// $('.tabs ' + currentAttrValue).show().siblings().hide();
			$('.tabs ' + currentAttrValue).addClass('active').siblings().removeClass('active');

			// Change/remove current tab to active
			$(this).parent('li').addClass('active').siblings().removeClass('active');

			e.preventDefault();
		});

		//Accordion
		$('.accordion .title').click(function () {
			$(this).toggleClass('active minus');
			// $('.faq .answer').slideToggle(400);
			$(this).siblings('.description').slideToggle(400);
		});
	}

	function reviewSection() {
		//Tabs		
		$('.customer-review .tab-links a').on('click', function (e) {
			var currentAttrValue = $(this).attr('href');

			// Show/Hide Tabs
			$('.customer-review ' + currentAttrValue).show().siblings().hide();

			// Change/remove current tab to active
			$(this).parent().addClass('active').siblings().removeClass('active');

			e.preventDefault();
		});
	}

	function menuColor() {
		$('#primary-menu li a').on('click', function (e) {
			$(this).addClass('active');
			$(this).parent('li').siblings().children().removeClass('active');
		});
	}

	function slickSlider() {
		// $(window).on('resize orientationchange', function() {
		// 	$('.blog .regular').slick('resize');
		// });

		//top slider section
		$(".slides .lazy").slick({
			lazyLoad: 'ondemand', // ondemand progressive anticipated
			infinite: true
		});

		//blog section
		$(".blog .regular").slick({
			dots: false,
			infinite: true,
			slidesToShow: 2,
			slidesToScroll: 1,

			responsive: [
				{
					breakpoint: 980,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						dots: true
					}
				}
			]
		});

		//testimonial section
		$(".customer-review .regular").slick({
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1
		});
	}

	function backToTop() {
		// Binding event for user if they clicks on scroll to up icon
		$('.scrollTop').click(function () {
			// $("html, body").animate({scrollTop: 0});
			$("body,html").animate({ scrollTop: 0 }, 800);
		});

		// if user scrolls down the page then make the
		// scroll to top icon visible else hide it
		$(window).scroll(function () {
			if ($(this).scrollTop() >= 500) {
				$('.scrollTop').show();
			}
			else {
				$('.scrollTop').hide();
			}
		});
	}

})(jQuery);


$(document).ready(function () {
	var phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	// $('.emailError_modal').modal('show');

	setTimeout(function () {
		// next step for registration form
		$('.registrationForm .btn-next').on('click', function () {
			var parent_fieldset = $(this).parents('fieldset');
			var next_step = true;
			if (next_step) {
				parent_fieldset.fadeOut(400, function () {
					$(this).next().fadeIn();
				});
			}
		});


		$('.proposal_btn').on('click', function () {
			// alert("inside open modal");
			// $('.signup_modal ').modal('show');
			$('.registrationForm fieldset:first-child').css("display", "block");
			$('.registrationForm fieldset:nth-child(2)').css("display", "none");
		})

		// previous step for registration form
		$('.registrationForm .btn-previous').on('click', function () {
			$(this).parents('fieldset').fadeOut(400, function () {
				$(this).prev().fadeIn();
			});
		});
	}, 600)

	// company name validation 
	$('.registrationForm #next').on('click', function () {
		if (document.getElementById('companyName').value == "") {
			$("#companyNameErr").html("Company name is required");
			return false;
		} else {
			$("#companyNameErr").html("");
		}
		$('.registrationForm fieldset:first-child').fadeOut(100);
		$('.registrationForm fieldset:nth-child(2)').css("display", "block");
		var companyName = document.getElementById('companyName').value;
		$("#companyName2").val(companyName);
	});

	// validation and form submition
	$(function () {
		$("form[name='registrationForm']").validate({
			rules: {
				fullName: "required",
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
					minlength: 5
				},
				phoneNumber: "required"
			},
			// Specify validation error messages
			messages: {
				fullName: "Full name is required",
				email: {
					required: "Email is required",
					email: "Enter a valid email"
				},
				password: "Password is required",
				phoneNumber: "Phone number is required"
			},
			submitHandler: function (form) {
				$('.registrationForm').css({ "opacity": 0.4 });
				$("#loader").css("display", "block");
				$(".signup_modal").css("pointer-events", "none");
				var signupDetails = { organization: {}, person: {} };
				var companyName = $('#registrationForm input[name="companyName"]').val();
				signupDetails.organization.Org_Name = companyName;
				// var gstin = $('#registrationForm input[name="gstin"]').val();
				// signupDetails.organization.gstin = gstin;
				signupDetails.organization.REQUISITION_STATUS = 2;
				signupDetails.organization.mailing_add = {};
				var fullName = $('#registrationForm input[name="fullName"]').val();
				signupDetails.person.first_name = fullName;
				var email = $('#registrationForm input[name="email"]').val();
				signupDetails.person.email = email;
				signupDetails.organization.Email = email;
				var password = $('#registrationForm input[name="password"]').val();
				signupDetails.person.password = password;
				var phoneNumber = $('#registrationForm input[name="phoneNumber"]').val();
				signupDetails.person.mobile = phoneNumber;
				console.log("Before adding org :" + JSON.stringify(signupDetails));
				// return;
				$.ajax({
					url: 'https://api.lexstart.com/subscribers',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(signupDetails),
					success: function (response) {
						// alert("response after api call " + JSON.stringify(response));
						//alert("Organization added..." + JSON.stringify(response));
						// alert(response.result.organization_NAME);
						// alert(response.result.organization_ID);
						var companyName = response.result.organization_NAME;
						var orgid = response.result.organization_ID;
						var requestObj = {
							"companyName": companyName,
							"orgid": orgid
						}
						// alert(JSON.stringify(requestObj));
						$.ajax({
							url: 'https://api.lexstart.com/organizations/populateQuickFacts',
							type: 'POST',
							contentType: 'application/json',
							data: JSON.stringify(requestObj),
							success: function (response) {
								//    alert("Quick facts updated" + JSON.stringify(response));
								var esopPackageObj = { "type": "Package", "package_id": "795fe4b1-821f-49c349c3-8469-5950cb7ef987", "price": 25000, "start_date": new Date(), "status": 1 };
								// alert("Before adding demo package..." + JSON.stringify(esopPackageObj));
								$.ajax({
									url: 'https://api.lexstart.com/organizations/' + orgid + '/packages',
									type: 'POST',
									contentType: 'application/json',
									data: { organization_subscription: esopPackageObj },
									success: function () {
										// alert('Esop package activated');
										// var request = {
										// 	orgid: orgid,
										// 	event: "esop_policy",
										// 	"historical": false,
										// 	action_attributes: {
										// 		Name: "PolicyForm-" + orgid
										// 	},
										// 	model: {
										// 		Name: "PolicyForm-" + orgid,
										// 		organization_id: orgid
										// 	}
										// };
										// // alert(request)
										// $.ajax({
										// 	url: 'https://api.lexstart.com/initiate/events',
										// 	type: 'POST',
										// 	contentType: 'application/json',
										// 	data: JSON.stringify(request),
										// 	success: function () {
												// alert(" events initiated: " + orgid);
												$.ajax({
													url: 'https://api.lexstart.com/accounts/' + orgid,
													type: 'POST',
													contentType: 'application/json',
													success: function () {
														// alert("Account Initialised for orgid " + orgid);
														// alert(email);
														// alert(password);
														$.ajax({
															url: 'https://api.lexstart.com/mailtriggerforlogin',
															type: 'POST',
															contentType: 'application/json',
															data: JSON.stringify(mailData),
															success: function () {
																//alert('mail sent');
																document.getElementById('registrationForm').reset();
																$("#loader").css("display", "none");
																$('.registrationForm').css({ "opacity": 1 });
																$('.signup_modal ').modal('hide');
																$('.thankYou-modal ').modal('show');
															},
															error: function () {
																//alert('error while sending mail');
																document.getElementById('registrationForm').reset();
																$("#loader").css("display", "none");
																$('.registrationForm').css({ "opacity": 1 });
																$('.signup_modal ').modal('hide');
																$('.error_modal ').modal('show');
															}
														});
													},
											// 		error: function () {
											// 			document.getElementById('registrationForm').reset();
											// 			$("#loader").css("display", "none");
											// 			$('.registrationForm').css({ "opacity": 1 });
											// 			$('.error_modal ').modal('show');
											// 			alert('Error occurred while trying to initiate account.');
											// 		}
											// 	});
											// },
											error: function () {
												document.getElementById('registrationForm').reset();
												$("#loader").css("display", "none");
												$('.registrationForm').css({ "opacity": 1 });
												$('.error_modal ').modal('show');
												alert('Error occurred while trying to initiate account.');
											}
										});
									},
									error: function (error) {
										document.getElementById('registrationForm').reset();
										$("#loader").css("display", "none");
										$('.registrationForm').css({ "opacity": 1 });
										$('.error_modal ').modal('show');
										//alert('error occured while activating esop package' + JSON.stringify(error));
									}
								});
							},
							error: function (error) {
								//alert('error while updating quick facts ' + JSON.stringify(error));
								var esopPackageObj = { "type": "Package", "package_id": "795fe4b1-821f-49c3-8469-5950cb7ef987", "price": 25000, "start_date": new Date(), "status": 1 };
								// alert(orgid);
								// alert("Before adding demo package..." + JSON.stringify(esopPackageObj));
								var dataToPass = { organization_subscription: esopPackageObj };
								$.ajax({
									url: 'https://api.lexstart.com/organizations/' + orgid + '/packages',
									type: 'POST',
									contentType: 'application/json',
									data: JSON.stringify(dataToPass),
									success: function () {
										// alert('Esop package activated');
										// var request = {
										// 	orgid: orgid,
										// 	event: "esop_policy",
										// 	"historical": false,
										// 	action_attributes: {
										// 		Name: "PolicyForm-" + orgid
										// 	},
										// 	model: {
										// 		Name: "PolicyForm-" + orgid,
										// 		organization_id: orgid
										// 	}
										// };
										// // alert(request);
										// $.ajax({
										// 	url: 'https://api.lexstart.com/initiate/events',
										// 	type: 'POST',
										// 	contentType: 'application/json',
										// 	data: JSON.stringify(request),
										// 	success: function () {
												// alert(" events initiated: " + orgid);
												$.ajax({
													url: 'https://api.lexstart.com/accounts/' + orgid,
													type: 'POST',
													contentType: 'application/json',
													success: function () {
														//alert("Account Initialised for orgid " + orgid);
														// alert(email);
														// alert(password);	
														var mailData = {
															email: email,
															password: password,
															name: fullName,
															to: email,
															//text: "Your account has been created. Your email is " + email + " and pasword is " + password,
															subject: "Welcome to LexStart | You are almost there!"
														}
														//alert(JSON.stringify(mailData));
														$.ajax({
															url: 'https://api.lexstart.com/mailtriggerforlogin',
															type: 'POST',
															contentType: 'application/json',
															data: JSON.stringify(mailData),
															success: function () {
																//alert('mail sent');
																document.getElementById('registrationForm').reset();
																$("#loader").css("display", "none");
																$('.registrationForm').css({ "opacity": 1 });
																$('.signup_modal ').modal('hide');
																$('.thankYou-modal ').modal('show');
															},
															error: function () {
																//alert('error while sending mail');
																document.getElementById('registrationForm').reset();
																$("#loader").css("display", "none");
																$('.registrationForm').css({ "opacity": 1 });
																$('.signup_modal ').modal('hide');
																$('.error_modal ').modal('show');
															}
														});
													},
													error: function () {
														document.getElementById('registrationForm').reset();
														$("#loader").css("display", "none");
														$('.registrationForm').css({ "opacity": 1 });
														$('.error_modal ').modal('show');
														//alert('Error occurred while trying to initiate account.');
													}
												});
											},
									// 		error: function () {
									// 			document.getElementById('registrationForm').reset();
									// 			$("#loader").css("display", "none");
									// 			$('.registrationForm').css({ "opacity": 1 });
									// 			$('.error_modal ').modal('show');
									// 			alert('Error occurred while trying to initiate account.');
									// 		}
									// 	});
									// },
									error: function (error) {
										document.getElementById('registrationForm').reset();
										$("#loader").css("display", "none");
										$('.registrationForm').css({ "opacity": 1 });
										$('.error_modal ').modal('show');
										//alert('error occured while activating esop package' + JSON.stringify(error));
									}
								});
							}
						});
					},
					error: function (error) {
						// alert("error" + JSON.stringify(error));
						document.getElementById('registrationForm').reset();
						$("#loader").css("display", "none");
						$('.registrationForm').css({ "opacity": 1 });
						$('.signup_modal ').modal('hide');
						if (error.status == 402) {
							$('.emailError_modal ').modal('show');
						}
						if (error.status == 403) {
							$('.orgError_Modal ').modal('show');
						}
					}
				});
			}
		});
	});

	// confirm password validation
	$("#confirm_password").keyup(function () {
		if (document.getElementById('password').value ==
			document.getElementById('confirm_password').value) {
			document.getElementById('message').style.color = 'green';
			document.getElementById('message').innerHTML = '';
		} else {
			document.getElementById('message').style.color = 'red';
			document.getElementById('message').innerHTML = 'Password not matching';
		}
	});

	$('.landing-modal ').modal('show');
	$('.btn-close-modal').click(function () {
		window.open("about:blank", "_self");
		window.close();
	})
	$('.landing-modal .btn-continue').click(function(){
		$('.landing-modal ').modal('hide');
		$('.kyc_director').modal('show')
	})
})
