import authMiddleware from "@/middleware/auth";
import User from "@/models/User";
import db from "@/utils/db";

const handler = async (req, res) => {
  try {
    await authMiddleware(req, res, async () => {
      await db.connectDB();

      const { addressId } = req.body;
      const user = await User.findById(req.user);

      if (!user) {
        return res.status(404).json({ message: "User not found", ok: false });
      }

      const addressIndex = user.address.findIndex((a) => a._id.toString() === addressId);

      if (addressIndex !== -1) {
        user.address.splice(addressIndex, 1);
        await user.save();
        return res.status(200).json({ message: "Address deleted successfully", ok: true });
      } else {
        return res.status(404).json({ message: "Address not found", ok: false });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", ok: false });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
