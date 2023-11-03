import { sizesList } from "@/data/sizes";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import Button from "../Button/Button";
import styles from "./SizesInput.module.scss";

const SizesInput = ({ sizes, product, setProduct }) => {
    const [noSize, setNoSize] = useState(true);

    const handleSizeChange = (e, index) => {
        const values = [...sizes];
        values[index][e.target.name] = e.target.value;
        setProduct({ ...product, sizes: values });
    };

    const handleRemove = (index) => {
        if (sizes.length > 1) {
            const values = [...sizes];
            values.splice(index, 1);
            setProduct({ ...product, sizes: values });
        }
    };

    return (
        <div className={styles.sizes_input}>
            <Button
                type="reset"
                style="primary"
                onClick={() => {
                    setNoSize((prev) => !prev);
                    if (!noSize) {
                        let data = sizes.map((item) => {
                            return {
                                qty: item,
                                price: item.price,
                            };
                        });
                        setProduct({ ...product, sizes: data });
                    } else {
                        let data = sizes.map((item) => {
                            return {
                                size: item.size || "",
                                qty: item.qty,
                                price: item.price,
                            };
                        });
                        setProduct({ ...product, sizes: data });
                    }
                }}
            >
                {noSize ? (
                    <>
                        Add size <AiOutlinePlus />
                    </>
                ) : (
                    <>
                        Remove size <BsTrash />
                    </>
                )}
            </Button>
            {sizes.map((size, index) => (
                <div className={styles.sizes} key={index}>
                    {!noSize && (
                        <div className={styles.input_group}>
                            <label htmlFor="size">Size</label>
                            <select
                                id="size"
                                name="size"
                                value={noSize ? "" : size.size}
                                disabled={noSize}
                                style={{ display: noSize ? "none" : "" }}
                                onChange={(e) => handleSizeChange(e, index)}
                            >
                                <option value="">Size</option>
                                {sizesList.map((size, index) => (
                                    <option key={index} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className={styles.input_group}>
                        <label htmlFor="qty">Quantity</label>
                        <input
                            id="qty"
                            type="number"
                            name="qty"
                            placeholder={"Qty"}
                            value={size.qty}
                            min={1}
                            onChange={(e) => handleSizeChange(e, index)}
                        />
                    </div>

                    <div className={styles.input_group}>
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder={"Price"}
                            value={size.price}
                            min={1}
                            onChange={(e) => handleSizeChange(e, index)}
                        />
                    </div>

                    {!noSize ? (
                        <div className={styles.action_btns}>
                            <AiOutlineMinus onClick={() => handleRemove(index)} />
                            <AiOutlinePlus
                                onClick={() => {
                                    setProduct({
                                        ...product,
                                        sizes: [...sizes, { size: "", qty: "", price: "" }],
                                    });
                                }}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ))}
        </div>
    );
};

export default SizesInput;
