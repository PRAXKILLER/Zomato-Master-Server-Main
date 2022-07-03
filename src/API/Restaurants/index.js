// Libraries
import express from 'express';

// Database Model
import { RestaurantModel } from '../../database/allModels';

// Validations
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from '../../validation/restaurant';
import { ValidateId } from '../../validation/common';

const router = express.Router();

/**
 * Route    /
 * Des      Get all Restaurants details based on the city
 * Params   None
 * Access   Public
 * Method   GET
 */
router.get('/', async(req, res) => {
    try {
        await ValidateRestaurantCity(req.query);
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });
        if (restaurants.length == 0) {
            return res.json({ error: "No restaurants found in this city" })
        }
        return res.json({ restaurants })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * Route    /
 * Des      Get individual Restaurant details based on the id
 * Params   id
 * Access   Public
 * Method   GET
 */
router.get('/:_id', async(req, res) => {
    try {
        await ValidateId(req.params);
        const { _id } = req.params;
        const restaurant = RestaurantModel.findById(_id);
        if (!restaurant) {
            return res.status(400).json({ error: "Restaurant not found" })
        }
        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * Route    /search
 * Des      Get Restaurant details based on search string
 * Params   None
 * Access   Public
 * Method   GET
 */
router.get('/search/:searchString', async(req, res) => {
    try {
        await ValidateRestaurantSearchString(req.params);
        const { searchString } = req.params;
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" }
        })
        if (!restaurants) {
            return res.status(404).json({ error: `No Restaurants matched with ${searchString}` })
        }
        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

})

export default router;