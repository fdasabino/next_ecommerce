import { useRef } from "react";
import { MdStyle } from "react-icons/md";
import styles from "./StyleInput.module.scss";

const StyleInput = ({ name, product, setProduct, colorImage }) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    const inputRef = useRef(null);

    const handleImage = (e) => {
        let img = e.target.files[0];

        if (!allowedFileTypes.includes(img.type)) {
            dispatch(
                showDialog({
                    header: "Unsupported file type",
                    msgs: [
                        {
                            msg: `${img.name} is not a supported file type. Try uploading JPG, JPEG, WEBP or PNG files.`,
                            type: "error",
                        },
                    ],
                })
            );
            return;
        }

        if (img.size > 1024 * 1024 * 5) {
            dispatch(
                showDialog({
                    header: "File too large",
                    msgs: [
                        {
                            msg: `${img.name} is too large. Try uploading a file that is less than 5MB.`,
                            type: "error",
                        },
                    ],
                })
            );
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
            setProduct({ ...product, color: { ...product.color, image: e.target.result } });
        };
    };

    return (
        <div className={styles.style_input}>
            <div className={styles.header}>
                <h2>Pick a product style image</h2>
                <MdStyle type="reset" onClick={() => inputRef.current.click()} />
            </div>

            <input
                type="file"
                name={name}
                ref={inputRef}
                hidden
                onChange={handleImage}
                accept="image/png,image/jpeg, image/webp,image/jpg"
            />
        </div>
    );
};

export default StyleInput;
