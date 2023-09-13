import Button from "@/components/Layout/Button/Button";
import { toggleExpandableSidebar } from "@/redux-store/expandableSidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSidebar/AdminSideBar";
import styles from "./AdminLayout.module.scss";

const AdminLayout = ({ children }) => {
  const expandableSidebar = useSelector((state) => state.expandableSidebar);
  const { isExpanded } = expandableSidebar;
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    dispatch(toggleExpandableSidebar());
  };

  return (
    <div className={styles.admin_layout}>
      {isExpanded && <div className={styles.overlay} />}
      <AdminSideBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <AdminHeader toggleSidebar={toggleSidebar} isExpanded={isExpanded} />
      <div className={styles.admin_layout__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
