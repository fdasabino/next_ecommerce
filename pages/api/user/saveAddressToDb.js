import User from "@/models/User";
import db from "@/utils/db";

const handler = async (req, res) => {
  await db.connectDB();

  const { address, userId } = req.body;
  const user = await User.findById(userId);

  // Find and deactivate any previously active addresses
  for (const a of user.address) {
    if (a.active) {
      a.active = false;
    }
  }

  // Check if the new address already exists
  const existingAddressIndex = user.address.findIndex(
    (a) =>
      Object.is(a.firstName, address.firstName) &&
      Object.is(a.lastName, address.lastName) &&
      Object.is(a.phoneNumber, address.phoneNumber) &&
      Object.is(a.state, address.state) &&
      Object.is(a.address1, address.address1) &&
      Object.is(a.address2, address.address2) &&
      Object.is(a.city, address.city) &&
      Object.is(a.zipCode, address.zipCode) &&
      Object.is(a.country, address.country)
  );

  if (existingAddressIndex !== -1) {
    res.status(200).json({
      message: "The address provided already exists. Please select it from the list above...",
      ok: true,
      addressFound: true,
      address,
    });
  } else {
    // Mark the new address as active
    address.active = true;
    user.address.push(address);
    await user.save();
    res
      .status(200)
      .json({ message: "Address saved successfully", ok: true, addressFound: false, address });
  }

  db.disconnectDB();
};

export default handler;
