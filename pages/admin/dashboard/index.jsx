import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import styles from "@/styles/pages/AdminDashboard.module.scss";

const AdminDashboard = () => {
  return (
    <div className={styles.admin_dashboard}>
      <AdminLayout>Layout</AdminLayout>
    </div>
  );
};

export default AdminDashboard;
