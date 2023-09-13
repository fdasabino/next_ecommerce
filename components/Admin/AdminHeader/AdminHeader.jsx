import Hamburger from "hamburger-react";
import { useRouter } from "next/router";
import { IoCogSharp } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import styles from "./AdminHeader.module.scss";

const AdminHeader = ({ toggleSidebar, isExpanded }) => {
  const isSmall = useMediaQuery({ query: "(max-width: 480px)" });
  const isMedium = useMediaQuery({ query: "(max-width: 768px)" });

  const router = useRouter();
  return (
    <div className={styles.admin_header}>
      <div className={styles.col}>
        <h2>
          <IoCogSharp /> Admin Tools - {router.pathname.split("/")[2]}
        </h2>
      </div>
      <div className={styles.col}>
        <Hamburger
          toggled={isExpanded}
          toggle={toggleSidebar}
          size={isSmall ? 16 : isMedium ? 20 : 24}
        />
      </div>
    </div>
  );
};

export default AdminHeader;
