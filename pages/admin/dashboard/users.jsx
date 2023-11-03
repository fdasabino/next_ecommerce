import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import UsersList from "@/components/Admin/UsersList/UsersList";
import User from "@/models/User";
import styles from "@/styles/pages/AdminUsers.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
const AdminUsers = ({ user, users }) => {
    const router = useRouter();
    const { pathname } = router;
    const path = pathname.split("/admin/dashboard")[1];

    return (
        <AdminLayout path={path} user={user}>
            <div className={styles.users}>
                <UsersList rows={users} />
            </div>
        </AdminLayout>
    );
};

export default AdminUsers;

// server side code
export async function getServerSideProps(context) {
    await db.connectDB();
    const session = await getSession(context);
    try {
        const user = await User.findOne({ _id: session.user._id }).lean();
        const users = await User.find({}).sort({ createdAt: -1 }).lean();

        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                users: JSON.parse(JSON.stringify(users)),
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
