
var mongoose =require('mongoose');

var blogSchema =new mongoose.Schema({
	title :{
		type: String,
		required : [true,'this is required is field']
	},
	writtenBy:{
		type: String,
		required : [true,'this is required is field']
    },
	description :{
		type: String,
		required : [true,'this is required is field']
	},
	email:{
		type: String,
		required : [true,'Email is necessary']
	},
    category:{
		type: String,
		required : [true,'this is required is field']
	}
  },
    {timestamps: true}
);

var blog = mongoose.model('blog', blogSchema);

module.exports = blog;