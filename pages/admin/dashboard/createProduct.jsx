import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import styles from "@/styles/pages/CreateProduct.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const CreateProduct = ({ categories, subCategories, user }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];

  console.log(user);
  console.log("categories", categories);
  console.log("subCategories", subCategories);

  return (
    <AdminLayout path={path} user={user}>
      <div className={styles.create_product}>CreateProduct</div>
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
    const categories = await Category.find({}).sort({ createdAt: 1 }).lean();
    const subCategories = await SubCategory.find({}).sort({ createdAt: 1 }).lean();
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        categories: JSON.parse(JSON.stringify(categories)),
        subCategories: JSON.parse(JSON.stringify(subCategories)),
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
