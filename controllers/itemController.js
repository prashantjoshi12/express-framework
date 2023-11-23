const Item = require('../models/Item');

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get an item by ID
exports.getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Item.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    const updatedItem = await Item.findByPk(id);
    return res.status(200).json(updatedItem);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Item.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
