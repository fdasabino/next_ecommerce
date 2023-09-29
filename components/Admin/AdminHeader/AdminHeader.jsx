import Notifications from "@/components/Layout/Notifications/Notifications";
import Hamburger from "hamburger-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IoCogSharp } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import styles from "./AdminHeader.module.scss";

const AdminHeader = ({ toggleSidebar, isExpanded, user, path }) => {
  const isSmall = useMediaQuery({ query: "(max-width: 480px)" });
  const isMedium = useMediaQuery({ query: "(max-width: 768px)" });
  const isLarge = useMediaQuery({ query: "(min-width: 800px)" });
  const { data: session } = useSession(); // backup session

  return (
    <div className={styles.admin_header}>
      <div className={styles.col}>
        <div className={styles.user}>
          <Image
            src={user?.image || session?.user?.image}
            width={300}
            height={300}
            alt={user?.name || session?.user?.name}
          />
          <div className={styles.user_info}>
            <h4>
              <span>
                Welcome back, <br />
              </span>{" "}
              {user?.name || session?.user?.name}
            </h4>
          </div>
        </div>
      </div>

      {isLarge && (
        <div className={styles.col}>
          <h2>
            <IoCogSharp />
            {path.split("/")[path.split("/").length - 1]}
          </h2>
        </div>
      )}

      <div className={styles.col}>
        <Hamburger
          toggled={isExpanded}
          toggle={toggleSidebar}
          size={isSmall ? 16 : isMedium ? 20 : 24}
        />
        <Notifications />
      </div>
    </div>
  );
};

export default AdminHeader;
