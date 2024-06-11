import { notificationsData } from "@/data/notifications";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import styles from "./Notifications.module.scss";

const Notifications = () => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <div
      className={styles.dropdown}
      onClick={toggleShow}>
      <div className={styles.dropdown__svg}>
        <AiOutlineBell />
      </div>
      <div
        className={`${styles.dropdown__content} ${show ? styles.active : ""} ${styles.scrollbar}`}
        onMouseLeave={toggleShow}>
        <div className={styles.dropdown__content_notifications}>
          {notificationsData.map((n, i) => (
            <div key={i}>
              {n.type === "order" ? (
                <div className={styles.dropdown__content_notifications_notification}>
                  <Image
                    src={n.image}
                    width={100}
                    height={100}
                    alt=""
                  />
                  <p>
                    <span>{n.user}</span> created a new order. Total of ${n.total}
                  </p>
                </div>
              ) : (
                <div className={styles.dropdown__content_notifications_notification}>
                  <Image
                    src={n.image}
                    width={100}
                    height={100}
                    alt=""
                  />
                  <span>{n.user}</span> created a new account
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.dropdown__content_footer}>
          <Link href="/admin/dashboard/notifications">See all notifications</Link>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
