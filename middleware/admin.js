import User from "@/models/User";
import db from "@/utils/db";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;
const secureCookie = process.env.NODE_ENV === "production";

const adminMiddleware = async (req, res, next) => {
  db.connectDB();
  try {
    const token = await getToken({ req, secret, secureCookie });
    let user = await User.findById(token.sub);

    if (user.role === "admin") {
      console.log("User is admin can access protected routes");
      await next();
    } else {
      console.log("User is not admin cannot access protected routes");
      return res.status(401).json({ error: "Access denied...admin resources" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default adminMiddleware;
