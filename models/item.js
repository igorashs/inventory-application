const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 255 },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 }
});

ItemSchema.virtual('url').get(function () {
  return `/catalog/item/${this._id}`;
});

ItemSchema.virtual('imgURL').get(function () {
  const pathJPG = `/assets/images/${this._id}.jpg`;
  const pathPNG = `/assets/images/${this._id}.png`;

  if (fs.existsSync(path.join('public', pathJPG))) {
    return pathJPG;
  } else if (fs.existsSync(path.join('public', pathPNG))) {
    return pathPNG;
  }

  return '/assets/images/default.png';
});

module.exports = mongoose.model('Item', ItemSchema);
