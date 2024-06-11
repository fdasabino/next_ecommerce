import styles from "./AdminCard.module.scss";

const AdminCard = ({ icon, title, count }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__icon}>{icon}</div>
      <div className={styles.card__info}>
        <h4>+{count}</h4>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default AdminCard;
