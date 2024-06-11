import adminMiddleware from "@/middleware/admin";
import authMiddleware from "@/middleware/auth";
import Coupon from "@/models/Coupon";
import db from "@/utils/db";

const handler = async (req, res) => {
  await db.connectDB();
  const { coupon, startDate, endDate, discount } = req.body;
  const { method } = req;
  try {
    await adminMiddleware(req, res, async () => {
      await authMiddleware(req, res, async () => {
        // create new coupon
        if (method === "POST") {
          const checkCoupon = await Coupon.findOne({ coupon });
          // check if coupon already exists
          if (checkCoupon) {
            return res.status(400).json({
              error: "Coupon already exists, try a different name.",
              ok: false,
            });
          }

          // check for coupon length
          if (coupon.length < 4 || coupon.length > 10) {
            return res.status(400).json({
              error: "Coupon length should be between 4 to 10 characters.",
              ok: false,
            });
          }

          // check if coupon date is less than current date
          const convertedStartDate = new Date(startDate);
          if (convertedStartDate < Date.now()) {
            return res.status(400).json({
              error: "Start date cannot be less than today's date.",
              ok: false,
            });
          }

          // check if start date is greater than end date
          if (startDate > endDate) {
            return res.status(400).json({
              error: "Start date cannot be greater than end date.",
              ok: false,
            });
          }

          // check if start and end date are same
          if (startDate === endDate) {
            return res
              .status(400)
              .json({ error: "Start date and end date cannot be same.", ok: false });
          }

          // check if discount is greater than 100
          if (discount > 100) {
            return res
              .status(400)
              .json({ error: "Discount cannot be greater than 100%.", ok: false });
          }

          // create new coupon
          await new Coupon({
            coupon,
            startDate,
            endDate,
            discount,
          }).save();

          // get all coupons
          const coupons = await Coupon.find({}).sort({ createdAt: -1 });

          // send response
          return res.status(201).json({
            message: "Coupon created successfully.",
            coupons: coupons,
            ok: true,
          });
        }

        // update coupon
        if (method === "PATCH") {
          const { id, coupon, startDate, endDate, discount } = req.body.data;
          const couponExists = await Coupon.findById(id);

          // check if coupon exists
          if (!couponExists) {
            return res.status(400).json({ error: "Coupon not found.", ok: false });
          }

          // check if coupon already exists
          if (couponExists.coupon === coupon) {
            return res.status(400).json({
              error: "Coupon already exists, try a different name.",
              ok: false,
            });
          }

          // check for coupon length
          if (coupon.length < 4 || coupon.length > 10) {
            return res.status(400).json({
              error: "Coupon length should be between 4 to 10 characters.",
              ok: false,
            });
          }

          // check if coupon date is less than current date
          const convertedStartDate = new Date(startDate);
          if (convertedStartDate < Date.now()) {
            return res.status(400).json({
              error: "Start date cannot be less than today's date.",
              ok: false,
            });
          }

          // check if start date is greater than end date
          if (startDate > endDate) {
            return res.status(400).json({
              error: "Start date cannot be greater than end date.",
              ok: false,
            });
          }

          // check if start and end date are same
          if (startDate === endDate) {
            return res
              .status(400)
              .json({ error: "Start date and end date cannot be same.", ok: false });
          }

          // check if discount is greater than 100
          if (discount > 100) {
            return res
              .status(400)
              .json({ error: "Discount cannot be greater than 100%.", ok: false });
          }

          // update coupon
          couponExists.coupon = coupon;
          couponExists.startDate = startDate;
          couponExists.endDate = endDate;
          couponExists.discount = discount;
          await couponExists.save();

          // get all coupons
          const coupons = await Coupon.find({}).sort({ createdAt: -1 });

          // send response
          return res.status(200).json({
            message: "Coupon updated successfully.",
            coupons: coupons,
            ok: true,
          });
        }

        // delete coupon
        if (method === "PUT") {
          const { id } = req.body.data;
          // delete the coupon and check if it exists
          const coupon = await Coupon.findByIdAndDelete(id);
          if (!coupon) {
            return res.status(400).json({ error: "Coupon not found.", ok: false });
          }
          // get all coupons after deleting
          const coupons = await Coupon.find().sort({ createdAt: -1 }).exec();
          // send response
          return res
            .status(200)
            .json({ message: "Coupon deleted successfully.", coupons, ok: true });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
