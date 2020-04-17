const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

// category

// GET catalog home page
router.get('/', categoryController.getIndex);

// GET req for creating a category
router.get('/category/create', categoryController.getCategoryCreate);

// POST req for creating a category
router.post('/category/create', categoryController.postCategoryCreate);

// GET req to delete a category
router.get('/category/:id/delete', categoryController.getCategoryDelete);

// POST req to delete a category
router.post('/category/:id/delete', categoryController.postCategoryDelete);

// GET req to update a category
router.get('/category/:id/update', categoryController.getCategoryUpdate);

// POST req to update a category
router.post('/category/:id/update', categoryController.postCategoryUpdate);

// GET req for all items from a specific category
router.get('/category/:id', categoryController.getCategoryItems);

// GET req for all categories
router.get('/categories', categoryController.getCategoryList);

// item

// GET req for creating an item
router.get('/item/:id/create', itemController.getItemCreate);

// POST req for creating an item
router.post('/item/:id/create', itemController.postItemCreate);

// GET req to delete an item
router.get('/item/:id/delete', itemController.getItemDelete);

// POST req to delete an item
router.post('/item/:id/delete', itemController.postItemDelete);

// GET req to update an item
router.get('/item/:id/update', itemController.getItemUpdate);

// POST req to update an item
router.post('/item/:id/update', itemController.postItemUpdate);

// GET req for detail page of an item
router.get('/item/:id', itemController.getItemDetail);

module.exports = router;
