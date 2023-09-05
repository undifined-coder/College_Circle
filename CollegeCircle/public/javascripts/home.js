function ShowCat() {
    var x = document.getElementById("cat");
    x.style.display = (
        (x.style.display != 'block')
            ? 'block'
            : 'none'
    )
}
$(document).ready(function () {
   
    getBlogs('All');

});

function getBlogs(category) {
    $.ajax({
        type: "GET",
        url: "/getBlogs",
        data: JSON.stringify({}),
        success: function (result) {
            //console.log(result);
            showBlogs(result, category);
        }

    });
}
function showBlogs(Blogs, category) {
    var blogArea = document.getElementById('blg-id');
    var blog = "";
   /// console.log(Blogs.length);
    for (var i = 0; i < Blogs.length; i++) {
       /// console.log(category);
        if (category =="All") {
            blog += `<div class="blog-area">
            <div class="blog rounded shadow pb-2">
            <h2 style="margin-bottom: 20px; font-size: 40px;">` +
             Blogs[i].title +
             `</h2><hr style="border:solid black 0.5px;">
             <p style="font-size: 20px;">` +
             Blogs[i].description +
             `</p>
             <div>
                 <a href="/viewBlog/${Blogs[i]._id}" class="btn btn-outline-primary">View full article</a>
            
             </div>
          </div>
          
        </div>`;
        } else if (category != 'all') {
            if (Blogs[i].category == category) {
                blog += `<div class="blog-area">
               <div class="blog rounded shadow pb-2">
               <h2 style="margin-bottom: 20px; font-size: 40px;">` +
                Blogs[i].title +
                `</h2><hr style="border:solid black 0.5px;">
                 <p style="font-size: 20px;">` +
                Blogs[i].description +
                `</p>
                <div>
                <a href="/viewBlog/${Blogs[i]._id}" class="btn btn-outline-primary">View full article</a>
                
                </div>
                </div>
                
              </div>`;
            }
        }
    }
    if(blog.length===0)blog=`<div><h1>No Blog found</h1></div>`
    blogArea.innerHTML=blog;
    
}
var category =document.getElementById('category');
category.addEventListener('change',function(){
    getBlogs(event.target.value);
})
