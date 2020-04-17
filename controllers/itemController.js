const Item = require('../models/item');
const Category = require('../models/category');
const Joi = require('@hapi/joi');
const debug = require('debug')('controller');
const path = require('path');
const mf = require('../lib/fileManager');
const { findAllValidationErrors } = require('../lib/validationErrorManager');

const itemValidationSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  description: Joi.string().trim().min(1).max(255).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().min(0).required(),
  img: Joi.string().trim().allow('')
});

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
exports.postItemCreate = async (req, res, next) => {
  mf.upload(req, res, async (err) => {
    try {
      let errors = findAllValidationErrors(err, req.body, itemValidationSchema);

      const category = await Category.findById(req.params.id);

      if (errors.length) {
        debug(errors);
        res.render('item-form', {
          title: `Create ${category.name} item`,
          category,
          errors,
          item: req.body
        });
      } else {
        const item = new Item({ ...req.body, category: category._id });
        const results = {};

        // save the item to db
        results.itemSave = item.save();

        if (req.file) {
          const filename = `${item._id}${path.extname(req.file.originalname)}`;

          // save the file if id name of document
          results.fileSave = mf.writeFile(
            path.join(__dirname, '../public/assets/images/', filename),
            req.file.buffer
          );

          await results.fileSave;
        }

        await results.itemSave;

        res.redirect(`/catalog/category/${category._id}`);
      }
    } catch (err) {
      debug(err);
      next();
    }
  });
};

// display item update form on GET
exports.getItemUpdate = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate('category');

    res.render('item-form', {
      title: `Update ${item.category.name} item`,
      item,
      category: item.category
    });
  } catch (err) {
    debug(err);
    next();
  }
};

// handle item update on POST
exports.postItemUpdate = async (req, res, next) => {
  mf.upload(req, res, async (err) => {
    try {
      let errors = findAllValidationErrors(err, req.body, itemValidationSchema);

      const item = await Item.findById(req.params.id).populate('category');

      if (errors.length) {
        debug(errors);
        res.render('item-form', {
          title: `Update ${item.category.name} item`,
          category: item.category,
          errors,
          item: req.body
        });
      } else {
        const results = {};

        results.item = item.updateOne(req.body);

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

        await results.item;

        res.redirect(`/catalog/category/${item.category._id}`);
      }
    } catch (err) {
      debug(err);
      next();
    }
  });
};

// display item delete form on GET
exports.getItemDelete = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).populate('category');

    res.render('item-delete', {
      title: `Remove ${item.name} item from ${item.category.name} category`,
      item
    });
  } catch (err) {
    debug(err);
    next();
  }
};

// handle item delete on POST
exports.postItemDelete = (req, res) => {
  res.send('/item/:id/delete POST not implemented');
};
