

function addNewBlog(){
     var title= document.getElementById("blog-title").value;
     var category =document.getElementById("blog-category").value;
     var description =document.getElementById("blog-content").value;
    console.log("done");
     $.ajax({
		type: "POST",
		url: "/addBlog",
		data: {title:title,description:description,category:category},
		success: function(result){
			console.log("your blog is successfully submitted");
		}
    });
}