var express = require("express");
var router = express.Router();
var passport = require("passport");
var app=express();
app.set("view engine","ejs");
var User=require('../models/user');
// var indexUpdate=require('../app.js');
//Auth Routes
router.get("/",function(req,res){

	indexUpdate.findOne({},function(err,index){
		if(err){
			console.log("error ocurrred in get / index");
		}else{
			res.render("index",{indexUpdate:index});
		}
	})
	
});

router.get("/landing",function(req,res){
	res.render("test1");
});

router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			req.flash("error","user already exist");
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","welcome "+user.username);
			res.redirect("/campgrounds");
		})
	})
})
// router.get("/adminLogin",function(req,res){
// 	res.render("adminP");
// });
router.get("/login",function(req,res){
	res.render("login");
});
router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	faliureRedirect:"/register"
}),function(req,res){

});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","logged you out");
	res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","please log in first");
	res.redirect("/login");
}

module.exports = router;

