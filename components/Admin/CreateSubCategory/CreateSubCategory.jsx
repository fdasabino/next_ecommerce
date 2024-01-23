import Button from "@/components/Layout/Button/Button";
import AdminInput from "@/components/Layout/Input/AdminInput";
import SingleSelectInput from "@/components/Layout/Select/SingleSelectInput";
import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import * as Yup from "yup";
import styles from "./CreateSubCategory.module.scss";

const subCategoryValidation = Yup.object().shape({
    name: Yup.string()
        .min(3, "Sub category name must be at least 3 characters...")
        .max(20, "Sub category name must be at most 20 characters..."),
    parent: Yup.string().required("Parent category is required..."),
});

const CreateSubCategory = ({ setSubData, categories }) => {
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "name") setName(e.target.value);
        if (e.target.name === "parent") setParent(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post("/api/admin/subCategory", { name, parent });
            setSubData(data.subCategories);
            setName("");
            setParent("");
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response?.data.error);
        }
    };

    return (
        <div className={styles.create_subcategory}>
            <div className={styles.header}>
                <h2>Create a sub category</h2>
            </div>
            <Formik
                enableReinitialize
                initialValues={{ name, parent }}
                validationSchema={subCategoryValidation}
                onSubmit={handleSubmit}>
                {(formik) => (
                    <Form>
                        <AdminInput
                            type="text"
                            value={name}
                            name="name"
                            placeholder="Sub category name"
                            icon="name"
                            onChange={handleChange}
                        />
                        <SingleSelectInput
                            name="parent"
                            value={parent}
                            data={categories}
                            placeholder="Select parent category"
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            style="primary"
                            disabled={!name || !parent}>
                            Submit <AiOutlinePlus />
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateSubCategory;
