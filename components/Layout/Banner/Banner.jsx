import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";
import Button from "../Button/Button";
import styles from "./Banner.module.scss";

const Banner = () => {
  const router = useRouter();
  return (
    <div className={styles.banner}>
      <div className={styles.overlay} />
      <div className={styles.left}>
        <div>
          <Typewriter
            options={{
              strings: ["Up to 50% off on selected products"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className={styles.right}>
        <Button onClick={() => router.push("/browse")} style="primary">
          Shop now!
        </Button>
      </div>
    </div>
  );
};

export default Banner;
