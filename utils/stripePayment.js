import axios from "axios";

export const stripePayment = async (total, orderId, id) => {
    const res = await axios.post(`/api/order/${orderId}/stripePayment`, {
        amount: total,
        id,
        orderId,
    });

    return res.data;
};
