// Libraries
import express from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';

// Database Model
import { ImageModel } from '../../database/allModels';

const router = express.Router();

// multer config
const storage = multer.memoryStorage();
const upload = multer({ storage })

// utility function
import { s3Upload } from '../../utils/s3'

/**
 * Route    /
 * Des      Upload given image to s3 bucket and save file links to MongoDB
 * Params   None
 * Access   Public
 * Method   POST
 */
router.post('/', upload.single("file"), async(req, res) => {
    try {
        const file = req.file;

        // s3 bucket options
        const bucketOptions = {
            Bucket: "zomato-master-99",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read", // Access Control List
        }

        const uploadImage = await s3Upload(bucketOptions);

        const saveImagetoDB = await ImageModel.create({
            images: [{ location: uploadImage.Location }]
        })

        return res.status(200).json(saveImagetoDB);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

router.get("/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const image = await ImageModel.findById(_id);
  
      return res.status(200).json(image);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });


export default router;