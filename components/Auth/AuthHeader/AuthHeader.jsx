import Link from "next/link";
import { useRouter } from "next/router";
import { BiLeftArrowAlt } from "react-icons/bi";
import styles from "./AuthHeader.module.scss";

const AuthHeader = () => {
    const router = useRouter();

    return (
        <div className={styles.signin__header}>
            <button
                className={styles.back__svg}
                onClick={() => router.push("/")}>
                <BiLeftArrowAlt />
            </button>
            <span>
                Find the best prices and the best brands! <Link href="/">Explore our store</Link>
            </span>
        </div>
    );
};

export default AuthHeader;
