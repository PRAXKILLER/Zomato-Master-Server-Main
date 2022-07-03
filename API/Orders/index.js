// Libraries
import express from 'express';
import passport from 'passport';

// Database Model
import { OrderModel } from '../../database/allModels';

// Validate User
import ValidateUser from '../../config/validateUser';

const router = express.Router();

/**
 * Route    /:_id
 * Des      Get all Orders based on id
 * Params   _id
 * Access   Private
 * Method   GET
 */
router.get('/:_id', passport.authenticate("jwt"), async(req, res) => {
    try {
        await ValidateUser(req, res);
        const { _id } = req.params;
        const orders = await OrderModel.find({ user: _id });

        if (!orders) {
            return res.status(404).json({ error: "User not found" })
        }

        return res.json({ orders });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * Route    /new/:_id
 * Des      Add new Order
 * Params   _id
 * Access   Private
 * Method   POST
 */
router.post('/new/:_id', passport.authenticate("jwt"), async(req, res) => {
    try {
        await ValidateUser(req, res);
        const { _id } = req.params;
        const { orderDetails } = req.body;

        const addNewOrder = await OrderModel.findOneAndUpdate({ user: _id }, {
            $push: { orderDetails }
        }, { new: true });

        return res.json({ order: addNewOrder })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default router;