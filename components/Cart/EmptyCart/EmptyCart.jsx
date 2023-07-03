import Button from "@/components/Layout/Button/Button";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./EmptyCart.module.scss";

const EmptyCart = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const handleSignIn = () => {
    signIn();
  };

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className={styles.empty__cart}>
      <Image src={"/images/empty_cart.png"} width={500} height={500} alt="empty cart" />
      <p>Your cart is empty, but it doesn&#8217;t have to be... </p>
      {session ? (
        <Button onClick={handleRedirect} style="primary">
          <AiOutlineArrowLeft /> Take me shopping
        </Button>
      ) : (
        <Button onClick={handleSignIn} style="primary">
          Sign in/Sign up
        </Button>
      )}
    </div>
  );
};

export default EmptyCart;
