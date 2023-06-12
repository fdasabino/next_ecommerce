import { footerLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { BiMailSend } from "react-icons/bi";
import {
  FaCcAmex,
  FaCcDinersClub,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaDiscord,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Button from "../Button/Button";
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

          <div className={styles.footer__payments}>
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcAmex />
            <FaCcDinersClub />
            <FaCcPaypal />
          </div>

          <h3>Subscribe to our newsletter</h3>
          <div className={styles.footer__subscribe}>
            <input type="email" placeholder="Enter your email address" />
            <Button type="primary">
              Send <BiMailSend />
            </Button>
          </div>
          <small>
            *By subscribing you are automatically agreeing to our Privacy and Cookie Policy.
            <hr />
          </small>
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
