const Category = require('../models/category');
const Item = require('../models/item');
const debug = require('debug')('controller');
const Joi = require('@hapi/joi');
const path = require('path');
const mf = require('../lib/fileManager');
const { findAllValidationErrors } = require('../lib/validationErrorManager');

const categoryValidationSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  description: Joi.string().trim().min(1).max(255).required(),
  img: Joi.string().trim().allow('')
});

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
  res.render('category-form', { title: 'Create Category' });
};

// handle category create on POST
exports.postCategoryCreate = async (req, res, next) => {
  mf.upload(req, res, async (err) => {
    let errors = findAllValidationErrors(
      err,
      req.body,
      categoryValidationSchema
    );

    if (errors.length) {
      debug(errors);
      res.render('category-form', {
        title: 'Create Category',
        errors,
        category: req.body
      });
    } else {
      const category = new Category(req.body);

      try {
        const results = {};

        // save the category to db
        results.categorySave = category.save();

        if (req.file) {
          const filename = `${category._id}${path.extname(
            req.file.originalname
          )}`;

          // save the file if id name of document
          results.fileSave = mf.writeFile(
            path.join(__dirname, '../public/assets/images/', filename),
            req.file.buffer
          );

          await results.fileSave;
        }

        await results.categorySave;

        res.redirect('/catalog/categories');
      } catch (err) {
        debug(err);
        next();
      }
    }
  });
};

// display category update form on GET
exports.getCategoryUpdate = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    res.render('category-form', {
      title: `Update ${category.name} category`,
      category
    });
  } catch (err) {
    debug(err);
    next();
  }
};

// handle category update on POST
exports.postCategoryUpdate = async (req, res, next) => {
  mf.upload(req, res, async (err) => {
    let errors = findAllValidationErrors(
      err,
      req.body,
      categoryValidationSchema
    );

    if (errors.length) {
      debug(errors);
      res.render('category-form', {
        title: `Update ${req.body.name} category`,
        errors,
        category: req.body
      });
    } else {
      try {
        const results = {};

        results.category = Category.findByIdAndUpdate(req.params.id, req.body);

        if (req.file) {
          const ext = path.extname(req.file.originalname);
          const filename = `${req.params.id}${ext}`;

          results.unlinkFile = mf.unlinkWithAnotherExt(
            path.join(__dirname, '../public/assets/images/'),
            req.params.id,
            ext,
            ['.png', '.jpg']
          );

          // save the file if id name of document
          results.fileSave = mf.writeFile(
            path.join(__dirname, '../public/assets/images/', filename),
            req.file.buffer
          );

          await results.unlinkFile;
          await results.fileSave;
        }

        await results.category;

        res.redirect('/catalog/categories');
      } catch (err) {
        debug(err);
        next();
      }
    }
  });
};

// display category delete form on GET
exports.getCategoryDelete = async (req, res, next) => {
  try {
    const results = {};

    results.category = await Category.findById(req.params.id);
    results.itemCount = await Item.countDocuments({ category: req.params.id });

    res.render('category-delete', {
      title: `Remove ${results.category.name} category`,
      ...results
    });
  } catch (err) {
    debug(err);
    next();
  }
};

// handle category delete on POST
exports.postCategoryDelete = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    // remove category image
    await mf.findFileAndRemoveWithExt(
      path.join(__dirname, '../public/assets/images/', req.params.id),
      ['.png', '.jpg']
    );

    const itemsID = await Item.find({ category: req.params.id }, '.id');

    // remove also all items images
    await Promise.all(
      itemsID.map((item) =>
        mf.findFileAndRemoveWithExt(
          path.join(__dirname, '../public/assets/images/', item._id.toString()),
          ['.png', '.jpg']
        )
      )
    );

    await Item.deleteMany({ category: req.params.id });

    res.redirect('/catalog/categories');
  } catch (err) {
    debug(err);
    next();
  }
};
