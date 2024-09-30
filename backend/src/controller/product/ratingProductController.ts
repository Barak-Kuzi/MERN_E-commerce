import {CustomRequest, CustomResponse} from "../../utils";

import productModel, {Product} from '../../models/productModel.js';

const ratingProductController = async (req: CustomRequest, res: CustomResponse) => {
    try {
        const userSessionId = req.user?.id;

        if (!userSessionId) {
            return res.status(401).json({
                success: false,
                error: true,
                message: 'Unauthorized'
            });
        }

        const {productId, rating} = req.body;
        const product = await productModel.findOne({_id: productId});

        if (!product) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Product not found'
            });
        }

        const existingRatingIndex = product.ratings.findIndex(ratingItem => ratingItem.userId.toString() === userSessionId);

        if (existingRatingIndex !== -1) {
            product.ratings[existingRatingIndex].rating = rating;
        } else {
            product.ratings.push({userId: userSessionId, rating});
        }

        const totalRatings = product.ratings.length;
        const ratingSum = product.ratings.reduce((sum, ratingItem) => sum + ratingItem.rating, 0);
        product.averageRating = ratingSum / totalRatings;

        await product.save();

        res.status(200).json({
            success: true,
            error: false,
            message: 'Rating updated successfully',
            data: product
        });

    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || 'Internal server error'
        });
    }
}

export default ratingProductController;