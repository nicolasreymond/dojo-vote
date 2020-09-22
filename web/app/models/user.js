const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const Schema = mongoose.Schema

// read_user
// Grants read-only access to the authenticated user's profile through the 
// /user API endpoint, which includes username, public email, and full name. 
// Also grants access to read-only API endpoints under /users.
const UserSchema = new Schema({
  gitlab_id: Number,
  gitlab_username: String,
  gitlab_name: String,
  gitlab_emails: {},
  gitlab_avatar_url: String,
});

UserSchema.plugin(findOrCreate)

UserSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('User', UserSchema);