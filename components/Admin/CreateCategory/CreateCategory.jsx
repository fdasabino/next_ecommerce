import Button from "@/components/Layout/Button/Button";
import AdminInput from "@/components/Layout/Input/AdminInput";
import { Form, Formik } from "formik";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import * as Yup from "yup";
import styles from "./CreateCategory.module.scss";

const categoryValidation = Yup.object().shape({
  name: Yup.string()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters...")
    .max(20, "Category name must be at most 20 characters...")
    .matches(
      /^[A-Za-z][A-Za-z0-9]*$/,
      "Category name should not have numbers or special characters..."
    ),
});

const CreateCategory = ({ setData }) => {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const handleSubmit = async () => {
    console.log("submit");
  };

  return (
    <div className={styles.create_category}>
      <div className={styles.header}>
        <h2>Create a category</h2>
      </div>
      <Formik
        enableReinitialize
        initialValues={{ name }}
        validationSchema={categoryValidation}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <AdminInput
              type="text"
              value={name}
              name="name"
              placeholder="Category name"
              icon="name"
              onChange={handleChange}
            />
            <Button type="submit" style="primary" disabled={!name}>
              Submit <AiOutlinePlus />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCategory;
