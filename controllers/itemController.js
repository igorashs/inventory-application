const Item = require('../models/item');
const Category = require('../models/category');
const debug = require('debug')('controller');

// display details for a specific item on GET
exports.getItemDetail = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    res.render('item-detail', { title: `Item: ${item.name}`, item });
  } catch (err) {
    debug(err);
    next();
  }
};

// display item create form on GET
exports.getItemCreate = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    res.render('item-form', {
      title: `Create ${category.name} item`,
      category
    });
  } catch (err) {
    debug(err);
    next();
  }
};

// handle item create on POST
exports.postItemCreate = (req, res) => {
  res.send('/item/create POST not implemented');
};

// display item update form on GET
exports.getItemUpdate = (req, res) => {
  res.send('/item/:id/update GET not implemented');
};

// handle item update on POST
exports.postItemUpdate = (req, res) => {
  res.send('/item/:id/update POST not implemented');
};

// display item delete form on GET
exports.getItemDelete = (req, res) => {
  res.send('/item/:id/delete GET not implemented');
};

// handle item delete on POST
exports.postItemDelete = (req, res) => {
  res.send('/item/:id/delete POST not implemented');
};
