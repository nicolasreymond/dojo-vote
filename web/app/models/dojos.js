const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DojoSchema = new Schema({
  title: String,
  point: Number,
  comments: Number,
  nickname: String,
  gitlab_username: String,
  uniqueid: String,
  public: String,
  type: String,
  description: String,
  create_date: { type: Date },
  edit_date: { type: Date, default: Date.now },
  edits: [],
  votes: []
});

mongoose.model('Dojos', DojoSchema);
