const express = require("express");
const APIFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Define a function to create a dynamic CRUD controller

function CreateCRUDController(Model) {
  const router = express.Router();
  // Create a new resource
  this.model = Model;
  router.post(
    "/",
    catchAsyncErrors(async (req, res) => {
      const newItem = await this.model.create(req.body);
      res.status(201).json(newItem);
    })
  );

  
  // Retrieve all resources
  router.get(
    "/",
    
    catchAsyncErrors(async (req, res, next) => {
      const apiFeatures = new APIFeatures(req.query, this.model)
        .filter()
        .search()
        .sort()
        .pagination();

      const result = await this.model.findAndCountAll(apiFeatures.query);
      const { count, rows } = result;

      const meta = apiFeatures.query.meta;
      if (meta) {
        apiFeatures.getMeta(meta, count);
      }
      res.status(200).json({
        success: true,
        data: rows,
        count,
        meta: apiFeatures.query.meta,
      });
    })
  );
  // Retrieve a resource by ID
  router.get(
    "/:id",
    catchAsyncErrors(async (req, res) => {
      const item = await this.model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Data not found" });
      }
      res.status(200).json(item);
    })
  );

  // Update a resource by ID
  router.post(
    "/:id",
    catchAsyncErrors(async (req, res) => {
      const item = await this.model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Data not found" });
      }
      await item.update(req.body);
      res.json(item);
    })
  );

  // Delete a resource by ID
  router.delete(
    "/:id",
    catchAsyncErrors(async (req, res) => {
      const item = await this.model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Data not found" });
      }
      await item.destroy();
      res.status(200).json({success:true, data: item, message: "Deleted Successfully"});
    })
  );

  return router;
}

module.exports = CreateCRUDController;
