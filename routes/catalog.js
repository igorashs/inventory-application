const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

// GET catalog home page
router.get('/', categoryController.index);

// GET req for creating a category
router.get('/category/create', categoryController.categoryCreateGet);

// POST req for creating a category
router.post('/category/create', categoryController.categoryCreatePost);

// GET req to delete a category
router.get('/category/:id/delete', categoryController.categoryDeleteGet);

// POST req to delete a category
router.post('/category/:id/delete', categoryController.categoryDeletePost);

// GET req to update a category
router.get('/category/:id/update', categoryController.categoryUpdateGet);

// POST req to update a category
router.post('/category/:id/update', categoryController.categoryUpdatePost);

// GET req for all items from a specific category
router.get('category/:id', categoryController.categoryItems);

// GET req for all categories
router.get('/categories', categoryController.categoryList);

module.exports = router;
