import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import ProductsList from "@/components/Admin/ProductsList/ProductsList";
import Pagination from "@/components/Layout/Pagination/Pagination";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import styles from "@/styles/pages/AdminProducts.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminProducts = ({ products: productsFromDB, user, currentPage, totalPages }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];
  const [products, setProducts] = useState(productsFromDB);

  const handlePageChange = (newPage) => {
    router.push(`/admin/dashboard/products?page=${newPage}`);
  };

  return (
    <AdminLayout
      path={path}
      user={user}>
      <div className={styles.admin_products}>
        <ProductsList
          products={products}
          setProducts={setProducts}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </AdminLayout>
  );
};

export default AdminProducts;

// server side code
export async function getServerSideProps(context) {
  const { page = 1 } = context.query; // Default to page 1 if not specified

  // Calculate the number of items to skip based on the page number
  const itemsPerPage = 5; // Adjust as needed

  await db.connectDB();
  const session = await getSession(context);
  try {
    const user = await User.findOne({ _id: session.user._id }).lean();
    const totalProductsCount = await Product.countDocuments({}); // Get the total count of products
    const totalPages = Math.ceil(totalProductsCount / itemsPerPage); // Calculate the total number of pages

    const products = await Product.find({})
      .sort({ name: 1 })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .populate("category")
      .populate({ path: "subCategories", model: SubCategory })
      .lean()
      .exec();

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        products: JSON.parse(JSON.stringify(products)),
        currentPage: parseInt(page),
        totalPages: parseInt(totalPages),
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
