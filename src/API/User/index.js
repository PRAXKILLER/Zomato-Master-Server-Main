// Libraries
import express from 'express';
import passport from "passport";

// Database Model
import { UserModel } from '../../database/allModels';

const router = express.Router();

/**
 * Route        /
 * Des          GET authorized user data
 * Params       none
 * Access       Public
 * Method       GET
 */
 router.get("/", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { email, fullName, phoneNumber, address } =
        req.session.passport.user._doc;
  
      return res.json({ user: { email, fullName, phoneNumber, address } });
    } catch {
      return res.status(500).json({ error: error.message });
    }
  });

/**
 * Route    /:_id
 * Des      Get a particular User data 
 * Params   _id
 * Access   Public
 * Method   GET
 */
router.get('/:_id', async(req, res) => {
    try {
        const { _id } = req.params;
        const user = await UserModel.findById(_id);
        const { fullName } = user;

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ user : fullName });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

/**
 * Route    /update/:_id
 * Des      Update a particular User data 
 * Params   _id
 * Access   Public
 * Method   PUT
 */
router.put('/update/:_id', async(req, res) => {
    try {
        const { _id } = req.params;
        const { userData } = req.body;

        const user = await UserModel.findByIdAndUpdate(
            _id, {
                $set: userData
            }, {
                new: true
            })
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ user });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

export default router;