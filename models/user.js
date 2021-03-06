var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;


// the User scheme attributes
var UserSchema = new mongoose.Schema({
	email: { type: String, unique: true, lowercase: true},
	password: String,
	profile: {
		name: {type: String, default:''},
		picture: {type: String, default:''}
	},
	address: String,
	history:[{
		date: Date,
		paid: {type: Number, default: 0},
		// item: {type: Schema.Types.ObjectId}
	}]
});

// var user = new User();
// user.email = ""
// user.profile.name = "Superman"



// Hash password before save it to database
UserSchema.pre('save', function(next){
	var user = this; // refer to UserSchema itself
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt){
		// if error
		if(err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err, hash){
			// if error
			if(err) return next(err);
			// set user pw to hash
			user.password = hash;
			next();
		});
	});
});






// compare password in database and one users type in
UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.gravatar = function(size){
	if (!this.size) size = 200;
  if (!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
}

// pass in name of db and the Object to export to mongoose
module.exports = mongoose.model('User', UserSchema)
