var express = require("express");
var router = express.Router();
var seed1=require("../seed1");
var middleware = require("../middleware");
// seed1.seed();
 router.get("/",function(req,res){
   //get all campgrounds


   seed1.two.find({},function(err,allcamps){
   	if(err){
   		console.log(err);
   	}else{
   		console.log("connected to db");
   		res.render("campgrounds1",{campgrounds:allcamps});

   	}
   })
 	 // res.render("campgrounds",{campgrounds:campgrounds});
 });

router.post("/",middleware.isLoggedInCapmgrounds,function(req,res){
 	 	var name=req.body.name;
 	 	var price=req.body.price;
 	var image=req.body.image;
 	var description=req.body.description;
 	var author = {
 		id:req.user._id,
 		username:req.user.username
 	}
 	var newCampgrounds={name:name,image:image,price:price,description:description,author:author};
 	console.log(req.user.username);
 	seed1.two.create(newCampgrounds,function(err,newcamps){
 		if(err){
 			console.log(err);
 		}else{
 			console.log(newcamps);
 			console.log("connected to the db with new camps");
 			res.redirect("/campgrounds");
 		}
 	})
 	// campgrounds.push(newCampgrounds);
 	// res.redirect("/results");
 });

 router.get("/new",middleware.isLoggedInCapmgrounds,function(req,res){
 	res.render("new1");
 });

 router.put("/:id",middleware.checkOwnershipCampgrounds,function(req,res){
	seed1.two.findByIdAndUpdate(req.params.id,req.body.campgrounds,function(err,succ){
			if(err){
				console.log("/campgrounds");
			}else{
				res.redirect("/campgrounds/"+req.params.id);
			}
	})
});
router.get("/:id",function(req,res){
	seed1.two.findById(req.params.id).populate("comments").exec(function(err,succ){
		if(err){
			console.log("Something Went Wrong");
		}else{
			console.log("success");
			console.log(succ)
			res.render("show1",{campgrounds:succ});
		}
	})
});
router.get("/:id/edit",middleware.checkOwnershipCampgrounds,function(req,res){
	
		seed1.two.findById(req.params.id,function(err,camps){
			if(err){
				console.log("errror");
			}else{
				
					res.render("edit",{campgrounds:camps});
				}
		})
	

	
});

router.delete("/:id",middleware.checkOwnershipCampgrounds,function(req,res){
	seed1.two.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	})
})



module.exports = router;