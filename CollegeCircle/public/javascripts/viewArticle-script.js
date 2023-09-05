var id;
$( document ).ready(function() {
    $.ajax({
        type:"POST",
        url: window.location,
        data:{},
        success: function(data){
            //console.log(data);
            var blog=data.blog;
            id=blog[0]._id;
            var article =   `<div class="blog rounded shadow pb-2" id="blg-id">
            <h1 class="title">${blog[0].title}</h1>
             <hr style="border:solid black 0.5px;">
             <span class="cat">
               <h5><i class="fas fa-folder fd"></i>${blog[0].category}</h5>
               <span><h6>created by -${blog[0].writtenBy}</h6></span>
               <span><h6>created on :${blog[0].createdAt}</h6> </span>
               <span>
               <br>
                 <p class="description">${blog[0].description}</p>
              </span>`
              if(data.user&&data.user.username===blog[0].email){
              article+=`<div>
              <a href="/editBlog/${blog[0]._id}" class="btn btn-outline-primary">Edit article</a>
              <button class="btn btn-outline-danger" onclick="deleteModal()">Delete article</button>
              
              </div>`
              }

           article+=`</div>`
          document.getElementById('blog-id').innerHTML=article;
        }
    });
    
});
function deleteModal(){
  $('#deleteModal').modal('show');
}
function deleteBlog(){
  url='/deleteBlog/';
  url+=id;
  $.ajax({
    type:"POST",
    url:url ,
    data:{},
    success: function(data){
      console.log("successfully deleted");
      window.location.href="/";
    }


  })
}
