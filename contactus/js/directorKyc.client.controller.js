

// document.getElementById("emptyfName").style.display = "none";
// document.getElementById("emptylName").style.display = "none";
// document.getElementById('emptyEmail').style.display = "none";
// document.getElementById('emptyNumber').style.display = "none";
// var x = document.getElementById("invalidEmail");
// x.style.display = "none";
// document.getElementById('invalidNumber').style.display = "none";

var myApp = angular.module('esopApp', []);	

myApp.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function () {
				scope.$apply(function () {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

myApp.service('fileUpload', ['$rootScope', '$http', function ($rootScope, $http) {
	this.uploadFileToUrl = function (file, email, fileType, uploadUrl) {
		var fd = new FormData();
		fd.append("email", email);
		fd.append("fileType", fileType);
		fd.append('file', file);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		})
			.then(function (response) {
				console.log("success");
				$('.tab-content').css({ "opacity": 1, "pointer-events": "visible" });
				$(".loader2").css("display", "none");
				$('#makePayment').css("cursor", "pointer");
				$rootScope.makePay = true;


			})
			.catch(function () {
				console.log("error");
			});
	}
}]);



myApp.controller('myCtrl', ['$rootScope', '$scope', '$http', 'fileUpload', '$window', function ($rootScope, $scope, $http, fileUpload, $window) {
	// $('.nav li').not('.active').addClass('disabled');
	// updatepayment();

	// jq('#exampleModal').modal('show')

	$('.nav li').not('.active').find('a').removeAttr("data-toggle");
	$scope.kycDetails = {};
	$scope.kycDetails.docs;
	$scope.files = [];
	$scope.error = false;
	$rootScope.makePay = false;
	$rootScope.payment = false;
	$scope.throughReference = false;
	// $('#userAlreadyExistsModal').modal('show');

	$('#address2').css("display", "none");
	$('#sameAdd2[value="no"]').on('change', function () {
		$('#address2').show();
	});
	$('#sameAdd[value="yes"]').on('change', function () {
		$('#address2').hide();
	});
	$scope.kycDetails.hasDsc = true;
	$scope.refresh = function () {
		$window.location.reload();
	}

	$scope.updatepayment = function () {
		// alert("inside function");
		if (localStorage.getItem("paymentdetails")) {
			var data = (localStorage.getItem("paymentdetails"));
			data = JSON.parse(data);

			var payload = {
				amount: data.payment_request.amount,
				email: data.payment_request.email,
				paid: 'true'

			}
			// alert(JSON.stringify(payload));
			$http.post('https://portal.lexstart.com/api/updatePayment', payload).then(function (response) {
				setTimeout(function () {
					$window.localStorage.clear();
					$window.location.href = 'http://www.lexstart.com/';
				}, 800);
			}).catch(function (params) {
				console.log('error');
				$window.localStorage.clear();
			})
		}
	}

	//function on the click of next button
	$scope.submitKycDeatils = function () {
		console.log("KycDetails: " + JSON.stringify($scope.kycDetails));

		$scope.email = {
			email: $scope.kycDetails.emailId
		}

		//http call for matching email 		
		$http.post('https://portal.lexstart.com/api/findByEmail', $scope.email).then(function (response) {
			// alert("response: " + JSON.stringify(response.data));
			$scope.kycData = response;
			// console.log("................." + JSON.stringify($scope.kycDetails));
			$scope.kycDetails.status = "In progress";

			if ($scope.kycData.data.length === 1) {
				if ($(".nav-tabs").find("li.active a").text() == "Personal DetailsPersonalDetails" && $scope.throughReference == false) {
					// alert("User already exists");
					$('#userAlreadyExistsModal').modal('show');
					return;
				}
				if ($(".nav-tabs").find("li.active a").text() == "Personal DetailsPersonalDetails") {
					var request = {
						_id: $scope.id,
						details: $scope.kycDetails
					}
					$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
						// alert('details updated' + JSON.stringify(response.data));
						$(".next-text").parents(".tab-wrapper").find(".nav-tabs li.active").removeClass('active').next().addClass('active')
						$(".next-text").parents(".tab-wrapper").find(".tab-content .tab-pane.active").removeClass('active').next().addClass('active')
						$(".next-text").parents(".tab-wrapper").find(".tab-content .tab-pane.active a").next().attr("data-toggle")
						if ($('#Payment').hasClass('active')) {
							$('#makePayment').css({ "display": "inline-block" })
							$('#next').css({ "display": "none" })
						}
						if ($(".nav-tabs").find("li.active a").text() == "KYC DetailsKYCDetails") {
							// alert("inside kyc");
							$("#file").hide();
							$("#next").show();
						}
						else if ($(".nav-tabs").find("li.active a").text() == "Upload DocumentsUploadDocuments") {
							// alert("inside upload");
							$("#file").show();
							$("#next").hide();
						}
						else if ($(".nav-tabs").find("li.active a").text() == "PaymentPayment") {
							// alert("inside upload");
							$("#file").hide();
							$("#makePayment").show();
						}



					}).catch(function (error) {
						console.log('error while updating details: ' + JSON.stringify(error));
					});
				}
				else if ($(".nav-tabs").find("li.active a").text() == "KYC DetailsKYCDetails") {
					// alert("inside else if");
					// $scope.invalidAadhaar = false;
					// $scope.noAadhaar = false;
					$scope.noDin = false;
					$scope.noAddress = false;
					validateDin();
					validateAddress();
					// if ($scope.kycDetails.residentDirector) {
					// 	validateAadhaar();
					// }

					// function validateAadhaar() {
					// 	var aadhaar = $scope.kycDetails.aadhaarNumber;
					// 	if (aadhaar == undefined) {
					// 		$scope.noAadhaar = true;
					// 	}
					// 	var aadhaarValid = aadhaar.replace(/[^\d]/g, '');
					// 	// alert(aadhaarValid);
					// 	if (aadhaarValid.length == 12) {
					// 		// alert("true");
					// 		$scope.invalidAadhaar = false;
					// 	}
					// 	else {
					// 		// alert("false");
					// 		$scope.invalidAadhaar = true;
					// 	}
					// }

					function validateDin() {
						var din = $scope.kycDetails.dinNumber;
						if (din == undefined || din == "") {
							$scope.noDin = true;
						}
					}

					function validateAddress() {
						var address = $scope.kycDetails.address;
						if (address == undefined || address == "") {
							$scope.noAddress = true;
						}
					}

					$scope.id = $scope.kycData.data[0]._id;

					if ($scope.noDin == false && $scope.noAddress == false) {
						// alert("inside actual function");
						var request = {
							_id: $scope.id,
							details: $scope.kycDetails
						}
						$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
							// alert('details updated' + JSON.stringify(response.data));
							$(".next-text").parents(".tab-wrapper").find(".nav-tabs li.active").removeClass('active').next().addClass('active')
							$(".next-text").parents(".tab-wrapper").find(".tab-content .tab-pane.active").removeClass('active').next().addClass('active')
							$(".next-text").parents(".tab-wrapper").find(".tab-content .tab-pane.active a").next().attr("data-toggle")
							if ($('#Payment').hasClass('active')) {
								$('#makePayment').css({ "display": "inline-block" })
								$('#next').css({ "display": "none" })
							}
							if ($(".nav-tabs").find("li.active a").text() == "KYC DetailsKYCDetails") {
								// alert("inside kyc");
								$("#file").hide();
								$("#next").show();
							}
							else if ($(".nav-tabs").find("li.active a").text() == "Upload DocumentsUploadDocuments") {
								// alert("inside upload");
								$("#file").show();
								$("#next").hide();
							}
							else if ($(".nav-tabs").find("li.active a").text() == "PaymentPayment") {
								// alert("inside upload");
								$("#file").hide();
								$("#makePayment").show();
							}



						}).catch(function (error) {
							console.log('error while updating details: ' + JSON.stringify(error));
						});
					}
				}

			} else {
				$scope.temp = $scope.kycDetails.emailId;
				console.log($scope.temp);
				$scope.noEmail = false;
				$scope.nocontact = false;
				$scope.invalidEmail = false;
				$scope.invalidContact = false;
				validateEmail();
				validateContact();
				function validateEmail() {
					var y = $scope.temp;
					console.log(y);
					if (y == undefined) {
						// alert("Enter email address");
						$scope.noEmail = true;
					}
					var atpos2 = y.indexOf("@");
					var dotpos2 = y.lastIndexOf(".");
					if (atpos2 < 1 || dotpos2 < atpos2 + 2 || dotpos2 + 2 >= y.length) {
						// alert("invalid email");
						$scope.invalidEmail = true;
					}

				}
				function validateContact() {
					var phone = $scope.kycDetails.contactNumber;
					// console.log("=======: "+phone);
					if (phone == undefined || phone == "") {
						// alert("Enter contact number");
						$scope.nocontact = true;
					}
					// var phoneNum = phone.replace(/[^\d]/g, '');
					// if (phoneNum.length == 10) {
					// 	// alert("true");
					// }
					// else {
					// 	// alert("false");
					// 	$scope.invalidContact = true;
					// }
				}
				// return;
				if ($scope.invalidEmail == false && $scope.noEmail == false && $scope.nocontact == false) {
					//http call for saving form 
					$http.post('https://portal.lexstart.com/api/directorkycdetails', $scope.kycDetails).then(function (response) {
						// alert('details saved');
						$scope.hideNotes = true;

						//open director popup
						$('#directorModal').modal('show');

						$http.post('https://portal.lexstart.com/api/findByEmail', $scope.email).then(function (response) {
							// alert(JSON.stringify(response.data));
							// alert(response.data[0]._id);
							$rootScope.id = response.data[0]._id;
							var referenceNumber = response.data[0]._id;

							//reference number mail to client
							var payload = {
								// "to": $scope.kycDetails.emailId,
								// "subject": "LexStart Reference No.| Director KYC",
								// "html": "Thank you for registering with LexStart. Your reference no. is <b>"+ referenceNumber +"</b>. You can complete or update the KYC form or upload the documents required, at any time, by clicking <a href='http://lexstart.com/directorKycForm.html'>here</a> and entering the reference no.  <br> <br> Kind Regards	<br>LexStart Team",
								// "bcc": "false"
								name: response.data[0].name,
								email: response.data[0].emailId,
								referenceNo: response.data[0]._id
							}
							// alert(JSON.stringify(payload));
							// return;
							$http.post('https://api.lexstart.com/kycRegistration', payload).then(function (response) {
								// alert("mail sent");
								$(".next-text").parents(".tab-wrapper").find(".nav-tabs li.active").removeClass('active').next().addClass('active')
								$(".next-text").parents(".tab-wrapper").find(".tab-content .tab-pane.active").removeClass('active').next().addClass('active')
								$(".next-text").parents(".tab-wrapper").find(".tab-content .tab-pane.active a").next().attr("data-toggle")

							}).catch(function (error) {
								alert("error while sending mail: " + JSON.stringify(error));
							});

						}).catch(function (error) {
							alert(error);
						});
					}).catch(function (error) {
						alert('error while saving details: ' + error);
					});
				}
			}
		}).catch(function (error) {
			console.log(error);
		});
	}


	////////////////////////File upload Validation for buttob proceed////////////////////////
	$scope.submitKycDeatils2 = function () {
		// alert("file wala inside" + JSON.stringify($rootScope.isIdentityproof));
		console.log($rootScope.isAddressProof);
		// if ($scope.kycDetails.aadhaar == true && $scope.kycDetails.addressProof == true && $scope.kycDetails.identityProof == true) {
		console.log("KycDetails2: " + JSON.stringify($scope.kycDetails));

		$scope.email = {
			email: $scope.kycDetails.emailId
		}

		//http call for matching email 		
		$http.post('https://portal.lexstart.com/api/findByEmail', $scope.email).then(function (response) {
			// alert("response: " + JSON.stringify(response.data));
			$scope.kycData = response;
			console.log("................." + JSON.stringify($scope.kycDetails));
			$scope.kycDetails.status = "In progress";
			if ($scope.kycData.data.length === 1) {

				$scope.id = $scope.kycData.data[0]._id;
				// alert($scope.id);
				var request = {
					_id: $scope.id,
					details: $scope.kycDetails
				}

				$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
					// alert('details updated' + JSON.stringify(response.data));
					$(".next-text").parents(".tab-wrapper").find(".nav-tabs li.active").removeClass('active').next().addClass('active')
					$(".next-text").parents(".tab-wrapper").find(".tab-content .tab-pane.active").removeClass('active').next().addClass('active')
					$(".next-text").parents(".tab-wrapper").find(".tab-content .tab-pane.active a").next().attr("data-toggle")
					if ($('#Payment').hasClass('active')) {
						$('#makePayment').css({ "display": "inline-block" })
						$('#next').css({ "display": "none" })
					}
					if ($(".nav-tabs").find("li.active a").text() == "KYC DetailsKYCDetails") {
						// alert("inside kyc");
						$("#file").hide();
						$("#next").show();
					}
					else if ($(".nav-tabs").find("li.active a").text() == "Upload DocumentsUploadDocuments") {
						// alert("inside upload");
						$("#file").show();
						$("#next").hide();
					}
					else if ($(".nav-tabs").find("li.active a").text() == "PaymentPayment") {
						// alert("inside upload");
						$("#file").hide();
						$("#makePayment").show();
					}

				}).catch(function (error) {
					console.log('error while updating details: ' + JSON.stringify(error));
				});
			} else {
				$scope.temp = $scope.kycDetails.emailId;
				console.log($scope.temp);
				$scope.invalidEmail = false;
				$scope.invalidContact = false;
				validateEmail();
				validateContact();
				// validateFormcc();
				function validateEmail() {
					// alert("inside validate");
					var y = $scope.temp;
					console.log(y);
					var atpos2 = y.indexOf("@");
					var dotpos2 = y.lastIndexOf(".");
					if (atpos2 < 1 || dotpos2 < atpos2 + 2 || dotpos2 + 2 >= y.length) {
						// alert("invalid email");
						$scope.invalidEmail = true;
					}
				}
				function validateContact() {
					var phone = $scope.kycDetails.contactNumber;
					var phoneNum = phone.replace(/[^\d]/g, '');
					if (phoneNum.length == 10) {
						// alert("true");
					}
					else {
						// alert("false");
						$scope.invalidContact = true;
					}
				}
				// return;
				if ($scope.invalidEmail == false && $scope.invalidContact == false) {
					//http call for saving form 
					$http.post('https://portal.lexstart.com/api/directorkycdetails', $scope.kycDetails).then(function (response) {
						// alert('details saved');
						$scope.hideNotes = true;

						//open director popup
						$('#directorModal').modal('show');

						$http.post('https://portal.lexstart.com/api/findByEmail', $scope.email).then(function (response) {
							// alert(JSON.stringify(response.data));
							// alert(response.data[0]._id);
							$rootScope.id = response.data[0]._id;
							var referenceNumber = response.data[0]._id;

							//reference number mail to client
							var payload = {
								// "to": $scope.kycDetails.emailId,
								// "subject": "LexStart Reference No.| Director KYC",
								// "html": "Thank you for registering with LexStart. Your reference no. is <b>" + referenceNumber + "</b>. Our Compliance Team will be in touch with you for next steps. <br> <br> Kind Regards	<br>LexStart Team",
								// "bcc": "false"
								name: response.data[0].name,
								email: response.data[0].emailId,
								referenceNo: response.data[0]._id
							}
							$http.post('https://portal.lexstart.com/api/referenceEmail', payload).then(function (response) {
								// alert("mail sent");
								$(".next-text").parents(".tab-wrapper").find(".nav-tabs li.active").removeClass('active').next().addClass('active')
								$(".next-text").parents(".tab-wrapper").find(".tab-content .tab-pane.active").removeClass('active').next().addClass('active')
								$(".next-text").parents(".tab-wrapper").find(".tab-content .tab-pane.active a").next().attr("data-toggle")
							}).catch(function (error) {
								alert("error while sending mail: " + error);
							});

						}).catch(function (error) {
							alert(error);
						});
					}).catch(function (error) {
						alert('error while saving details: ' + error);
					});
				}
			}
		}).catch(function (error) {
			console.log(JSON.stringify(error));
		});
		// } else {
		// 	// alert("Please upload required files");
		// 	$('#fileErrorModal').modal("show");
		// }
	}

	///////////////////////////////////file upload functions for all the documents/////////////////////////
	$scope.uploadFile1 = function (identityProof) {
		console.log(JSON.stringify(identityProof));
		$rootScope.isIdentityproof = identityProof;
		var file = $scope.identityProof;
		console.log('file is ' + JSON.stringify(file));
		var fileType = "identityProof";
		var email = $scope.kycDetails.emailId;
		var uploadUrl = "https://portal.lexstart.com/api/uploadDocument";
		fileUpload.uploadFileToUrl(file, email, fileType, uploadUrl);

		if (file == undefined) {
			$('.tab-content').css({ "opacity": 1, "pointer-events": "visible" });
			$(".loader2").css("display", "none");
			// alert("No file Choosen");
			$(".no-file-selected1").css({ "display": "block", "color": "red" });

		} else {
			$(".no-file-selected1").css("display", "none");
			$scope.kycDetails.identityProof = true;
			var request = {
				_id: $scope.id,
				details: $scope.kycDetails
			}
			$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
				// alert("success identity proof");				
			}).catch(function (error) {
				alert("Error: " + JSON.stringify(error));
			});
		}
	};

	$scope.uploadFile2 = function (addressProof) {
		$rootScope.isAddressProof = addressProof;
		var file = $scope.addressProof;
		console.log('file is ' + JSON.stringify(file));
		var fileType = "addressProof";
		var email = $scope.kycDetails.emailId;
		var uploadUrl = "https://portal.lexstart.com/api/uploadDocument";
		fileUpload.uploadFileToUrl(file, email, fileType, uploadUrl);

		if (file == undefined) {
			$('.tab-content').css({ "opacity": 1, "pointer-events": "visible" });
			$(".loader2").css("display", "none");
			// alert("No file Choosen");
			$(".no-file-selected2").css({ "display": "block", "color": "red" });

		} else {
			$(".no-file-selected2").css("display", "none");
			$scope.kycDetails.addressProof = true;
			var request = {
				_id: $scope.id,
				details: $scope.kycDetails
			}
			$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
				// alert("success address proof");
			}).catch(function (error) {
				alert("Error: " + JSON.stringify(error));
			});
		}
	};

	$scope.uploadFile3 = function () {
		$('.tab-content').css({ "opacity": 0.4, "pointer-events": "none" });
		$(".loader2").css("display", "block");
		var file = $scope.photo;
		// console.log('file is ' + JSON.stringify(file));
		var fileType = "passportSizePhoto";
		var email = $scope.kycDetails.emailId;
		var uploadUrl = "https://portal.lexstart.com/api/uploadDocument";
		fileUpload.uploadFileToUrl(file, email, fileType, uploadUrl);

		if (file == undefined) {
			$('.tab-content').css({ "opacity": 1, "pointer-events": "visible" });
			$(".loader2").css("display", "none");
			// alert("No file Choosen");
			$(".no-file-selected3").css({ "display": "block", "color": "red" });

		} else {
			$(".no-file-selected3").css("display", "none");
			$scope.kycDetails.photo = true;
			var request = {
				_id: $scope.id,
				details: $scope.kycDetails
			}
			$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
				// alert("success photo");
			}).catch(function (error) {
				alert("Error: " + JSON.stringify(error));
			});
		}
	};

	$scope.uploadFile4 = function () {
		var file = $scope.dscAppForm;
		// console.log('file is ' + JSON.stringify(file));
		var fileType = "DscApplicationForm";
		var email = $scope.kycDetails.emailId;
		var uploadUrl = "https://portal.lexstart.com/api/uploadDocument";
		fileUpload.uploadFileToUrl(file, email, fileType, uploadUrl);

		if (file == undefined) {
			$('.tab-content').css({ "opacity": 1, "pointer-events": "visible" });
			$(".loader2").css("display", "none");
			// alert("No file Choosen");
			$(".no-file-selected4").css({ "display": "block", "color": "red" });

		} else {
			$(".no-file-selected4").css("display", "none");
			$scope.kycDetails.dscAppForm = true;
			var request = {
				_id: $scope.id,
				details: $scope.kycDetails
			}
			$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
				// alert("success dsc app form");
			}).catch(function (error) {
				alert("Error: " + JSON.stringify(error));
			});
		}
	};

	$scope.uploadFile5 = function (aadhaar) {
		var file = $scope.aadhaar;
		// console.log('file is ' + JSON.stringify(file));
		var fileType = "aadhaar";
		var email = $scope.kycDetails.emailId;
		var uploadUrl = "https://portal.lexstart.com/api/uploadDocument";
		fileUpload.uploadFileToUrl(file, email, fileType, uploadUrl);

		if (file == undefined) {
			$('.tab-content').css({ "opacity": 1, "pointer-events": "visible" });
			$(".loader2").css("display", "none");
			// alert("No file Choosen");
			$(".no-file-selected5").css({ "display": "block", "color": "red" });

		} else {
			// alert("else");
			$(".no-file-selected5").css("display", "none");
			$scope.kycDetails.aadhaar = true;
			var request = {
				_id: $scope.id,
				details: $scope.kycDetails
			}
			// alert(JSON.stringify(request));
			console.log(JSON.stringify(request));
			$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
				// alert("success aadhaar app form");
			}).catch(function (error) {
				alert("Error: " + JSON.stringify(error));
			});
		}
	};

	$scope.uploadFile6 = function () {
		var file = $scope.passport;
		var fileType = "passport";
		var email = $scope.kycDetails.emailId;
		var uploadUrl = "https://portal.lexstart.com/api/uploadDocument";
		fileUpload.uploadFileToUrl(file, email, fileType, uploadUrl);

		if (file == undefined) {
			$('.tab-content').css({ "opacity": 1, "pointer-events": "visible" });
			$(".loader2").css("display", "none");
			// alert("No file Choosen");
			$(".no-file-selected6").css({ "display": "block", "color": "red" });

		} else {
			$(".no-file-selected6").css("display", "none");
			$scope.kycDetails.passport = true;
			var request = {
				_id: $scope.id,
				details: $scope.kycDetails
			}
			$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
				// alert("success dsc app form");
			}).catch(function (error) {
				alert("Error: " + JSON.stringify(error));
			});
		}
	};

	/////////////////////////////////////pop up functions/////////////////////////////////
	$scope.residntDirector = function () {
		$scope.kycDetails.residentDirector = true;
		$scope.residentDirector = true;
		$scope.NonResidentDirector = false;
		// alert(JSON.stringify($scope.kycDetails));
		// alert($scope.id);
		var request1 = {
			_id: $rootScope.id,
			details: $scope.kycDetails
		}
		$http.put('https://portal.lexstart.com/api/upadteDetails', request1).then(function (response) {
			// alert('details updated' + JSON.stringify(response.data));
			$('#directorModal').modal('hide');
			$('#passportModal').modal('show');

		}).catch(function (error) {
			console.log('error while updating details: ' + JSON.stringify(error));
		});
	};

	$scope.nonResidntDirector = function () {
		$scope.kycDetails.residentDirector = false;
		$scope.NonResidentDirector = true;
		$scope.residentDirector = false;
		// alert(JSON.stringify($scope.kycDetails));
		// alert($scope.id);
		var request1 = {
			_id: $rootScope.id,
			details: $scope.kycDetails
		}
		$http.put('https://portal.lexstart.com/api/upadteDetails', request1).then(function (response) {
			// alert('details updated' + JSON.stringify(response.data));
			$('#directorModal').modal('hide');
			$('#dscModal').modal('show');

		}).catch(function (error) {
			console.log('error while updating details: ' + JSON.stringify(error));
		});
	};

	$scope.validPassport = function () {
		$scope.kycDetails.validPassport = true;

		var request1 = {
			_id: $rootScope.id,
			details: $scope.kycDetails
		}
		$http.put('https://portal.lexstart.com/api/upadteDetails', request1).then(function (response) {
			// alert('details updated' + JSON.stringify(response.data));
			$('#passportModal').modal('hide');
			$('#dscModal').modal('show');

		}).catch(function (error) {
			console.log('error while updating details: ' + JSON.stringify(error));
		});
	};

	$scope.noValidPassport = function () {
		$scope.kycDetails.validPassport = false;

		var request1 = {
			_id: $rootScope.id,
			details: $scope.kycDetails
		}
		$http.put('https://portal.lexstart.com/api/upadteDetails', request1).then(function (response) {
			// alert('details updated' + JSON.stringify(response.data));
			$('#passportModal').modal('hide');
			$('#dscModal').modal('show');

		}).catch(function (error) {
			console.log('error while updating details: ' + JSON.stringify(error));
		});
	};
	$scope.hasDsc = function () {
		$scope.yesDsc = true;
		$scope.noDsc = false;
		$scope.kycDetails.hasDsc = true;
		$scope.paymentAmount = 999;
		$scope.kycDetails.amountPaid = 999;
		// alert(JSON.stringify($scope.kycDetails));
		// alert($scope.id);
		var request1 = {
			_id: $rootScope.id,
			details: $scope.kycDetails
		}
		$http.put('https://portal.lexstart.com/api/upadteDetails', request1).then(function (response) {
			// alert('details updated' + JSON.stringify(response.data));
			$('#passportModal').modal('hide');
			// $('#dscModal').modal('show');
			$('#dscModal').modal('hide');

		}).catch(function (error) {
			console.log('error while updating details: ' + JSON.stringify(error));
		});
	};

	$scope.noDsc = function () {
		$scope.noDsc = true;
		$scope.yesDsc = false;
		$scope.kycDetails.hasDsc = false;
		$scope.paymentAmount = 2498;
		$scope.kycDetails.amountPaid = 2498;
		// alert(JSON.stringify($scope.kycDetails));
		var request1 = {
			_id: $rootScope.id,
			details: $scope.kycDetails
		}
		$http.put('https://portal.lexstart.com/api/upadteDetails', request1).then(function (response) {
			// alert('details updated' + JSON.stringify(response.data));
			$('#passportModal').modal('hide');
			// $('#dscModal').modal('show');
			$('#dscModal').modal('hide');

		}).catch(function (error) {
			console.log('error while updating details: ' + JSON.stringify(error));
		});
	};

	$scope.makePayment = function () {
		var payload = {
			purpose: 'Kyc_Payments',
			amount: $scope.kycDetails.amountPaid,
			// phone: org_phone
			buyer_name: $scope.kycDetails.name,
			redirect_url: window.location.origin + "/success.html",
			send_email: true,
			// send_sms: true,
			email: $scope.kycDetails.emailId,
			allow_repeated_payments: false
		};

		$http.post('https://api.lexstart.com/get/payment-requests-prod/', payload)
			.then(function (res) {

				// alert(JSON.stringify(res.data.payment_response.payment_request.id));
				// $scope.kycDetails.paymentId = res.data.payment_response.payment_request.id;

				// var request1 = {
				// 	_id: $rootScope.id,
				// 	details: $scope.kycDetails
				// }
				// console.log(JSON.stringify(request1));
				// $scope.longurl = res.data.payment_response.payment_request.longurl;

				// $http.put('https://portal.lexstart.com/api/upadteDetails', request1).then(function (req) {
				// 	console.log($scope.longurl);
				// 	console.log(JSON.stringify(req));
				// 	$window.location.href = $scope.longurl;

				// }).catch(function (params) {
				// 	console.log("error");

				// });


				$window.localStorage.setItem("paymentdetails", JSON.stringify(res.data.payment_response));
				setTimeout(function () {
					$window.location.href = res.data.payment_response.payment_request.longurl;
				}, 1500)

			})
			.catch(function (params) {
				console.log("error" + params);
				$window.localStorage.clear();

			})
	}

	//function for existing user
	$scope.userForm = function () {
		// console.log("inside user form function: " + JSON.stringify($scope.referenceNumber));

		$scope.data = {
			referenceNumber: $scope.referenceNumber
		}
		// return;
		// console.log("reference number:"+JSON.stringify($scope.referenceNo));
		$http.post('https://portal.lexstart.com/api/findByReferenceNumber', $scope.data).then(function (response) {
			// alert(JSON.stringify(response));
			if (response.data.length == 0) {
				// alert("length 0");
				$scope.error = true;
			} else {
				// alert("length not 0");
				$scope.kycDetails = response.data[0];
				// updatepayment();
				$scope.throughReference = true;
				$('#referenceModal').modal('hide');
			}

		}).catch(function (error) {
			// alert(JSON.stringify(error));
			$scope.error = true;
		});

	}

	$scope.coupon_value;
	$scope.calc_discount = function (coupon_value) {
		if (coupon_value == "KYCWLEX" && $rootScope.payment == false) {
			var temp = ($scope.kycDetails.amountPaid / 100) * 25;
			$rootScope.payment = true;
			$scope.kycDetails.amountPaid = $scope.kycDetails.amountPaid - temp;
			$('p.success').css("display", "block");
			$('p.invalid').css("display", "none");
		}
		else if (coupon_value != "KYCWLEX") {
			$('p.success').css("display", "none");
			$('p.invalid').css("display", "block");
		}
	}

	$scope.setFileID = function (element) {
		$('.tab-content').css({ "opacity": 0.4, "pointer-events": "none" });
		$(".loader2").css("display", "block");
		$scope.$apply(function ($scope) {
			$scope.file1 = element.files[0];
			$scope.IdFileName = $scope.file1.name;
			setTimeout(function () {
				$scope.uploadFile1($scope.file1);
			}, 1000);
		});
	};
	$scope.removeFile1 = function () {
		$scope.kycDetails.identityProof = false;
		var request = {
			_id: $scope.id,
			details: $scope.kycDetails
		}
		// alert(JSON.stringify(request));
		$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
			// alert("success identity proof");				
			$scope.file1 = null;
			$scope.IdFileName = null;
		}).catch(function (error) {
			alert("Error: " + JSON.stringify(error));
		});
	}

	$scope.setFileAP = function (element) {
		$('.tab-content').css({ "opacity": 0.4, "pointer-events": "none" });
		$(".loader2").css("display", "block");
		$scope.$apply(function ($scope) {
			$scope.file3 = element.files[0];
			$scope.ApFileName = $scope.file3.name;
			setTimeout(function () {
				$scope.uploadFile2($scope.file3);
			}, 1000);
		});
	};
	$scope.removeFileAP = function () {
		$scope.kycDetails.addressProof = false;
		var request = {
			_id: $scope.id,
			details: $scope.kycDetails
		}
		// alert(JSON.stringify(request));
		$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
			// alert("success identity proof");				
			$scope.file3 = null;
			$scope.ApFileName = null;
		}).catch(function (error) {
			alert("Error: " + JSON.stringify(error));
		});
	}

	$scope.setFilePP = function (element) {
		$('.tab-content').css({ "opacity": 0.4, "pointer-events": "none" });
		$(".loader2").css("display", "block");
		$scope.$apply(function ($scope) {
			$scope.file5 = element.files[0];
			$scope.PpFileName = $scope.file5.name;
			setTimeout(function () {
				$scope.uploadFile3($scope.file5);
			}, 1000);
		});
	};
	$scope.removeFilePP = function () {
		$scope.kycDetails.photo = false;
		var request = {
			_id: $scope.id,
			details: $scope.kycDetails
		}
		// alert(JSON.stringify(request));
		$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
			// alert("success identity proof");				
			$scope.file5 = null;
			$scope.PpFileName = null;
		}).catch(function (error) {
			alert("Error: " + JSON.stringify(error));
		});
	}

	$scope.setFileDSC = function (element) {
		$('.tab-content').css({ "opacity": 0.4, "pointer-events": "none" });
		$(".loader2").css("display", "block");
		$scope.$apply(function ($scope) {
			$scope.file6 = element.files[0];
			$scope.DSCFileName = $scope.file6.name;
			setTimeout(function () {
				$scope.uploadFile4($scope.file6);
			}, 1000);
		});
	};
	$scope.removeFileDSC = function () {
		$scope.kycDetails.dscAppForm = false;
		var request = {
			_id: $scope.id,
			details: $scope.kycDetails
		}
		// alert(JSON.stringify(request));
		$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
			// alert("success identity proof");				
			$scope.file6 = null;
			$scope.DSCFileName = null;
		}).catch(function (error) {
			alert("Error: " + JSON.stringify(error));
		});
	}

	$scope.setFilePass = function (element) {
		$('.tab-content').css({ "opacity": 0.4, "pointer-events": "none" });
		$(".loader2").css("display", "block");
		$scope.$apply(function ($scope) {
			$scope.file4 = element.files[0];
			$scope.PassFileName = $scope.file4.name;
			setTimeout(function () {
				$scope.uploadFile6($scope.file4);
			}, 1000);
		});
	};
	$scope.removeFilePass = function () {
		$scope.kycDetails.passport = false;
		var request = {
			_id: $scope.id,
			details: $scope.kycDetails
		}
		// alert(JSON.stringify(request));
		$http.put('https://portal.lexstart.com/api/upadteDetails', request).then(function (response) {
			// alert("success identity proof");				
			$scope.file4 = null;
			$scope.PassFileName = null;
		}).catch(function (error) {
			alert("Error: " + JSON.stringify(error));
		});
	}

	$scope.service_list = [
		{
			name: 'File Annual Returns'
		},
		{
			name: 'File DIR 3 KYC'
		},
		{
			name: 'Corporate Compliance'
		},
		{
			name: 'ESOP'
		},
		{
			name: 'Fundraising Documentation'
		},
		{
			name: 'Tradmark Registration'
		},
		{
			name: 'Others'
		}
	]
	$scope.services = [
		'File Annual Returns', 'File DIR 3 KYC', 'Corporate Compliance', 'ESOP', 'Fundraising Documention', 'Tradmark Registration', 'Others'
	];
	$scope.service_selected = {};

	$scope.redirect = function (params) {
		$('#confirmation').modal('hide');

		$window.location.href = 'http://www.lexstart.com/';
	};




	$scope.get_user_data = function () {
		

		var x, i , valid = true;

	  x = document.getElementsByTagName("input");
	 // A loop that checks every input field in form:
	 for (i = 0; i < x.length; i++) {
		// If a field is empty...
		if (x[i].value == "") {
		  // add an "invalid" class to the field:
		//   alert("invalid");
		  x[i].className += " invalid";
		  
		  // and set the current valid status to false
		  valid = false;
		}
	  }
	  // If the valid status is true, mark the step as finished and valid:
  if (valid) {

	var email = document.getElementById("email").value;
    var reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (reg.test(email)){
	//   alert("valid");
	
	var ph_no = document.getElementById("ph_no").value;
	var phoneno = /^\d{10}$/
	if (phoneno.test(ph_no)){
		// alert("valid");
		// return valid;
	

	  angular.forEach($scope.service_selected, function (selected, service) {
		if (selected) {
			console.log(service);
		}
	});
	$scope.interest_list = [];



	var request = {
		user_data: $scope.new_user,
		interest_list: $scope.service_selected,
		message: $scope.user_message
	}
	//  console.log("Req. data: " + JSON.stringify(request))
	 $http.post('https://api.lexstart.com/register', request).then(function (response) {
	//	$http.post('http://localhost:3000/api/v2/register', request).then(function (response) {
		// alert('details updated' + JSON.stringify(response.data));
		$('#confirmation').modal('show');
		// angular.element(document.querySelector('#confirmation').show());



	}).catch(function (error) {

		console.log('error while updating details: ' + JSON.stringify(error));

	});

	} else {
		alert("Invalid Mobile Number");
	  return false;
	}

//   return valid; // return the valid status
} else {
    alert("Please enter a valid E-Mail id");
    return false;
  }

//   var ph_no = document.getElementById("ph_no").value;
//   var phoneno = /^\d{10}$/
//   if (phoneno.test(ph_no)){
// 	  alert("valid");
// 	  return valid;
//   } else {
// 	  alert("invalid phone number");
// 	return false;
//   }

}
}


}]);
