import User from "@/models/User";
import db from "@/utils/db";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  try {
    await db.connectDB();
    const { userId, password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Account not found..." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({ password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully!", email: user.email });
    await db.disconnectDB();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
