import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import ProductsList from "@/components/Admin/ProductsList/ProductsList";
import Product from "@/models/Product";
import User from "@/models/User";
import styles from "@/styles/pages/AdminProducts.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminProducts = ({ products: productsFromDB, user }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];
  const [products, setProducts] = useState(productsFromDB);

  return (
    <AdminLayout path={path} user={user}>
      <div className={styles.admin_products}>
        <ProductsList products={products} setProducts={setProducts} />
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;

// server side code
export async function getServerSideProps(context) {
  db.connectDB();
  const session = await getSession(context);
  try {
    const user = await User.findOne({ _id: session.user._id }).lean();
    const products = await Product.find({})
      .populate("category")
      // .populate("subCategories")
      .lean()
      .exec();
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Something went wrong",
      },
    };
  } finally {
    db.disconnectDB();
  }
}
