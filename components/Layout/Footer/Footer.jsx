import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaFacebookSquare, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__left}>
          <div className={styles.footer__logo}>
            <Link href="/">
              <Image src="/images/logo.png" width={1000} height={1000} alt="logo" priority />
            </Link>
          </div>
          <div className={styles.subscribe}>
            <h3>Subscribe to our newsletter</h3>
            <input type="email" />
            <button></button>
          </div>
        </div>
        <div className={styles.footer__right}>
          <div className={styles.footer__links}>
            {footerLinks.map((link, index) => (
              <div key={index}>
                <h3>{link.heading}</h3>
                <ul>
                  {link.links.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link href={item.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr />

      <div className={styles.footer__bottom}>
        <ul>
          <li>
            <FaFacebookSquare />
          </li>
          <li>
            <FaTwitter />
          </li>
          <li>
            <FaWhatsapp />
          </li>
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaDiscord />
          </li>
        </ul>
        <p> ShoppyFlow© {new Date().getUTCFullYear()} All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
