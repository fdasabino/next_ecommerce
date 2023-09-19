import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import Button from "@/components/Layout/Button/Button";
import ColorsInput from "@/components/Layout/ColorsInput/ColorsInput";
import DetailsInput from "@/components/Layout/DetailsInput/DetailsInput";
import ImageInput from "@/components/Layout/ImageInput/ImageInput";
import AdminInput from "@/components/Layout/Input/AdminInput";
import MultipleSelectInput from "@/components/Layout/MultipleSelectInput/MultipleSelectInput";
import QuestionsInput from "@/components/Layout/QuestionsInput/QuestionsInput";
import SingleSelectInput from "@/components/Layout/Select/SingleSelectInput";
import SizesInput from "@/components/Layout/SizesInput/SizesInput";
import StyleInput from "@/components/Layout/StyleInput/StyleInput";
import Category from "@/models/Category";
import Product from "@/models/Product";
import User from "@/models/User";
import styles from "@/styles/pages/CreateProduct.module.scss";
import db from "@/utils/db";
import axios from "axios";
import { Form, Formik } from "formik";
import { GetColorName } from "hex-color-to-color-name";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const productValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter a name")
    .min(5, "Name must be at least 5 characters")
    .max(40, "Name must be at most 40 characters"),
  brand: Yup.string().required("Please enter a brand"),
  category: Yup.string().required("Please select a category"),
  subCategories: Yup.array()
    .required("Please choose one or more sub categories")
    .min(1, "Please choose one or more sub categories"),
  sku: Yup.string().required("Please enter a sku / stock keeping unit"),
  color: Yup.string().required("Please enter a color"),
  description: Yup.string()
    .required("Please enter a description")
    .max(2000, "Description must be at most 100 characters"),
  discount: Yup.number()
    .required("Please enter a discount")
    .min(0, "Discount must be at least 0")
    .max(100, "Discount must be at most 100"),
});

const CreateProduct = ({ categories, parents, user }) => {
  const initialState = {
    name: "",
    description: "",
    brand: "",
    sku: "",
    discount: "",
    images: [],
    description_images: [],
    parent: "",
    category: "",
    subCategories: [],
    color: {
      color: "",
      image: "",
    },
    sizes: [
      {
        size: "",
        qty: "",
        price: "",
      },
    ],
    details: [
      {
        name: "",
        value: "",
      },
    ],
    questions: [
      {
        question: "",
        answer: "",
      },
    ],
    shippingFee: "",
  };

  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState();
  const [images, setImages] = useState([]);
  const [descriptionImages, setDescriptionImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggleBasicInfo, setToggleBasicInfo] = useState(true);
  const [toggleCategoryInfo, setToggleCategoryInfo] = useState(false);
  const [toggleSizeInfo, setToggleSizeInfo] = useState(false);
  const [toggleDetailsInfo, setToggleDetailsInfo] = useState(false);
  const [toggleQuestionsInfo, setToggleQuestionsInfo] = useState(false);

  const dispatch = useDispatch();

  console.log("product", product);

  useEffect(() => {
    const getParentData = async () => {
      const res = await axios.get(`/api/product/${product.parent || ""}`);
      console.log("res", res.data);
      if (res.data) {
        setProduct({
          ...product,
          name: res.data.name,
          description: res.data.description,
          brand: res.data.brand,
          category: res.data.category,
          subCategories: res.data.subCategories,
          questions: [],
          details: [],
        });
      }
    };

    // empty the product state if the parent is changed reset the product state
    if (product.parent === "") {
      setProduct(initialState);
    }

    // if the product has a parent get the parent data
    if (product.parent) {
      getParentData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.parent]);

  useEffect(() => {
    const getSubs = async () => {
      const res = await axios.get(`/api/admin/subCategory`, {
        params: { category: product.category },
      });
      setSubs(res.data);
    };
    getSubs();
  }, [product.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const createProduct = async () => {};

  return (
    <AdminLayout path={path} user={user}>
      <div className={styles.create_product}>
        <Formik
          enableReinitialize
          initialValues={{
            name: product.name,
            brand: product.brand,
            description: product.description,
            category: product.category,
            subCategories: product.subCategories,
            parent: product.parent,
            sku: product.sku,
            discount: product.discount,
            color: product.color.color,
            imageInputFile: "",
            styleInput: "",
          }}
          validationSchema={productValidationSchema}
          onSubmit={createProduct}
        >
          {(formik) => (
            <Form>
              {/* parent product */}
              <SingleSelectInput
                name="parent"
                value={product.parent}
                data={parents}
                placeholder="Select a parent product / leave empty to create a new product"
                onChange={handleChange}
              />

              {/* images */}
              <ImageInput
                name="imageInputFile"
                header="Product Images"
                text="Add Images"
                images={images}
                setImages={setImages}
                setColorImage={setColorImage}
              />

              {/* selected color or image */}
              {images.length > 0 && (
                <>
                  <div className={styles.selected_colors}>
                    <h4>
                      Selected color: {product.color.color && GetColorName(product.color.color)}
                    </h4>
                    <div className={styles.wrapper}>
                      <div className={styles.picked_color}>
                        {product.color.image && (
                          <Image
                            src={product.color.image}
                            width={250}
                            height={250}
                            className={styles.image_span}
                            alt={product.color.color}
                          />
                        )}

                        {product.color.color && (
                          <span
                            className={styles.color_span}
                            style={{ background: `${product.color.color}` }}
                          />
                        )}
                      </div>
                      <ColorsInput
                        name="color"
                        product={product}
                        header={"Pick a product color"}
                        setProduct={setProduct}
                        colorImage={colorImage}
                      />
                    </div>
                    {/* style input */}
                    {images.length > 0 && product.color.color && (
                      <StyleInput
                        name="colorImageInput"
                        product={product}
                        setProduct={setProduct}
                        colorImage={colorImage}
                      />
                    )}
                  </div>
                </>
              )}

              {/* basic inputs */}
              <div className={styles.header}>
                <h2>Basic Information</h2>
                <AiOutlineArrowDown
                  style={toggleBasicInfo ? { transform: "rotate(180deg)" } : ""}
                  onClick={() => setToggleBasicInfo((prev) => !prev)}
                />
              </div>
              {toggleBasicInfo && (
                <>
                  <AdminInput
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Product name"
                    icon="name"
                    onChange={handleChange}
                  />
                  <AdminInput
                    type="text"
                    name="description"
                    label="Description"
                    placeholder="Product description"
                    icon="description"
                    onChange={handleChange}
                  />
                  <AdminInput
                    type="text"
                    name="brand"
                    label="Brand"
                    placeholder="Product brand"
                    icon="brand"
                    onChange={handleChange}
                  />
                  <AdminInput
                    type="text"
                    name="sku"
                    label="SKU"
                    placeholder="Product SKU / Stock Keeping Unit"
                    icon="barCode"
                    onChange={handleChange}
                  />
                  <AdminInput
                    type="number"
                    name="discount"
                    label="Discount"
                    placeholder="Product discount"
                    icon="discount"
                    onChange={handleChange}
                  />
                </>
              )}

              {/* category */}
              <div className={styles.header}>
                <h2>Category information</h2>
                <AiOutlineArrowDown
                  style={toggleCategoryInfo ? { transform: "rotate(180deg)" } : ""}
                  onClick={() => setToggleCategoryInfo((prev) => !prev)}
                />
              </div>
              {toggleCategoryInfo && (
                <>
                  <SingleSelectInput
                    name="category"
                    value={product.category}
                    data={categories}
                    placeholder="Select a parent category"
                    onChange={handleChange}
                    disabled={product.parent === "" ? false : true}
                  />

                  {/* sub categories */}
                  {product.category && (
                    <MultipleSelectInput
                      value={product.subCategories}
                      name="subCategories"
                      placeholder="Select sub categories"
                      handleChange={handleChange}
                      disabled={product.parent === "" ? false : true}
                      data={subs}
                      setSubs={setSubs}
                    />
                  )}
                </>
              )}

              {/* sizes */}
              <div className={styles.header}>
                <h2>Sizes / Quantity / Price</h2>
                <AiOutlineArrowDown
                  style={toggleSizeInfo ? { transform: "rotate(180deg)" } : ""}
                  onClick={() => setToggleSizeInfo((prev) => !prev)}
                />
              </div>
              {toggleSizeInfo && (
                <SizesInput sizes={product.sizes} product={product} setProduct={setProduct} />
              )}

              {/* details */}
              <div className={styles.header}>
                <h2>Details</h2>
                <AiOutlineArrowDown
                  style={toggleDetailsInfo ? { transform: "rotate(180deg)" } : ""}
                  onClick={() => setToggleDetailsInfo((prev) => !prev)}
                />
              </div>
              {toggleDetailsInfo && (
                <DetailsInput details={product.details} product={product} setProduct={setProduct} />
              )}

              {/* questions */}
              <div className={styles.header}>
                <h2>Questions</h2>
                <AiOutlineArrowDown
                  style={toggleQuestionsInfo ? { transform: "rotate(180deg)" } : ""}
                  onClick={() => setToggleQuestionsInfo((prev) => !prev)}
                />
              </div>
              {toggleQuestionsInfo && (
                <QuestionsInput
                  questions={product.questions}
                  product={product}
                  setProduct={setProduct}
                />
              )}

              <hr />
              <Button type="submit" style="primary">
                Create Product <AiOutlinePlus />
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </AdminLayout>
  );
};

export default CreateProduct;

// server side code
export async function getServerSideProps(context) {
  await db.connectDB();
  const session = await getSession(context);
  try {
    const user = await User.findOne({ _id: session.user._id }).lean();
    const results = await Product.find({}).select("name subProducts").lean();
    const categories = await Category.find({}).sort({ createdAt: 1 }).lean();

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        parents: JSON.parse(JSON.stringify(results)),
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Something went wrong",
      },
    };
  } finally {
    await db.disconnectDB();
  }
}
