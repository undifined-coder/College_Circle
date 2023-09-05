
var submit =document.getElementById("submit");
var form = document.getElementById("signup-form");

function submitForm(){
  event.preventDefault();
  var user = {
    firstName: event.target.firstName.value,
    lastName :event.target.lastName.value,
    username: event.target.email.value,
    password: event.target.password.value
  };

  $('#submit').text("Signing up...");
  $('#submit').prop('disabled', true);

  $(function(){
    $.ajax({
      type: "POST",
      async: false,
      url: "/signup",
      contentType: "application/json",
      data: JSON.stringify(user),// to convert user data into json string 
      success: function(result){
        var alertBox = document.getElementById('alert-box');
        var alert; 
        if(result.success){
          form.firstName.value = null; 
          form.lastName.value = null; 
          form.email.value = null;
          form.password.value = null; 
          alert = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Signup successful.</strong> You can <a href="/login" class="alert-link"> Login </a> now.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }
        else if(result.message == "user already present"){
          alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>User already present.</strong> <a href="/login" class="alert-link"> Login </a> instead.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }
        else{
          alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Signup not successful. Try again. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }

        alertBox.innerHTML += alert;
        $('#submit').text("Signup");
        $('#submit').prop('disabled', false); 
      },
      error: function(err){
        var alertBox = document.getElementById('alert-box');
        var alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Signup not successful. Try again. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        alertBox.innerHTML += alert;
        $('#submit').text("Signup");//to cahnge innertext to Signup
        $('#submit').prop('disabled', false); // to make it to use it again 
      }
    })
  })
}

