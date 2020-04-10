const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

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

module.exports = router;
