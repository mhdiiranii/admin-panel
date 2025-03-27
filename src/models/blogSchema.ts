import { model, models, Schema } from "mongoose";

const blogSchema = new Schema({
  _id: { type: String, require: false },
  username: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  picture: { type: String, require: false },
  about: { type: Array, require: true },
  subject: { type: String, require: true },
});

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;
