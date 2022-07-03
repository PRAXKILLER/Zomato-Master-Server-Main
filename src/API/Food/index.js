// Libraries
import express from 'express';

// Database Model
import { FoodModel } from '../../database/allModels';

// Validations
import { ValidateId, ValidateCategory } from '../../validation/common';

const router = express.Router();

/**
 * Route        /:_id
 * Des          GET food based on id
 * Params       _id
 * Access       Public
 * Method       GET
 */
 router.get("/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const foods = await FoodModel.findById(_id);
      return res.json({ foods });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

/**
 * Route    /r/:_id
 * Des      Get all Foods based on a restaurant
 * Params   id
 * Access   Public
 * Method   GET
 */
router.get('/r/:_id', async(req, res) => {
    try {
        await ValidateId(req.params);
        const { _id } = req.params;
        const foods = await FoodModel.find({ restaurant: _id })
        if (foods.length == 0) {
            return res.status(404).json({ error: "No food found for the restaurant" })
        }
        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * Route    /c/:category
 * Des      Get all Foods based on a category
 * Params   category
 * Access   Public
 * Method   GET
 */
router.get('/c/:category', async(req, res) => {
    try {
        await ValidateCategory(req.params);
        const { category } = req.params;
        const foods = await FoodModel.find({
            category: { $regex: category, $options: "i" }
        })
        if (foods.length == 0) {
            return res.status(404).json({ error: `No Food matched with ${category}` })
        }
        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default router;