import { forgotPasswordEmailTemplate } from "@/email_templates/forgotPasswordEmailTemplate";
import User from "@/models/User";
import db from "@/utils/db";
import { sendEmail } from "@/utils/sendEmail";
import { createResetToken } from "@/utils/tokens";

const handler = async (req, res) => {
  try {
    await db.connectDB();

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please check your email address and try again." });
    }

    const userId = createResetToken({ id: user._id.toString() });
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/resetpassword/${userId}`;
    sendEmail(email, resetLink, "", "Reset your password", forgotPasswordEmailTemplate);
    res.status(201).json({
      message: `We have sent an email to ${email}. Please check your inbox to reset your password.`,
    });

    await db.disconnectDB();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
