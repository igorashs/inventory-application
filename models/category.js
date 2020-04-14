const mongoose = require('mongoose');
const fs = require('fs');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, require: true, max: 255 }
});

CategorySchema.virtual('url').get(function () {
  return `/catalog/category/${this._id}`;
});

CategorySchema.virtual('imgURL').get(function () {
  const path = `/assets/images/${this._id}`;

  if (fs.existsSync(path)) {
    return path;
  }

  return '/assets/images/category-default.png';
});

module.exports = mongoose.model('Category', CategorySchema);
