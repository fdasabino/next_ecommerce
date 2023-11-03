import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;
const secureCookie = process.env.NODE_ENV === "production";

const authMiddleware = async (req, res, next) => {
    try {
        const token = await getToken({ req, secret, secureCookie });

        if (token) {
            req.user = token.sub;
            console.log("User authenticated can access protected routes");
        } else {
            console.log("User not authenticated cannot access protected routes");
            return res.status(401).json({ error: "Unauthorized" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    await next();
};

export default authMiddleware;
