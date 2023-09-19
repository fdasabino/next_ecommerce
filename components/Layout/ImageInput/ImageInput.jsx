import { showDialog } from "@/redux-store/dialogSlice";
import Image from "next/image";
import { useRef } from "react";
import { BsFolderPlus, BsTrash } from "react-icons/bs";
import { IoMdColorFilter } from "react-icons/io";
import { RiShape2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import styles from "./ImageInput.module.scss";

const ImageInput = ({ name, header, text, images, setImages, setColorImage, ...props }) => {
  const dispatch = useDispatch();
  const fileInput = useRef(null);

  const allowedFileTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  const handleImages = ({ target: { files } }) => {
    for (const file of files) {
      if (images.includes(file)) {
        const dialog = {
          header: "File already uploaded",
          msgs: [
            {
              msg: `${file.name} is already uploaded. Try uploading a different file.`,
              type: "error",
            },
          ],
        };

        dispatch(showDialog(dialog));
        continue;
      }

      if (images.length > 6 || files.length > 6) {
        const dialog = {
          header: "Maximum of 6 images are allowed.",
          msgs: [
            {
              msg: "You can upload only up to 6 images.",
              type: "error",
            },
          ],
        };

        dispatch(showDialog(dialog));
        break;
      }

      if (!allowedFileTypes.includes(file.type)) {
        const dialog = {
          header: "Unsupported file type",
          msgs: [
            {
              msg: `${file.name} is not a supported file type. Try uploading JPG, JPEG, WEBP, or PNG files.`,
              type: "error",
            },
          ],
        };

        dispatch(showDialog(dialog));
        continue;
      }

      if (file.size > 1024 * 1024 * 5) {
        const dialog = {
          header: "File too large",
          msgs: [
            {
              msg: `${file.name} is too large. Try uploading a file that is less than 5MB.`,
              type: "error",
            },
          ],
        };

        dispatch(showDialog(dialog));
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
                    style="danger"
                    onClick={() => {
                      setImages(images.filter((img) => img !== image));
                      setColorImage("");
                    }}
                  >
                    <BsTrash />
                  </Button>
                  <Button style="secondary" onClick={() => setColorImage(image)}>
                    <IoMdColorFilter />
                  </Button>
                  <Button style="tertiary">
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
