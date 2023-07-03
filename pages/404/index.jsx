import Button from "@/components/Layout/Button/Button";
import styles from "@/styles/pages/NotFound.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import NotFoundImg from "/public/images/404.png";

const NotFound = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className={styles.not_found}>
      <div className={styles.not_found__container}>
        <Image src={NotFoundImg} width={500} height={500} alt="notfound" priority />
        <h1>OOPs!</h1>
        <h2>Page Not Found</h2>
        <p>
          It seems like the page you are looking for does not exist!
          <br />
          <br />
        </p>
        <Button onClick={handleRedirect} style="primary">
          <AiOutlineArrowLeft /> Take me back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
