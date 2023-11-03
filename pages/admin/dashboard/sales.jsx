import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import User from "@/models/User";
import styles from "@/styles/pages/AdminSales.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const AdminSales = ({ user }) => {
    const router = useRouter();
    const { pathname } = router;
    const path = pathname.split("/admin/dashboard")[1];

    return (
        <AdminLayout path={path} user={user}>
            <div className={styles.admin_sales}>
                <h1>page under construction - apologies for any inconvenience</h1>
            </div>
        </AdminLayout>
    );
};

export default AdminSales;

// server side code
export async function getServerSideProps(context) {
    db.connectDB();
    const session = await getSession(context);
    try {
        const user = await User.findOne({ _id: session.user._id }).lean();
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
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
