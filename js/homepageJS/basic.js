var jq = jQuery.noConflict();

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the crurrent tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    // alert(n);
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submitBtn").style.display = "block";
    // document.getElementById("nextBtn").innerHTML = "Submit";

  } else {
    document.getElementById("submitBtn").style.display = "none";
    // document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("nextBtn").style.display = "inline";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}


function nextPrev(n) {


  if (document.getElementById('q2_no').checked){
    if (!document.getElementById('q2_b1').checked  && !document.getElementById('q2_b2').checked && !document.getElementById('q2_b3').checked){
      // alert("If not, Please select one of the following option");
      jq('#ifNotModal').modal('show')
      return false;
    }
  }

  if (document.getElementById('q3_no').checked){
    if (!document.getElementById('q3_b1').checked  && !document.getElementById('q3_b2').checked && !document.getElementById('q3_b3').checked){
      // alert("If not, Please select one of the following option");
      jq('#ifNotModal').modal('show')
      return false;
    }
  }

  if (document.getElementById('q5_1').checked){
    if (!document.getElementById('q5_b1').checked  && !document.getElementById('q5_b2').checked){
      // alert("If Yes, Please select one of the following option");
      jq('#ifYesModal').modal('show')
      return false;
    }
  }

  if (document.getElementById('q6_1').checked){
    if (!document.getElementById('q6_b1').checked  && !document.getElementById('q6_b2').checked){
      // alert("If Yes, Please select one of the following option");
      jq('#ifYesModal').modal('show')
      return false;
    }
  }

 

  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()){
    // jq('#emptyModal').modal('show')
    return false;
   } else {

    var req = {
      email : document.getElementById('email').value
    }
    jq.ajax({

      url : 'https://api.lexstart.com/user_check_availibility',
      dataType : "json",
      type : 'POST',
      data : req,
      success : function(data) {

    
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("diligenceForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
  
   },
   error : function(request,error) {
       // alert("Request: "+JSON.stringify(request));
       jq('#exampleModal').modal('show')
        return false;
   }
  });
// }
}
}


document.getElementById("submitBtn").style.display = "none";
document.getElementById('ifNotExecuted').style.display="none";
document.getElementById('ifNot').style.display="none";
document.getElementById('question5b').style.display="none";
document.getElementById('question6b').style.display="none";
document.getElementById('ifYesTaken').style.display="none";
document.getElementById('question8c').style.display="none";



  var optionclickNo = document.getElementById('q2_no');
          optionclickNo.onclick = showNo;
    
  function showNo() {
    document.getElementById('ifNotExecuted').style.display="block"; 
  }

    var optionclickYes = document.getElementById('q2_yes');
            optionclickYes.onclick = showYes;

    function showYes() {
      document.getElementById('ifNotExecuted').style.display="none"; 
    }

    var optionclickIdk = document.getElementById('q2_idk');
    optionclickIdk.onclick = showIdk;

  function showIdk() {
  document.getElementById('ifNotExecuted').style.display="none"; 
  }



    var optionclickNo2 = document.getElementById('q3_no');
          optionclickNo2.onclick = showNo2;
    
  function showNo2() {
    document.getElementById('ifNot').style.display="block"; 
  }

    var optionclickYes2 = document.getElementById('q3_yes');
            optionclickYes2.onclick = showYes2;

    function showYes2() {
      document.getElementById('ifNot').style.display="none"; 
    }
  

    
    var optionclickNo5 = document.getElementById('q5_2');
    optionclickNo5.onclick = showNo5;

    function showNo5() {
    document.getElementById('question5b').style.display="none"; 
    }

    var optionclickIdk5 = document.getElementById('q5_3');
    optionclickIdk5.onclick = showNo5;

    function showNo5() {
    document.getElementById('question5b').style.display="none"; 
    }

    var optionclickYes5 = document.getElementById('q5_1');
      optionclickYes5.onclick = showYes5;

    function showYes5() {
    document.getElementById('question5b').style.display="block"; 
    }




    var optionclickNo6 = document.getElementById('q6_2');
    optionclickNo6.onclick = showNo6;

    function showNo6() {
    document.getElementById('question6b').style.display="none"; 
    }

    var optionclickSome6 = document.getElementById('q6_3');
    optionclickSome6.onclick = showSome6;

    function showSome6() {
    document.getElementById('question6b').style.display="none"; 
    }

    var optionclickYes6 = document.getElementById('q6_1');
          optionclickYes6.onclick = showYes6;

    function showYes6() {
    document.getElementById('question6b').style.display="block"; 
    }




    var optionclickNo8 = document.getElementById('q8_2');
    optionclickNo8.onclick = showSome8b;

    function showSome8b() {
    document.getElementById('ifYesTaken').style.display="none"; 
    document.getElementById('question8c').style.display="none";
    }

    var optionclickYes8 = document.getElementById('q8_1');
          optionclickYes8.onclick = showYes8b;

    function showYes8b() {
    document.getElementById('ifYesTaken').style.display="block"; 
    }

    var optionclickYes8 = document.getElementById('q8_b1');
          optionclickYes8.onclick = showYes8c;

    var optionclickYes8 = document.getElementById('q8_b2');
    optionclickYes8.onclick = showYes8c;

var optionclickYes8 = document.getElementById('q8_b3');
optionclickYes8.onclick = showYes8c;

function showYes8c() {
document.getElementById('question8c').style.display="block"; 
}


function validateForm() {
  // if(n == 0) {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // alert("Please select an option");

  // A loop that checks every input field in the current tab:
  for (var i = 0; i < y.length; i++) {    
    // alert("Please select an option");
    // If a field is empty...
    if(y[i].value == "") {
      // add an "invalid" class to the field:
      // alert("Please select an option");
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }



  
  // If the valid status is true, mark the step as finished and valid:
  if(valid) {

     
    var email = document.getElementById("email").value;
    var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (reg.test(email)){
      // alert("valid");
    document.getElementsByClassName("step")[currentTab].className += " finish";
    return true; 
  } else {
    // alert("Invalid Email-Id");
    document.getElementById("error").style.display = "block";
    return false;
  }
  }
  return valid; // return the valid status
  // }
}




function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}




// var jq = jQuery.noConflict();

jq(document).ready(function(){
  jq("#diligenceForm").submit(function(e) {

    if (document.getElementById('q8_1').checked){
      if (!document.getElementById('q8_b1').checked  && !document.getElementById('q8_b2').checked && !document.getElementById('q8_b3').checked){
        // alert("If Yes, Please select one of the following option");
        jq('#ifYesModal').modal('show')
        return false;
      }
  
     if(document.getElementById('q8_b1').checked  || document.getElementById('q8_b2').checked || document.getElementById('q8_b3').checked) {
      if (!document.getElementById('q8_c1').checked  && !document.getElementById('q8_c2').checked && !document.getElementById('q8_c3').checked){
        // alert("Please select one of the following option");
        jq('#ifYesModal').modal('show')
        return false;
      }
    }
  }
  // if(document.getElementById('q8_b1').checked  || document.getElementById('q8_b2').checked || document.getElementById('q8_b3').checked) {
  //   if (!document.getElementById('q8_c1').checked  && !document.getElementById('q8_c2').checked && !document.getElementById('q8_c3').checked){
  //     // alert("Please select one of the following option");
  //     jq('#ifYesModal').modal('show')
  //     return false;
  //   }
  // }

    var validate = true;
    var unanswered = new Array();
  
    // Loop through available sets
    jq('.option-wrapper').each(function () {


        // Question text
        var question = jq(this).prev();
        // Validate
        if (!jq(this).find('input').is(':checked')) {
            // Didn't validate ... display alert or do something
            // alert("Invalid");
  
            unanswered.push(question.text());
            question.css('color', 'red'); // Highlight unanswered question
            validate = false;
        }
    });
  
    if (unanswered.length > 0) {
        msg = "Please answer the following questions:\n" + unanswered.join('\n'); 
        alert(msg);
        // jq('#uncheckedModal').modal('show')
        return false;
    } else {
      
      e.preventDefault();
      // alert("ïnside function");
      var signupDetails = { 
      type : 'website',
      first_name: document.getElementById('f_name').value,
      email: document.getElementById('email').value,
      Email:   document.getElementById('email').value
      };
      // alert("objrct before setting org: "+JSON.stringify(signupDetails));
      jq.ajax({
        url : 'https://api.lexstart.com/subscribers',
        type : 'POST',
        data :signupDetails,
       
        success : function(response) {

            // alert('Organization created: '+ JSON.stringify(response));
  // modal for orgnization
              var reqst = {
                email: document.getElementById('email').value,
                name: document.getElementById("f_name").value
              };
  
          jq.ajax({
  
            url : 'https://api.lexstart.com/mailtriggerforbasiclogin',
            type : 'POST',
            data : reqst,
            success : function(data) {
                // alert('mail sent to client: '+ data);
            },
            error : function(request,error)
            {
                // alert("Request: "+JSON.stringify(request));
            }
          });
  
  
        jq('#Org_Modal').modal('show')
  
        
  
  
  
  
            var response = response;
            var orgid = response.result.organization_ID;
            var org_name = response.result.organization_NAME;
            var basicPackageObject = { "type": "Package", "package_id": "32904e30-da58-4f1b-b70d-9b37be3d5290", "price": 0, "start_date": new Date(), "status": 1 };
  
          var dataToPass = {organization_subscription: basicPackageObject}
            jq.ajax({
              url : 'https://api.lexstart.com/organizations/' + orgid + '/packages',
              type : 'POST',
              data :dataToPass,
             
              success : function(response) {              
                  // alert('Package added: '+JSON.stringify(response));
                  // JSON object for weightage
  var categoryDetails = [
    {
        id: 1,
        name: 'Legal entity',
        ratio: 1,
        weightage: 35
    },
    {
        id: 2,
        name: 'Team',
        ratio: 1,
        weightage: 5
    },
    {
        id: 3,
        name: 'IP',
        ratio: 1,
        weightage: 15
    },
    {
        id: 4,
        name: 'IT',
        ratio: 1,
        weightage: 10
    },
    {
        id: 5,
        name: 'Contracts',
        ratio: 1,
        weightage: 15
    },
    {
        id: 6,
        name: 'Corporate compliance',
        ratio: 1,
        weightage: 20
    }
  ]
  
  
  
  if (document.getElementById('q1_1').checked) {
    val1 = document.getElementById('q1_1').value;
  }
  else if (document.getElementById('q1_2').checked) {
    val1 = document.getElementById('q1_2').value;
  }
  else if (document.getElementById('q1_3').checked) {
    val1 = document.getElementById('q1_3').value;
  }
  else if (document.getElementById('q1_4').checked) {
    val1 = document.getElementById('q1_4').value;
  }
  else if (document.getElementById('q1_5').checked) {
    val1 = document.getElementById('q1_5').value;
  }
  else if (document.getElementById('q1_6').checked) {
    val1 = document.getElementById('q1_6').value;
  }
  
  if (document.getElementById('q2_yes').checked) {
    val2 = document.getElementById('q2_yes').value;
  }
  else if (document.getElementById('q2_no').checked) {
    val2 = document.getElementById('q2_no').value;
    // if (document.getElementById('q2_b1').checked) {
    //   val2b = document.getElementById('q2_b1').value;
    // }
    // else if (document.getElementById('q2_b2').checked) {
    //   val2b = document.getElementById('q2_b2').value;
    // }
    // else if (document.getElementById('q2_b3').checked) {
    //   val2b = document.getElementById('q2_b3').value;
    // }
  }
  else if (document.getElementById('q2_idk').checked) {
    val2 = document.getElementById('q2_idk').value;
  }
  
  if (document.getElementById('q2_b1').checked) {
    val2b = document.getElementById('q2_b1').value;
  }
  else if (document.getElementById('q2_b2').checked) {
    val2b = document.getElementById('q2_b2').value;
  }
  else if (document.getElementById('q2_b3').checked) {
    val2b = document.getElementById('q2_b3').value;
  }  
  else {
    val2b = "Not Applicable";
  }
  
  if (document.getElementById('q3_yes').checked) {
    val3 = document.getElementById('q3_yes').value;
  }
  else if (document.getElementById('q3_no').checked) {
    val3 = document.getElementById('q3_no').value;
  }
  
  if (document.getElementById('q3_b1').checked) {
    val3b = document.getElementById('q3_b1').value;
  }
  else if (document.getElementById('q3_b2').checked) {
    val3b = document.getElementById('q3_b2').value;
  }
  else if (document.getElementById('q3_b3').checked) {
    val3b = document.getElementById('q3_b3').value;
  }    
  else {
    val3b = "Not Applicable";
  }
  
  if (document.getElementById('q4_1').checked) {
    val4 = document.getElementById('q4_1').value;
  }
  else if (document.getElementById('q4_2').checked) {
    val4 = document.getElementById('q4_2').value;
  }
  else if (document.getElementById('q4_3').checked) {
    val4 = document.getElementById('q4_3').value;
  }
  else if (document.getElementById('q4_4').checked) {
    val4 = document.getElementById('q4_4').value;
  }
  
  if (document.getElementById('q5_1').checked) {
    val5 = document.getElementById('q5_1').value;
  }
  else if (document.getElementById('q5_2').checked) {
    val5 = document.getElementById('q5_2').value;
  }
  else if (document.getElementById('q5_3').checked) {
    val5 = document.getElementById('q5_3').value;
  }
  
  if (document.getElementById('q5_b1').checked) {
    val5b = document.getElementById('q5_b1').value;
  }
  else if (document.getElementById('q5_b2').checked) {
    val5b = document.getElementById('q5_b2').value;
  }
  else {
    val5b = "Not Applicable";
  }
  
  if (document.getElementById('q6_1').checked) {
    val6 = document.getElementById('q6_1').value;
  }
  else if (document.getElementById('q6_2').checked) {
    val6 = document.getElementById('q6_2').value;
  }
  else if (document.getElementById('q6_3').checked) {
    val6 = document.getElementById('q6_3').value;
  }
  
  if (document.getElementById('q6_b1').checked) {
    val6b = document.getElementById('q6_b1').value;
  }
  else if (document.getElementById('q6_b2').checked) {
    val6b = document.getElementById('q6_b2').value;
  }
  else {
    val6b = "Not Applicable";
  }
  
  if (document.getElementById('q7_1').checked) {
    val7 = document.getElementById('q7_1').value;
  }
  else if (document.getElementById('q7_2').checked) {
    val7 = document.getElementById('q7_2').value;
  }
  else if (document.getElementById('q7_3').checked) {
    val7 = document.getElementById('q7_3').value;
  }
  
  if (document.getElementById('q8_1').checked) {
    val8 = document.getElementById('q8_1').value;
  }
  else if (document.getElementById('q8_2').checked) {
    val8 = document.getElementById('q8_2').value;
  }
  
  if (document.getElementById('q8_b1').checked) {
    val8b = document.getElementById('q8_b1').value;
  }
  else if (document.getElementById('q8_b2').checked) {
    val8b = document.getElementById('q8_b2').value;
  }
  else if (document.getElementById('q8_b3').checked) {
    val8b = document.getElementById('q8_b3').value;
  }
  else {
    val8b = "Not Applicable";
  }
  
  if (document.getElementById('q8_c1').checked) {
    val8c = document.getElementById('q8_c1').value;
  }
  else if (document.getElementById('q8_c2').checked) {
    val8c = document.getElementById('q8_c2').value;
  }
  else if (document.getElementById('q8_c3').checked) {
    val8c = document.getElementById('q8_c3').value;
  }
  else {
    val8c = "Not Applicable";
  }
  
  
               var actions = [];
  
                  //question 1
          if ( val1 === 'none' ||  val1 === 'Partnership' ||  val1 === 'soleProprietorship') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 19000,
                heading: '',
                category: { catId: 1, catName: "Legal entity" },
                ratio: 0.1,
                criticality: 1,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Incorporate a private limited company";
            actions.push(dueDilObj);
            // console.log(actions);
        }
        if (val1 === 'LLP') {
          // alert(val1);
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 19000,
                heading: '',
                category: { catId: 1, catName: "Legal entity" },
                ratio: 0.5,
                criticality: 1,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Convert LLP into company";
            actions.push(dueDilObj);
            // console.log(actions);
        }
        //question 2
        if (val2b === 'Only founders not employees') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 9000,
                heading: '',
                category: { catId: 2, catName: "Team" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Execute employment agreement with employees";
            actions.push(dueDilObj);
        }
        if (val2b === 'Only employees not founders') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 14000,
                heading: '',
                category: { catId: 2, catName: "Team" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Execute employment agreement with founder";
            actions.push(dueDilObj);
        }
        if (val2b === 'Neither Employees nor Founders') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 14000,
                heading: '',
                category: { catId: 2, catName: "Team" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Execute employment agreement with founder";
            actions.push(dueDilObj);
  
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 9000,
                heading: '',
                category: { catId: 2, catName: "Team" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Execute employment agreement with employees";
            actions.push(dueDilObj);
        }
        //question3
        if (val3b === 'Neither brand name nor logo') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 1000,
                heading: '',
                category: { catId: 3, catName: "IP" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Conduct a trademark search";
            actions.push(dueDilObj);
        }
        if (val3b === 'Only brand name not logo') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 1000,
                heading: '',
                category: { catId: 3, catName: "IP" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Conduct a trademark search";
            actions.push(dueDilObj);
        }
        if (val3b === 'Only logo not brand name') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 1000,
                heading: '',
                category: { catId: 3, catName: "IP" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Conduct a trademark search";
            actions.push(dueDilObj);
        }
        //question 4
        if (val4 === 'none owned') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 7500,
                heading: '',
                category: { catId: 3, catName: "IP" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Draft assignment agreement for transfer of IP to your startup";
            actions.push(dueDilObj);
        }
        if (val4 === 'partially owned') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                lexFees: 7500,
                heading: '',
                category: { catId: 3, catName: "IP" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Draft assignment agreement for transfer of IP to your startup";
            actions.push(dueDilObj);
        }
        //question 5 
        if (val5 === 'no') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 5000,
                heading: '',
                category: { catId: 4, catName: "IT" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Draft terms of service and privacy policy";
            actions.push(dueDilObj);
        }
        if (val5b === 'yes') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 5500,
                heading: '',
                category: { catId: 4, catName: "IT" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Review terms of service and privacy policy";
            actions.push(dueDilObj);
        }
        //question 6 
        if (val6 === 'no') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 4000,
                heading: '',
                category: { catId: 5, catName: "Contracts" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Draft contracts with vendors and customers";
            actions.push(dueDilObj);
        }
        if (val6 === 'with some') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 4000,
                heading: '',
                category: { catId: 5, catName: "Contracts" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Draft contracts with vendors and customers";
            actions.push(dueDilObj);
        }
        if (val6b === 'yes') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 2000,
                heading: '',
                category: { catId: 5, catName: "Contracts" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Review contracts with vendors and customers";
            actions.push(dueDilObj);
        }
        //question 7
        if (val7 === 'No') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 9500,
                heading: '',
                category: { catId: 6, catName: "Corporate compliance" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Update compliance and filings for company";
            actions.push(dueDilObj);
        }
        if (val7 === 'maybe') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 9500,
                heading: '',
                category: { catId: 6, catName: "Corporate compliance" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Update compliance and filings for company";
            actions.push(dueDilObj);
        }
        //question 8
        if (val8c === 'no') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 6000,
                heading: '',
                category: { catId: 6, catName: "Corporate compliance" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Update compliance and filings for company";
            actions.push(dueDilObj);
        }
        if (val8c === 'maybe') {
            var dueDilObj = {
                id:orgid,
                ORG_NAME: org_name,
                actionType: 'Basic',
                lexFees: 8000,
                heading: '',
                category: { catId: 6, catName: "Corporate compliance" },
                ratio: 0.5,
                criticality: 2,
                isSubmitted: 'true',
                isPublished: 'true'
            }
            dueDilObj.heading = "Update compliance and filings for company";
            actions.push(dueDilObj);
        }
        console.log("Actions generated " + JSON.stringify(actions));
        // console.log("Categories available " + JSON.stringify(categoryDetails));
  
        var finalArray = categoryDetails;
  
        for (var f = 0; f < actions.length; f++) {
            for (var g = 0; g < categoryDetails.length; g++) {
                if (actions[f].category.catId == categoryDetails[g].id) {
                    finalArray[g].ratio = finalArray[g].ratio * actions[f].ratio
                }
            }
        }
        // console.log(JSON.stringify(finalArray) + "Final array");
        // console.log(JSON.stringify(categoryDetails) + "Final Set of values");
  
        var score = [];
        var defWeight = [];
        for (var k = 0; k < categoryDetails.length; k++) {
            score.push(categoryDetails[k].ratio * categoryDetails[k].weightage);
        }
        console.log(score);
        var lexscore = score.reduce(function (s, f) {
            return f + s;
        }, 0);
        // console.log("lexscore is: " + lexscore);
  
        var finalLexscore;
        var finaldata = [];
        var type = "Basic";
  
        if (val1 === 'none' || val1 === 'Partnership' || val1 === 'soleProprietorship') {
            var finalLexscore = lexscore / 80 * 80;
            // console.log(finalLexscore);
            for (var i = 0; i < finalArray.length; i++) {
                var categoryName = finalArray[i].name;
                var num = finalArray[i].ratio * finalArray[i].weightage / 80 * 80;
                var data = { categoryName, num };
                finaldata.push(data);
            }
        }
        if (val1 === 'LLP') {
            var finalLexscore = lexscore / 90 * 90;
            // console.log(finalLexscore);
            for (var j = 0; j < finalArray.length; j++) {
                var categoryName = finalArray[j].name;
                var num = finalArray[j].ratio * finalArray[j].weightage / 90 * 90;
                var data = { categoryName, num };
                finaldata.push(data);
            }
        }
        if (val1 === 'company' || val1 === 'Section8') {
            var finalLexscore = lexscore;
            // console.log(finalLexscore);
            for (var j = 0; j < finalArray.length; j++) {
                var categoryName = finalArray[j].name;
                var num = finalArray[j].ratio * finalArray[j].weightage;
                var data = { categoryName, num };
                finaldata.push(data);
            }
        }
        console.log("Final lexscore is: " +finalLexscore);
        // console.log("Final data: " + JSON.stringify(finaldata));
  
        jq.ajax({
          url : 'https://api.lexstart.com/organizations/createDemoActionList',
          type : 'POST',
          data : {actions: actions},
          success : function(data) {
              // alert('actions generated succesfully: '+data);
  
              var data;
              var temp_categorized_score = [];
              for (i = 0; i < finaldata.length; i++) {
                  data = {
                      name: finaldata[i].categoryName,
                      score: finaldata[i].num
                  }
                  temp_categorized_score.push(data);
              }
  
              var saveToLexScore = {
                org_id: orgid,
                Lexscore: finalLexscore,
                lexscoreByParts: temp_categorized_score,
                typeOfScore: type
            };
  
              jq.ajax({
                url : 'https://api.lexstart.com/saveScore',
                type : 'POST',
                data : saveToLexScore,
                success : function(scoreResult) {
                    // alert('Score saved : '+scoreResult);
  
  
  
  
                        var request = {
                          to: document.getElementById('email').value,
                          name: document.getElementById("f_name").value,
                          score: finalLexscore 
                        };
  
                    jq.ajax({
                      url : 'https://api.lexstart.com/mailTriggerBasicScore',
                      type : 'POST',
                      data : request,
                      success : function(data) {
                          // alert('mail sent to client: '+data);
                      },
                      error : function(request,error)
                      {
                          // alert("Request: "+JSON.stringify(request));
                      }
                   });
  
  
  
  
  
                },
                error : function(request,error)
                {
                    // alert("Request: "+JSON.stringify(request));
                }
             });
  
          },
          error : function(request,error)
          {
              // alert("Request: "+JSON.stringify(request));
          }
       });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
                  
              },
              error : function(error)
              {
                  // alert("Request: "+JSON.stringify(request));
                  alert("Error while adding package: "+JSON.stringify(error));
              }
          });
        },
        error : function(error)
        {
            // alert("Request: "+JSON.stringify(request));
            alert("Error while creating an organization: "+JSON.stringify(error));
        }
    });
    
    
    
    
    
    
    
    
    
    
    
      
      // org_name = document.getElementById('o_name').value
      // email = document.getElementById('email').value;
    
      
    
      // alert("name: " + org_name + "Email-Id: " + email + " Value1:  " + val1 + " value2:  " + val2 + " value2b: " + val2b + " Value3:  " + val3 + " value3b: " + val3b + " value4:  " + val4 + " Value5:  " + val5 + " value5b:  " + val5b + " Value6:  " + val6 + " value6b:  " + val6b + " Value7:  " + val7 + " value8: " + val8 + " value8b: " + val8b + " value8c: " + val8c);
      e.preventDefault();
    }


 
  });

});

