var express=require("express");
var mongoose=require("mongoose");
var flash=require("connect-flash");
var app=express();
var bodyParser=require("body-parser");
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
var localStrategy = require("passport-local");
var session = require("express-session");
var methodOverride=require("method-override");
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:"sshhh"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+"/public"));


// mongoose.connect("mongodb+srv://imagine:dragonRadioactive@cluster0.xkupj.mongodb.net/test");


// var User=require('./models/user');

// var commentRoutes = require("./routes/comments"),
// 		campgroundsRoutes = require("./routes/campgrounds");
// 		indexRoutes = require("./routes/index");

app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
// app.use(bodyParser.json());
// app.use(express.static(__dirname+"/public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.use(require("express-session")({
//     secret: "Rusty is the best and cutest dog in the world",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(flash());
//mongodb+srv://mick:AfxhfafR8T7PW4z@3&*()*&*(*&@cluster0.lcrws.mongodb.net/yelpcamp?retryWrites=true&w=majority//mongodb+srv://mickey:AfxhfafR8T7PW4z@3&*()*&*(*&@cluster0.3zg7p.mongodb.net/jk?retryWrites=true&w=majority
//mongodb://localhost/scoop
// mongoose.connect("mongodb+srv://shin:chan@scoopgallery.7m3tc.mongodb.net/test");
         // mongodb+srv://mickey:mouse@cluster0.dpfgu.mongodb.net/test       
 // mongoose.connect("mongodb+srv://imagine:dragonRadioactive@cluster0.xkupj.mongodb.net/test");
 // mongoose.connect("mongodb+srv://john:newman@mongodb001.uzte0.mongodb.net/test");

// //////////Schema for aptitude Questions/////////////
  mongoose.connect("mongodb+srv://minni:mouse@cluster0.izfa4.mongodb.net/test");
var indexUpdateSchema=mongoose.Schema({
	info1:String,
	info2:String,
	info3:String,
	title1:String,
	subtitle1:String,
	title2:String,
	subtitle2:String,
	title3:String,
	subtitle3:String,
	updateHeading1:String,
	update1:String,
	updateImage1:String,
	dropDownMenu:String
});
var indexUpdate=mongoose.model("indexUpdate",indexUpdateSchema);
// module.exports=indexUpdate;
// var indexUpdateSchemaTwo=mongoose.Schema({
// 	title1:String,
// 	subtitle1:String,
// 	title2:String,
// 	subtitle2:String,
// 	title3:String,
// 	subtitle3:String
// });
// var indexUpdateTwo=mongoose.model("indexUpdateTwo",indexUpdateSchemaTwo);

var aptiSchema=mongoose.Schema({
	Questions:String,
	option1:String,
	option2:String,
	option3:String,
	option4:String,
	correctOpt:Number
});
var apti=mongoose.model("apti",aptiSchema);
var User=require('./models/user');

var commentRoutes = require("./routes/comments"),
		campgroundsRoutes = require("./routes/campgrounds"),
		indexRoutes = require("./routes/index");
var User=require('./models/user');
// var indexUpdate=require('../app.js');
//Auth Routes
// app.get("/",function(req,res){

// 	indexUpdate.findOne({},function(err,index){
// 		if(err){
// 			console.log("error ocurrred in get / index");
// 		}else{
// 			res.render("index",{index1:index});
// 		}
// 	})
	
// });
app.get("/onlineResources",function(req,res){
	res.render("onlineresources.ejs");
});
app.get("/2ndYearReferenceBooks",function(req,res){
	res.render("2ndYearReferenceBooks.ejs");
});
app.get("/3rdYearReferenceBooks",function(req,res){
	res.render("3rdYearReferenceBooks.ejs");
});
app.get("/4thYearReferenceBooks",function(req,res){
	res.render("4thYearReferenceBooks.ejs");
});

app.get("/2ndyearsubjectlist",function(req,res){
	res.render("2ndYearSubjectList.ejs");
});
app.get("/3rdyearsubjectlist",function(req,res){
	res.render("3rdYearSubjectList.ejs");
});
app.get("/4thyearsubjectlist",function(req,res){
	res.render("4thYearSubjectList.ejs");
});
app.get("/landing",function(req,res){
	res.render("test1");
});
app.get("/Elearning",function(req,res){
	res.render("elearningPage");
});
app.get("/formSubmission",function(req,res){
	res.render("onlineFormSubmission");
})
app.get("/cProgrammingTutorials",function(req,res){
	res.render("cprogrammingTutorials")
})
app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
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
app.get("/log",function(req,res){
	res.render("login");
});
app.post("/login",passport.authenticate("local",{
	successRedirect:"/",
	failureRedirect:"/register"
}),function(req,res){

});

app.get("/logout",function(req,res){
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

// indexUpdate.create({info1:"shshshshshshshs",info2:"jdjdjdjdjjjjjjj",info3:"jfjfjjjjjjj",
// dropDownMenu:"aptiitt"},function(err,succ){
// 	if(err){
// 		console.log("error ocurrred in creating index for the very first time");
// 	}else{
// 		console.log(succ);
// 	}
// });
// const comment = mongoose.model("Comment",new mongoose.Schema({
// 	title:String,
// 	author:String
// }));
// var commentSchema=mongoose.Schema({
// 	title:String,
// 	author:String
// });

// // var app=express();

// const Campground = mongoose.model("Campground",new mongoose.Schema({
// 	name:String,
// 	image:String,
// 	description:String,
// 	ddggd:String,
// 	comment:[{
// 		type:mongoose.Schema.Types.ObjectId,
// 		ref:"Comment"
// 	}]
// })
// );
// var Comment=mongoose.model("Comment",commentSchema);
// module.exports = {
//    one : Comment,
//    two : Campground,
//    /* some other modules you want */
// }

// var campgrounds=require("./camp");
app.use(session({secret: 'ssshhhhh'}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser= req.user;
	res.locals.error = req.flash("error");
	res.locals.success=req.flash("success");
	next();
})

// app.use(indexRoutes);
app.use("/campgrounds/:id",commentRoutes);
app.use("/campgrounds",campgroundsRoutes);




app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");


// seed1.two.find({},function(err,succ){
// 	console.log(succ);
// });
app.get("/title3",function(req,res){
	res.render("title3.ejs");
});
app.get("/title2",function(req,res){
	res.render("title2.ejs");
});
app.get("/title1",function(req,res){
	res.render("title1.ejs");
});
app.get("/timetable",function(req,res){
	res.render("timetable");
});
app.get("/login2",function(req,res){
	res.render("login2");
});
app.get("/aptitudePageUpdate",function(req,res){
	res.render("aptitudeUpdate");
});
app.get("/indexPageUpdate",function(req,res){
	res.render("indexUpdate");
});
app.get("/allQuestions",function(req,res){
	apti.find({},function(err,allQuestions){
		if(err){
			console.log("error occured");
		}else{
			console.log("sksk");
			console.log(allQuestions);
			res.render("aptitudeQuestions",{Questions:allQuestions});
		}
	})
});
app.get("/askAdminOrUser",function(req,res){
	res.render("askAdminOrUser");
})
app.get("/adminLogin",function check(req,res,next){if (req.query.username=="swapnil" && req.query.password=="meshram")
	{console.log(req.query.username);
		return next();}
		else{res.render("forbiddenPage");}},function(req,res){
	indexUpdate.findOne({},function(err,index){
		if(err){
			console.log("error on get adminLogin");
		}else{
			console.log(index);
			console.log("dkdk");
			res.render("adminPage",{index:index});
		}
	})
	
});
app.put("/indexUpdate/:id",function(req,res){
	indexUpdate.findByIdAndUpdate(req.params.id,req.body.indexUpdate,function(err,index){
		if(err){
			console.log("error occured in put indexUpdte");
		}else{
			res.redirect("/");
		}
	})
});
app.get("/",function(req,res){
// 	indexUpdate.create({info1:"shshshshshshshs",info2:"jdjdjdjdjjjjjjj",info3:"jfjfjjjjjjj",
// dropDownMenu:"aptiitt"},function(err,succ){
// 	if(err){
// 		console.log("error ocurrred in creating index for the very first time");
// 	}else{
// 		console.log(succ);
// 	}
// });


	indexUpdate.findOne({},function(err,index1){
		if(err){
			console.log("error ocurrred in get / index");
		}else{
			console.log(index1);
			console.log("yojfjfj");
			
			// console.log(indexUp,{indexUp:index1});
			res.render("index",{index1:index1});
		}
	})
	
});
// app.use(indexRoutes);
app.get("/index/:id/edit",function(req,res){
	indexUpdate.findById(req.params.id,function(err,index){
		if(err){
			console.log("error occured in index id edit put route");
		}else{
			console.log(index);
			res.render("indexUpdate",{index:index});
		}
	})
})
app.post("/apti",function(req,res){
	apti.create(req.body.apti,function(err,newQustion){
		if(err){
			console.log("error occured");
		}else{
			console.log(newQustion);
		}
	});
	res.redirect("/allQuestions");
});
app.get("/login",function(req,res){
	res.render("login");
});

app.get("/register",function(req,res){
	res.render("register");
});


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(process.env.PORT || 4000,function(){
	console.log("connected");
});
