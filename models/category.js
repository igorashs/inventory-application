const mongoose = require('mongoose');
const path = require('path');
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
  const pathJPG = `/assets/images/${this._id}.jpg`;
  const pathPNG = `/assets/images/${this._id}.png`;

  if (fs.existsSync(path.join('public', pathJPG))) {
    return pathJPG;
  } else if (fs.existsSync(path.join('public', pathPNG))) {
    return pathPNG;
  }

  return '/assets/images/default.png';
});

module.exports = mongoose.model('Category', CategorySchema);
