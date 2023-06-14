import User from "@/models/User";
import db from "@/utils/db";
import { createActivationToken } from "@/utils/tokens";
import { validateEmail } from "@/utils/validation";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  try {
    await db.connectDB();

    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      return res.status(422).json({ message: "Please fill in all fields..." });
    }

    if (!validateEmail(email)) {
      return res.status(422).json({ message: "Invalid email address, please try again..." });
    }

    const user = await User.findOne({ email });
    if (user && user.email === email) {
      return res.status(422).json({ message: "User already exists, please try again..." });
    }

    if (password.length < 6) {
      return res.status(422).json({ message: "Password must be at least 6 characters long..." });
    }

    if (password.length > 20) {
      return res.status(422).json({ message: "Password must be less than 20 characters long..." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();
    const activationToken = createActivationToken({ id: createdUser._id }); // to string?
    const activationLink = `${process.env.NEXTAUTH_URL}/activate/${activationToken}`;

    res
      .status(201)
      .json({ message: "User created successfully...", user: createdUser, activationLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
