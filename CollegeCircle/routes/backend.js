var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var session =require('express-session');
var passport =require('passport');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var User =require('../model/user');
var blogs =require('../model/blog');
   
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/getBlogs',function(req,res,next){
	blogs.find({},function(err,blog){
		//console.log(blog);
		if(!err)res.send(blog);
	});
 
});

/*router.post('/changeStatus',function(req,res,next){
	list.findOneAndUpdate({id:req.body.id},{status:req.body.status},function(err,item){
		if(!err)res.send("Status Updated");
	});
});*/
router.post('/addBlog',function(req,res,next){
	///console.log(req.body);
	///console.log(req.user);
     var blog = new blogs (
		 {
			 email :req.user.username,
			 title:req.body.title,
			 description:req.body.description,
			 writtenBy:req.user.firstName,
			 category:req.body.category
		 }
	 );
	 blog.save();
	 res.send("blog added");
});
router.get('/viewBlog/:id',function(req,res,next){
	res.render('view-one-blog',{user:req.user});
	
});
router.post('/viewBlog/:id',function(req,res,next){
        ///console.log(req.params.id);
		blogs.find({_id:req.params.id},function(err,blog){
			//console.log(blog);
			if(!err)res.send({blog:blog,user:req.user});
			else res.send("unsuccesful");
		});

});


router.get('/editBlog/:id',function(req,res,next){
	
	////console.log(req.params.id);
	blogs.find({_id:req.params.id},function(err,blog){
		if(!err){
			if(req.user&&req.user.username===blog[0].email){
				///console.log(blog[0]);
				res.render('editBlog',{user:req.user});
			  }
			  else res.render('/',{user:req.user});
		}
		
		else res.render('/',{user:req.user});
	});
	
	
	
	
});
router.post('/editBlog/:id',function(req,res,next){
	
	blogs.find({_id:req.params.id},function(err,blog){
		if(!err){
			if(req.user&&req.user.username===blog[0].email){
				res.send({blog:blog[0],user:req.user});
			  }
			  else res.render('/',{user:req.user});

		}
	});

	
});
router.post('/updateBlog/:id',function(req,res,next){
	///console.log(req.params.id);
	///console.log(req.body);
	var update={
		title:req.body.title,
		description:req.body.description,
		category:req.body.category
   };
   blogs.find({_id:req.params.id},function(err,blog){
	if(!err){
		if(req.user&&req.user.username===blog[0].email){
			blogs.findOneAndUpdate({_id:req.params.id},update,function(err,blog){
				if(!err){
					console.log(1);
					res.json({success:true,message:"succesfully updated"})
				}
				else res.send(err);
			});
		  }
		  else res.render('/',{user:req.user});
	  }
	  else res.send(err);
});


	
});


router.post('/myBlogs',function(req,res){
	//console.log(req.user);
	if(req.user){
		
	  blogs.find({email:req.user.username},function(err,blog){
		//console.log(blog);
		if(!err)res.send(blog);
	});
	}
	else res.redirect('/');
})

router.post('/deleteBlog/:id',function(req,res){
	//console.log(req.user);
	blogs.find({_id:req.params.id},function(err,blog){
		if(!err){
			if(req.user&&req.user.username===blog[0].email){
	            blogs.findOneAndDelete({_id:req.params.id},function(err,blog){
		//console.log(blog);
		        if(!err)res.send("successfully deleted");
	           });
	        }  
			 else res.redirect('/');
		}
		else res.send(err);

   })
})  



module.exports = router;
