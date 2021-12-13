const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
    enum: ["TO LEARN", "LEARNING", "LEARNED"],
  },
  user: {
    type: Schema.Types.ObjectId, // nối tới object id
    ref: "user", // nối tới collection user
  },
});

module.exports = mongoose.model("post", PostSchema);
