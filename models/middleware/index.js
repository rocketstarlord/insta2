var middleware = {};
var seed1 = require("../seed1.js");

middleware.checkOwnershipComments = function(req,res,next){
	if(req.isAuthenticated()){
		seed1.one.findById(req.params.comment_id,function(err,comment){
			if(err){
				res.redirect("back");
			}else{
				if(comment.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		})
		
	}else{
		res.render("back");
	}
}
middleware.checkOwnershipCampgrounds = function(req,res,next){
		if(req.isAuthenticated()){
		seed1.two.findById(req.params.id,function(err,camps){
			if(err){
				res.redirect("back");
			}else{
				if(camps.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
				
			}
		})
	}else{
		res.redirect("back");
	}

}
middleware.isLoggedInComments = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error")
	res.redirect("/login");
}

middleware.isLoggedInCapmgrounds = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","plese sig up first");
	res.redirect("/login");
}

module.exports = middleware;