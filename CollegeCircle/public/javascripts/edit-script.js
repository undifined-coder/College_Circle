
var id;
    $.ajax({
       type: "POST",
       url: window.location,
       data: JSON.stringify({}),
       success: function(result){
           console.log(result);
           id=result.blog._id;
           document.getElementById("blog-title").value=result.blog.title;
           document.getElementById("blog-category").value=result.blog.category;
           document.getElementById("blog-content").value=result.blog.description;
        }
   });

function editBlog(){
    console.log(id);
    var title=document.getElementById("blog-title").value;
    var category=document.getElementById("blog-category").value;
    var description=document.getElementById("blog-content").value;
     console.log('1');    
     url='/updateBlog/'
     url+=id;
     event.preventDefault();
    $.ajax({
        type: "POST",
        url: url,
        data: {title:title,category:category,description:description},
        success: function(result){
            console.log('result');
            alert("successfully saved");
            window.location.href='/';
        }
    });

}
