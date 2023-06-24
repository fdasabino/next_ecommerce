import Link from "next/link";
import styles from "./Path.module.scss";

const Path = ({ path }) => {
  return (
    <nav aria-label="path">
      <ul className={styles.path}>
        {path.map((step, index) => (
          <li
            key={step.id}
            className={`${styles.path__item}${index === path.length - 1 ? " active" : ""}`}
            aria-current={index === path.length - 1 ? "page" : undefined}
          >
            <>
              {index === 0 ? "" : <span className={styles.path__separator}>/</span>}
              <Link href="/">{step.name}</Link>
            </>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Path;
