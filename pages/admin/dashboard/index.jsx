import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import User from "@/models/User";
import styles from "@/styles/pages/AdminDashboard.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const AdminDashboard = ({ user }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname;

  return (
    <div className={styles.admin_dashboard}>
      <AdminLayout path={path} user={user}>
        Layout
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;

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
