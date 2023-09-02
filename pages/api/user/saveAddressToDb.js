import authMiddleware from "@/middleware/auth";
import User from "@/models/User";
import db from "@/utils/db";
import bcrypt from "bcrypt";

const addressesEqual = (a, b) => {
  return (
    a.firstName === b.firstName &&
    a.lastName === b.lastName &&
    a.phoneNumber === b.phoneNumber &&
    a.state === b.state &&
    a.address1 === b.address1 &&
    a.address2 === b.address2 &&
    a.city === b.city &&
    a.zipCode === b.zipCode &&
    a.country === b.country
  );
};

const handler = async (req, res) => {
  await authMiddleware(req, res, async () => {
    try {
      await db.connectDB();
      const { address } = req.body;
      const user = await User.findById(req.user);

      // Deactivate previously active addresses
      user.address.forEach((a) => {
        a.active = false;
      });

      const addressMatch = user.address.find((a) => addressesEqual(a, address));
      const hashedPassword = await bcrypt.hash(process.env.DEFAULT_USER_PASS, 12);

      if (addressMatch) {
        res.status(200).json({
          message: "The address provided already exists. Please select it from the list above...",
          ok: true,
          addressFound: true,
          address: addressMatch,
        });
      } else {
        // Mark the new address as active
        address.active = true;
        user.password = !user.password ? hashedPassword : user.password;
        user.address.push(address);
        await user.save();
        res
          .status(200)
          .json({ message: "Address saved successfully", ok: true, addressFound: false, address });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      db.disconnectDB();
    }
  });
};

export default handler;
