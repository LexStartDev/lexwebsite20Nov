var jq = jQuery.noConflict();

function validateForm() {
    // This function deals with validation of the form fields
    var y, i, valid = true;

    y = document.getElementsByTagName("input");
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
      var reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (reg.test(email)){
        // alert("valid");        
    //   document.getElementsByClassName("step")[currentTab].className += " finish";
      return true; 
    } else {
    //   alert("Invalid Email-Id");
      document.getElementById("error").style.display = "block";
      return false;
    }
    }
}



jq(document).ready(function(){
    jq("#templateForm").submit(function(e) {
    if(!validateForm()){
        // jq('#emptyModal').modal('show')
        // alert("Invalid");
        return false;
    } else {
        // alert("validated");

        e.preventDefault();
        var req = {
            email : document.getElementById('email').value
          }
          jq.ajax({
      
            url : 'https://api.lexstart.com/user_check_availibility',
            dataType : "json",
            type : 'POST',
            data : req,
            success : function(data) {
          // ... the form gets submitted:
                // document.getElementById("templateForm").submit();   

                var signupDetails = { 
                    type : 'website',
                    first_name: document.getElementById('f_name').value,
                    email: document.getElementById('email').value,
                    Email: document.getElementById('email').value
                    };
                    jq.ajax({
                    url : 'https://api.lexstart.com/subscribers',
                    type : 'POST',
                    data : signupDetails,
                    success : function(response) {              
                        // alert('Organization created: '+ JSON.stringify(response));
                        console.log("test"+JSON.stringify(response)); 
                        var orgid = response.result.organization_ID;
         
                            // var reqst = {
                            //     email: document.getElementById('email').value,
                            //     name: document.getElementById("f_name").value
                            // };
                        // jq.ajax({
                
                        //     url : 'https://api.lexstart.com/mailtriggerforbasiclogin',
                        //     type : 'POST',
                        //     data : reqst,
                        //     success : function(data) {
                        //         jq.ajax({
                        //             url: 'https://api.lexstart.com/accounts/' + orgid,
                        //             type: 'POST',
                        //             contentType: 'application/json',
                        //             success: function () {
                        //                 }})
                        //         // alert('mail sent to client: '+ data);
                        //     },
                        //     error : function(request,error)
                        //     {
                        //         // alert("Request: "+JSON.stringify(request));
                        //     }
                        // });

                        jq('#Org_Modal').modal('show')
                        document.getElementById("templateForm").reset();
                    },
                    error : function(request,error)
                    {
                        // alert("Request: "+JSON.stringify(request));
                        // alert("Error while creating an organization: "+JSON.stringify(error));
                        return false;
                    }
                });
         },
         error : function(request,error) {
            //  alert("Request: "+JSON.stringify(request));
             jq('#exampleModal').modal('show')
              return false;
         }
        });
        e.preventDefault();
    }
});
});