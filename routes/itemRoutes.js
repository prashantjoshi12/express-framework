// Manual Routes

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Create a new item
router.post('/items', itemController.createItem);

// Get all items
router.get('/items', itemController.getAllItems);

// Get an item by ID
router.get('/items/:id', itemController.getItemById);

// Update an item by ID
router.put('/items/:id', itemController.updateItem);

// Delete an item by ID
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
