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
exports.getCategoryList = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    res.render('category-list', { title: 'Categories', categories });
  } catch (err) {
    debug(err);
    next();
  }
};

// display all items for a specific category GET
exports.getCategoryItems = async (req, res, next) => {
  try {
    const results = {
      category: Category.findById(req.params.id),
      items: Item.find({ category: req.params.id })
    };

    results.category = await results.category;
    results.items = await results.items;

    res.render('category-items-list', {
      title: `${results.category.name} Category Items`,
      ...results
    });
  } catch (err) {
    debug(err);
    next();
  }
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
