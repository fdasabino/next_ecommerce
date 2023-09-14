import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import styles from "@/styles/pages/AdminDashboard.module.scss";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname;

  return (
    <div className={styles.admin_dashboard}>
      <AdminLayout path={path}>Layout</AdminLayout>
    </div>
  );
};

export default AdminDashboard;
