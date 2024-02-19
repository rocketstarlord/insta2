var mongoose=require("mongoose");
 mongoose.connect("mongodb+srv://minni:mouse@cluster0.izfa4.mongodb.net/test");

// mongoose.connect("mongodb://localhost/y3refact");
var commentSchema=mongoose.Schema({
	text:String,
	author:{

		id:{type:mongoose.Schema.Types.ObjectId,
		ref:"User"},
		username:String
	}
});
var comment=mongoose.model("Comment",commentSchema)

var campgroundSchema = mongoose.Schema({
	name:String,
	price:String,
	image:String,
	description:String,
	author:{

		id:{type:mongoose.Schema.Types.ObjectId,
		ref:"User"},
		username:String
	},
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	}]
});
var campground = mongoose.model("Campground",campgroundSchema)
// const campground = mongoose.model("Campground",new mongoose.Schema({
// 	name:String,
// 	price:String,
// 	image:String,
// 	description:String,
// 	author:{

// 		id:{type:mongoose.Schema.Types.ObjectId,
// 		ref:"User"},
// 		username:String
// 	},
// 	comments:[{
// 		type:mongoose.Schema.Types.ObjectId,
// 		ref:"Comment"
// 	}]
// })

// );



// var data=[
// 		  {	
// 			name:"image1",
// 			image:"https://images.unsplash.com/photo-1594479223138-0ca20547c872?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
// 			description:"this is a campgrounds"
// 		  },
// 		   {	
// 			name:"image2",
// 			image:"https://images.unsplash.com/photo-1593983649075-9fd447bb280a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
// 			description:"this is a campgrounds"
// 		  },
// 		   {	
// 			name:"image3",
// 			image:"https://images.unsplash.com/photo-1594364107841-a6f1da9b6a22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
// 			description:"this is a campgrounds"
			
			
// 		  }
// ];
// function seedDB(){
// campground.remove({},function(err){
// 	// if(err){
// 	// 	console.log("error occured");
// 	// }else{
// 	// 	console.log("all campgrounds removed");
// 	// 	data.forEach(function(seed){
// 	// 		campground.create(seed,function(err,campground){
// 	// 			if(err){
// 	// 				console.log("error occured");
// 	// 			}else{
// 	// 				console.log("campgrounds added");
// 	// 				//adding a comment
// 	// 				 comment.create({
//  //    					text: "This place is great, but I wish there was internet",
//  //    					author: "Homer"
//  //  						}, function (err, comment) {
//  //    							if (err) {
//  //      								console.log(err);
//  //    							} else {
//  //        								// campground.comment.push(comments);
        								
// 	// 									campground.comments.push(comment);
//  //       									campground.save();
//  //      									console.log("Created new comment");
//  //          								}
//  //  								});
			
// 	// 			}
// 	// 		});
// 	// 	});
// 	// }
// });
// }

module.exports = {
   one : comment,
   two : campground,
   // seed: seedDB
   /* some other modules you want */
}

