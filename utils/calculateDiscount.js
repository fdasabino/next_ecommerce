export const calculateDiscountedPrice = (size, discount) => {
    const basePrice = size.price;
    if (discount > 0) {
        const discountedPrice = basePrice * (1 - discount / 100);
        return discountedPrice;
    }
    return basePrice;
};
