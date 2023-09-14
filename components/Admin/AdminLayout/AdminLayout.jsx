import { toggleExpandableSidebar } from "@/redux-store/expandableSidebarSlice";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSidebar/AdminSideBar";
import styles from "./AdminLayout.module.scss";

const AdminLayout = ({ children, path }) => {
  const expandableSidebar = useSelector((state) => state.expandableSidebar);
  const { isExpanded } = expandableSidebar;
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const user = session?.user;

  const toggleSidebar = () => {
    dispatch(toggleExpandableSidebar());
  };

  return (
    <div className={styles.admin_layout}>
      {isExpanded && <div className={styles.overlay} />}
      <AdminSideBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} path={path} />
      <AdminHeader toggleSidebar={toggleSidebar} isExpanded={isExpanded} user={user} path={path} />
      <div className={styles.admin_layout__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
