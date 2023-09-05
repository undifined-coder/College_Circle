var form = document.getElementById("login-form");
function submitform(){
  event.preventDefault();
  var username=event.target.email.value;
  var password=event.target.password.value;

  $('#submit').text("Logingg in...");
  $('#submit').prop('disabled', true);

  $(function(){
    $.ajax({
      type:'POST',
      async:false,
      url:'/login',
      data:{username:username,password:password} ,
      success :function(res){
        if(res.success===false){
          console.log(res.message);
          var alertBox = document.getElementById('alert-box');
          var alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> Email / Password not correct. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
          alertBox.innerHTML += alert;
          $('#submit').text("Login");
          $('#submit').prop('disabled', false);
        } 
        else {
          window.location.href='/';

        }
      },
      error :function(req,res){
        //alert(res);
        console.log(res);
        var alertBox = document.getElementById('alert-box');
        var alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> Something went wrong. Try again. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        alertBox.innerHTML += alert;
        //window.location.href='/login';
        $('#submit').text("Login");
        $('#submit').prop('disabled', false);
      }
    });
  });
}