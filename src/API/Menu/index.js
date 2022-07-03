// Libraries
import express from 'express';

// Database Model
import { MenuModel, ImageModel } from '../../database/allModels';

// Validations
import { ValidateId } from '../../validation/common';

const router = express.Router();

/**
 * Route    /list/:_id
 * Des      Get all Menu list based on Restaurant id
 * Params   _id
 * Access   Public
 * Method   GET
 */
router.get('/list/:_id', async(req, res) => {
    try {
        await ValidateId(req.params);
        const { _id } = req.params;
        const menus = await MenuModel.findById(_id);

        if (!menus) {
            return res.status(404).json({ error: "No menus found for this Restaurant" })
        }
        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * Route    /image/:_id
 * Des      Get list of Menu Images based on Restaurant id
 * Params   _id
 * Access   Public
 * Method   GET
 */
router.get('/image/:_id', async(req, res) => {
    try {
        await ValidateId(req.params);
        const { _id } = req.params;
        const menuImages = await ImageModel.findOne(_id);

        if (!menuImages) {
            return res.status(404).json({ error: "No menus found for this Restaurant" })
        }
        return res.json({ menuImages });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default router;