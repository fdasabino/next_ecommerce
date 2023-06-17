import Button from "@/components/Layout/Button/Button";
import { userSwiperArray } from "@/data/home_data";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMessage } from "react-icons/ai";
import { BsFillSunFill, BsHeart } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { EffectCards } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./UserPanel.module.scss";

const UserPanel = () => {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <div className={styles.user_panel}>
      <div className={styles.user_panel__header}></div>
      <div className={styles.user_panel__container}>
        {session ? (
          <div className={styles.user_panel__info}>
            <Image src={session?.user.image} width={500} height={500} alt={session?.user.name} />
            <h4>{session?.user.name}</h4>
            <small>{session?.user.email}</small>
          </div>
        ) : (
          <div className={styles.user_panel__info}>
            <Image
              src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
              width={500}
              height={500}
              alt="user"
            />
            <h3>Welcome to shoppyflow</h3>
            <h4>Sign in to your account</h4>
            <div className={styles.user_panel__info__ctas}>
              <Button onClick={handleSignIn} style="primary">
                Sign in
              </Button>
            </div>
          </div>
        )}

        {session && (
          <ul className={styles.user_panel__links}>
            <li>
              <Link href="/">
                <IoSettingsOutline />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <HiOutlineClipboardList />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <AiOutlineMessage />
                <span>Messages</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <BsHeart />
                <span>Wishlist</span>
              </Link>
            </li>
          </ul>
        )}

        {!session && (
          <>
            <div className={styles.user_panel__swiper}>
              <h3>
                Hot right now <BsFillSunFill />
              </h3>
              <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="user_panel_swiper"
              >
                {userSwiperArray.map((item, i) => (
                  <SwiperSlide key={i}>
                    <Link href={item.link}>
                      <Image src={item.image} width={500} height={500} alt="swiper_item" />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
