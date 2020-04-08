const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, require: true, max: 255 }
});

CategorySchema.virtual('url').get(function () {
  return `/catalog/category/${this._id}`;
});

CategorySchema.virtual('imgURL').get(function () {
  return `/assets/images/${this._id}`;
});

module.exports = mongoose.model('Category', CategorySchema);
