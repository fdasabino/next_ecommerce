import Button from "@/components/Layout/Button/Button";
import Image from "next/image";
import { useRef } from "react";
import { MdAddPhotoAlternate, MdRemoveCircle } from "react-icons/md";
import styles from "./ImageUpload.module.scss";

const ImageUpload = ({ handleChange, images, handleRemove }) => {
  const inputRef = useRef(null);

  return (
    <div className={styles.image_upload}>
      <div className={styles.images_wrapper}>
        {images.length > 0 &&
          images.map((image, i) => (
            <span key={i}>
              <MdRemoveCircle onClick={() => handleRemove(image)} />
              <Image src={image} width={500} height={500} alt="uploaded_img" />
            </span>
          ))}
        {images.length === 0 && <p>No images uploaded</p>}
      </div>

      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        multiple
        hidden
        accept="image/png,image/webp,image/jpg,image/jpeg"
      />
      <Button disabled={images.length >= 3} onClick={() => inputRef.current.click()}>
        <MdAddPhotoAlternate />
      </Button>
    </div>
  );
};

export default ImageUpload;
