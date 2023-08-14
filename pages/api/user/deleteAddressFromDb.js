import User from "@/models/User";
import db from "@/utils/db";

const handler = async (req, res) => {
  try {
    await db.connectDB();

    const { addressId, userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      // User not found
      res.status(404).json({ message: "User not found", ok: false });
      return;
    }

    const addressIndex = user.address.findIndex((a) => a._id.toString() === addressId);

    if (addressIndex !== -1) {
      // If the address is found, remove it from the array
      user.address.splice(addressIndex, 1);
      await user.save(); // Save the user with the updated address list

      res.status(200).json({ message: "Address deleted successfully", ok: true });
    } else {
      // If the address is not found
      res.status(404).json({ message: "Address not found", ok: false });
    }

    await db.disconnectDB();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", ok: false });
  }
};

export default handler;
