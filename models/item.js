const mongoose = require('mongoose');

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
  return `/assets/images/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
