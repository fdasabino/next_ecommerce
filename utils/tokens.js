import jwt from "jsonwebtoken";

export const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACTIVATION_TOKEN_SECRET, { expiresIn: "48h" });
};

export const createResetToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_RESET_TOKEN_SECRET, { expiresIn: "5m" });
};
