import { toggleExpandableSidebar } from "@/redux-store/expandableSidebarSlice";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSideBar from "../AdminSidebar/AdminSideBar";
import styles from "./AdminLayout.module.scss";

const AdminLayout = ({ children, path, user }) => {
    const expandableSidebar = useSelector((state) => state.expandableSidebar);
    const { isExpanded } = expandableSidebar;
    const dispatch = useDispatch();

    const toggleSidebar = () => {
        dispatch(toggleExpandableSidebar());
    };

    return (
        <>
            <Head>
                <title>Admin Dashboard {path === "/admin/dashboard" ? "" : path}</title>
                <meta name="description" content="Admin Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.admin_layout}>
                {isExpanded && <div className={styles.overlay} />}
                <AdminSideBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} path={path} />
                <AdminHeader
                    toggleSidebar={toggleSidebar}
                    isExpanded={isExpanded}
                    user={user}
                    path={path}
                />
                <div className={styles.admin_layout__main}>{children}</div>
            </div>
        </>
    );
};

export default AdminLayout;
