// Libraries
import express from "express";
import passport from "passport";

// Database Model
import { ReviewsModel } from "../../database/allModels";

const router = express.Router();

/**
 * Route    /:resid
 * Des      Get all Reviews for a particular Restaurant
 * Params   resid
 * Access   Public
 * Method   GET
 */
router.get("/:resid", async (req, res) => {
  try {
    const { resid } = req.params;
    const reviews = await ReviewsModel.find({ restaurant: resid });

    if (!reviews) {
      return res
        .status(404)
        .json({ error: "No reviews found for this Restaurant" });
    }

    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route    /new
 * Des      Adding new food/restaurant review and rating
 * Params   resid
 * Access   Public
 * Method   POST
 */
router.post("/new", passport.authenticate("jwt"), async (req, res) => {
  try {
    const { _id } = req.session.passport.user._doc;
    const { reviewData } = req.body;

    await ReviewsModel.create({ ...reviewData, user: _id });

    return res.json({ reviews: "Successfully Created Review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/**
 * Route    /delete/:_id
 * Des      Delete a particular Review
 * Params   _id
 * Access   Public
 * Method   DELETE
 */
router.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await ReviewsModel.findByIdAndDelete(_id);

    return res.json({ review: "Successfully deleted the Review" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
