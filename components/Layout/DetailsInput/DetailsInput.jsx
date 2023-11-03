import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./DetailsInput.module.scss";

const DetailsInput = ({ details, product, setProduct }) => {
    const handleDetails = (e, index) => {
        const values = [...details];
        values[index][e.target.name] = e.target.value;
        setProduct({ ...product, details: values });
    };

    const handleRemove = (index) => {
        if (details.length > 0) {
            const values = [...details];
            values.splice(index, 1);
            setProduct({ ...product, details: values });
        }
    };

    return (
        <div className={styles.details_input}>
            {details && details.length === 0 && (
                <div className={styles.add_details}>
                    <p>
                        Add Details
                        <AiOutlinePlus
                            onClick={() => {
                                setProduct({
                                    ...product,
                                    details: [...details, { name: "", value: "" }],
                                });
                            }}
                        />
                    </p>
                </div>
            )}
            {details &&
                details.map((detail, index) => (
                    <div className={styles.details} key={index}>
                        <div className={styles.input_group}>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={detail.name}
                                onChange={(e) => handleDetails(e, index)}
                            />
                        </div>

                        <div className={styles.input_group}>
                            <label htmlFor="value">Value</label>
                            <input
                                id="value"
                                type="text"
                                name="value"
                                placeholder="Value"
                                value={detail.value}
                                onChange={(e) => handleDetails(e, index)}
                            />
                        </div>

                        <div className={styles.action_btns}>
                            <AiOutlineMinus onClick={() => handleRemove(index)} />
                            <AiOutlinePlus
                                onClick={() => {
                                    setProduct({
                                        ...product,
                                        details: [...details, { name: "", value: "" }],
                                    });
                                }}
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default DetailsInput;
