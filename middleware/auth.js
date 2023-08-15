import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;
const secureCookie = process.env.NODE_ENV === "production";

const authMiddleware = async (req, res, next) => {
  const token = await getToken({ req, secret, secureCookie });
  if (token) {
    req.user = token.sub;
    console.log("User authenticated can access protected routes");
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;
