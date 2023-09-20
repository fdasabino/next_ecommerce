import Image from "next/image";
import { useRef } from "react";
import { BsFolderPlus, BsTrash } from "react-icons/bs";
import { IoMdColorFilter } from "react-icons/io";
import { RiShape2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import styles from "./ImageInput.module.scss";

const ImageInput = ({ name, header, text, images, setImages, setColorImage, ...props }) => {
  const fileInput = useRef(null);

  const allowedFileTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  const handleImages = ({ target: { files } }) => {
    for (const file of files) {
      if (images.includes(file)) {
        toast.error(`${file.name} is already uploaded.`);
        continue;
      }

      if (images.length > 6 || files.length > 6) {
        toast.error(`You can upload up to 6 images... \n Please try again.`);
        break;
      }

      if (!allowedFileTypes.includes(file.type)) {
        toast.error(`${file.name} is not a valid image file.`);
        continue;
      }

      if (file.size > 1024 * 1024 * 5) {
        toast.error(
          `${file.name.substring(0, 15)}... is too large. \n Max image size allowed is 5mb.`
        );
        continue;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImages((images) => [...images, e.target.result]);
      };
    }
  };

  return (
    <div className={styles.image_input}>
      <div className={styles.header}>
        <h2>
          {header} <span>({images.length})</span>
        </h2>

        <Button
          type="reset"
          disabled={images.length >= 6}
          onClick={() => fileInput.current.click()}
        >
          <BsFolderPlus />
        </Button>
      </div>
      <div className={styles.input_wrapper}>
        <input
          type="file"
          name={name}
          ref={fileInput}
          hidden
          multiple
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleImages}
        />
      </div>
      <div className={styles.images_main}>
        {images.length === 0 && (
          <div className={styles.no_image}>
            <h4>No images uploaded yet</h4>
          </div>
        )}
        <div className={styles.grid}>
          {images.length > 0 &&
            images.map((image, i) => (
              <div key={i} className={styles.grid_wrapper}>
                <Image src={image} width={400} height={400} alt={i} />
                <div className={styles.image_actions}>
                  <Button
                    type="button"
                    style="danger"
                    onClick={() => {
                      setImages(images.filter((img) => img !== image));
                      setColorImage("");
                    }}
                  >
                    <BsTrash />
                  </Button>
                  <Button type="button" style="secondary" onClick={() => setColorImage(image)}>
                    <IoMdColorFilter />
                  </Button>
                  <Button type="button" style="tertiary">
                    <RiShape2Line />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
