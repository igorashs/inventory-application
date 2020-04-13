const Category = require('../models/category');
const Item = require('../models/item');
const debug = require('debug')('controller');

// home page (shows total data) on GET
exports.getIndex = async (req, res, next) => {
  try {
    const results = {
      categoryCount: Category.countDocuments({}),
      itemCount: Item.countDocuments({})
    };

    res.render('index', {
      title: 'Inventory Application',
      categoryCount: await results.categoryCount,
      itemCount: await results.itemCount
    });
  } catch (err) {
    debug(err);
    next();
  }
};

// list all categories on GET
exports.getCategoryList = (req, res) => {
  res.send('/categories not Implemented');
};

// display all items for a specific category GET
exports.getCategoryItems = (req, res) => {
  res.send('/category/:id not Implemented');
};

// display category create form on GET
exports.getCategoryCreate = (req, res) => {
  res.send('/category/create GET not Implemented');
};

// handle category create on POST
exports.postCategoryCreate = (req, res) => {
  res.send('/category/create POST not Implemented');
};

// display category update form on GET
exports.getCategoryUpdate = (req, res) => {
  res.send('/category/:id/update GET not Implemented');
};

// handle category update on POST
exports.postCategoryUpdate = (req, res) => {
  res.send('/category/:id/update POST not Implemented');
};

// display category delete form on GET
exports.getCategoryDelete = (req, res) => {
  res.send('/category/:id/delete GET not Implemented');
};

// handle category delete on POST
exports.postCategoryDelete = (req, res) => {
  res.send('/category/:id/delete POST not Implemented');
};
