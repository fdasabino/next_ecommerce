import User from "@/models/User";
import db from "@/utils/db";

const handler = async (req, res) => {
  try {
    await db.connectDB();
    const { address } = req.body;
    const user = await User.findById(req.user);

    // Deactivate previously active addresses
    user.address.forEach((a) => {
      a.active = false;
    });

    // Find the address to update by its ID
    const addressToUpdate = user.address.id(address._id);

    if (addressToUpdate) {
      addressToUpdate.active = true; // Set the address as active
      await user.save();
      res.status(200).json({
        message: "Address active status updated",
        ok: true,
        address: addressToUpdate,
      });
    } else {
      res.status(404).json({
        message: "Address not found",
        ok: false,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
