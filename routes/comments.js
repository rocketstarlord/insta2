var express = require("express");
var router = express.Router({mergeParams:true});
var seed1=require("../seed1");
var middleware = require("../middleware");

router.get("/comments",middleware.isLoggedInComments,function(req,res){
  seed1.two.findById(req.params.id,function(err,succ){
  	if(err){
  		console.log("error on comments route");
  	}else{
  		res.render("newcommentform",{campground:succ});
  	}
  })

	
});

router.post("/comments",function(req,res){

	seed1.two.findById(req.params.id,function(err,campground){
		if(err){
			console.log("error occured on comments post");
		}else{
			seed1.one.create(req.body.comment,function(err,comment){
				if(err){
					console.log("error on creating a comment");
				}else{
					comment.author.id = req.user._id;//currentUserId
					comment.author.username = req.user.username;
					console.log(comment.author.id);
					console.log(comment.author.username);
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id)
				}
			})
		}
	})
})
router.get("/comments/:comment_id/edit",middleware.checkOwnershipComments,function(req,res){
	seed1.one.findById(req.params.comment_id,function(err,comment){
		if(err){
			res.render("back");
		}else{
			res.render("commentedit",{campgrounds_id:req.params.id,comments:comment});
		}
	})
	
});

router.put("/comments/:comment_id",middleware.checkOwnershipComments,function(req,res){
	seed1.one.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})

router.delete("/comments/:comment_id",middleware.checkOwnershipComments,function(req,res){
	seed1.one.findByIdAndRemove(req.params.comment_id,function(err,succ){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})


module.exports = router;