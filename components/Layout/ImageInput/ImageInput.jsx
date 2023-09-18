import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import { BiErrorCircle } from "react-icons/bi";

import { showDialog } from "@/redux-store/dialogSlice";
import Image from "next/image";
import { BsFolderPlus, BsTrash } from "react-icons/bs";
import { GiExtractionOrb } from "react-icons/gi";
import { RiShape2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import styles from "./ImageInput.module.scss";

const ImageInput = ({ name, header, text, images, setImages, setColorImage, ...props }) => {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [meta, field] = useField(name);

  console.log("meta", meta.error);
  console.log("field", field);
  console.log(images);

  const allowedFileTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    console.log("files", files);

    // loop through selected files and check file type and size and quantity
    files.forEach((file, i) => {
      if (i === 6 || images.length === 6) {
        dispatch(
          showDialog({
            header: "Maximum of 6 images are allowed.",
            msgs: [
              {
                msg: `You can upload only up to 6 images.`,
                type: "error",
              },
            ],
          })
        );
        return;
      }

      if (!allowedFileTypes.includes(file.type)) {
        dispatch(
          showDialog({
            header: "Unsupported file type",
            msgs: [
              {
                msg: `${file.name} is not a supported file type. Try uploading JPG, JPEG, WEBP or PNG files.`,
                type: "error",
              },
            ],
          })
        );
        files = files.filter((f) => f !== file.name);
        return;
      }

      if (file.size > 1024 * 1024 * 5) {
        dispatch(
          showDialog({
            header: "File too large",
            msgs: [
              {
                msg: `${file.name} is too large. Try uploading a file that is less than 5MB.`,
                type: "error",
              },
            ],
          })
        );
        files = files.filter((f) => f !== file.name);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImages((images) => [...images, e.target.result]);
      };
    });
  };

  return (
    <div className={styles.image_input}>
      <div className={styles.header}>
        <h2 className={`${meta.error ? styles.error_header : ""}`}>
          {meta.error && <BiErrorCircle />} {header}
        </h2>
        {meta.touched && meta.error && (
          <span className={styles.error_msg}>
            <span></span>
            <ErrorMessage name={name} />
          </span>
        )}
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
        <Button
          style={meta.error ? "danger" : "primary"}
          type="reset"
          disabled={images.length === 6 || meta.error}
          onClick={() => fileInput.current.click()}
        >
          {text}
          <BsFolderPlus />
        </Button>
      </div>
      <div className={styles.images_main}>
        {images.length === 0 && (
          <div className={styles.no_image}>
            <h4>No images uploaded yet.</h4>
          </div>
        )}
        <div
          className={`${styles.grid} ${
            images.length === 2
              ? styles.grid_two
              : images.length === 3
              ? styles.grid_three
              : images.length === 4
              ? styles.grid_four
              : images.length === 5
              ? styles.grid_five
              : images.length === 6
              ? styles.grid_six
              : ""
          }`}
        >
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
                  <Button style="secondary">
                    <GiExtractionOrb />
                  </Button>
                  <Button
                    style="tertiary"
                    onClick={() => {
                      setColorImage(image);
                    }}
                  >
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
