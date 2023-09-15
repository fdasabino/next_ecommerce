import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import CreateSubCategory from "@/components/Admin/CreateSubCategory/CreateSubCategory";
import SubCategoriesList from "@/components/Admin/SubCategoriesList/SubCategoriesList";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import styles from "@/styles/pages/AdminSubCategories.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminSubCategories = ({ subCategories, categories, user }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];
  const [subData, setSubData] = useState(subCategories);

  return (
    <AdminLayout path={path} user={user}>
      <div className={styles.admin_subcategories}>
        <CreateSubCategory subData={subData} setSubData={setSubData} categories={categories} />
        <SubCategoriesList subData={subData} setSubData={setSubData} categories={categories} />
      </div>
    </AdminLayout>
  );
};

export default AdminSubCategories;

// server side code
export async function getServerSideProps(context) {
  db.connectDB();
  const session = await getSession(context);
  try {
    const user = await User.findOne({ _id: session.user._id }).lean();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    const subCategories = await SubCategory.find({})
      .populate({ path: "parent", model: Category })
      .sort({ updatedAt: -1 })
      .lean();
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
    db.disconnectDB();
  }
}
