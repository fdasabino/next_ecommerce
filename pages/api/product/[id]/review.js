import authMiddleware from "@/middleware/auth";
import Product from "@/models/Product";
import db from "@/utils/db";

const handler = async (req, res) => {
    await db.connectDB();
    try {
        const {
            method,
            body: { review, rating, color, size, fit, images },
        } = req;

        await authMiddleware(req, res, async () => {
            if (method === "PUT") {
                const product = await Product.findById(req.query.id);
                if (product) {
                    const existentReviewIndex = product.reviews.findIndex(
                        (r) => r.reviewBy.toString() === req.user.toString()
                    );
                    if (existentReviewIndex !== -1) {
                        const newReview = {
                            reviewBy: req.user,
                            review,
                            rating,
                            color,
                            size,
                            fit,
                            images,
                        };

                        const propToUpdate = {};
                        for (const prop in newReview) {
                            if (prop !== "reviewBy") {
                                propToUpdate["reviews.$." + prop] = newReview[prop];
                            }
                        }

                        await Product.updateOne(
                            {
                                _id: req.query.id,
                                "reviews._id": product.reviews[existentReviewIndex]._id,
                            },
                            {
                                $set: propToUpdate,
                            },
                            { new: true }
                        );

                        let numReviews = 0;
                        let totalRating = 0;
                        product.reviews.forEach((r) => {
                            numReviews++;
                            totalRating += r.rating;
                        });
                        product.numReviews = numReviews;
                        product.rating = totalRating / numReviews;

                        await product.save();
                        await product.populate("reviews.reviewBy");
                        return res.status(200).json({
                            message: "Review updated successfully",
                            reviews: product.reviews,
                            ok: true,
                        });
                    } else {
                        const newReview = {
                            reviewBy: req.user,
                            review,
                            rating,
                            color,
                            size,
                            fit,
                            images,
                        };

                        product.reviews.push(newReview);
                        let numReviews = 0;
                        let totalRating = 0;
                        product.reviews.forEach((r) => {
                            numReviews++;
                            totalRating += r.rating;
                        });
                        product.numReviews = numReviews;
                        product.rating = totalRating / numReviews;

                        await product.save();
                        await product.populate("reviews.reviewBy");
                        return res.status(201).json({
                            message: "Review added successfully",
                            reviews: product.reviews,
                            ok: true,
                        });
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred.", error: error.message });
    } finally {
        await db.disconnectDB();
    }
};

export default handler;
