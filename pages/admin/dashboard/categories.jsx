import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import CategoriesList from "@/components/Admin/CategoriesList/CategoriesList";
import CreateCategory from "@/components/Admin/CreateCategory/CreateCategory";
import Category from "@/models/Category";
import User from "@/models/User";
import styles from "@/styles/pages/AdminCategories.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminCategories = ({ categories, user }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];
  const [data, setData] = useState(categories);

  return (
    <AdminLayout path={path} user={user}>
      <div className={styles.admin_categories}>
        <CreateCategory setData={setData} />
        <CategoriesList setData={setData} data={data} />
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;

// server side code
export async function getServerSideProps(context) {
  db.connectDB();
  const session = await getSession(context);
  try {
    const user = await User.findOne({ _id: session.user._id }).lean();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
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
    db.disconnectDB();
  }
}
