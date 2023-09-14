import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import CategoriesList from "@/components/Admin/CategoriesList/CategoriesList";
import CreateCategory from "@/components/Admin/CreateCategory/CreateCategory";
import Category from "@/models/Category";
import styles from "@/styles/pages/AdminCategories.module.scss";
import db from "@/utils/db";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminCategories = ({ categories }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];
  const [data, setData] = useState(categories);

  return (
    <AdminLayout path={path}>
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
  try {
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    return {
      props: {
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
