import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import CategoriesList from "@/components/Admin/CategoriesList/CategoriesList";
import CreateCategory from "@/components/Admin/CreateCategory/CreateCategory";
import Category from "@/models/Category";
import User from "@/models/User";
import { setCategories } from "@/redux-store/categoriesSlice";
import styles from "@/styles/pages/AdminCategories.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AdminCategories = ({ categories, user }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { pathname } = router;
    const path = pathname.split("/admin/dashboard")[1];
    const [data, setData] = useState(categories);

    useEffect(() => {
        dispatch(setCategories(data));
    }, [data, dispatch]);

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
    await db.connectDB();
    const session = await getSession(context);
    try {
        const user = await User.findOne({ _id: session.user._id }).lean();
        const categories = await Category.find({}).sort({ createdAt: 1 }).lean();
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
        await db.disconnectDB();
    }
}
