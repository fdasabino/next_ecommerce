import { footerLinks } from "@/constants";
import { IconButton, Tooltip } from "@mui/material";
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
import { GoMoveToTop } from "react-icons/go";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import styles from "./Footer.module.scss";

const Footer = () => {
  const country = useSelector((state) => state.country);

  // back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__left}>
          <div className={styles.footer__logo}>
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={1000}
                height={1000}
                alt="logo"
                priority
              />
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
            <input
              type="email"
              placeholder="Enter your email address"
            />
            <Button style="primary">
              Send <BiMailSend />
            </Button>
          </div>
          <small>
            *By subscribing you are automatically agreeing to our <br />
            <Link href="/policy">Privacy and Cookie Policy</Link>.
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
        <div className={styles.copyright}>
          <Image
            src={country?.flag?.wikimedia}
            width={300}
            height={300}
            alt={`Flag of ${country.name}`}
          />
          <p> ShoppyFlow© {new Date().getUTCFullYear()} All Rights Reserved</p>
        </div>
      </div>
      <div className={styles.back_to_top}>
        <Tooltip
          title="Back to top"
          placement="left"
          arrow>
          <IconButton onClick={scrollToTop}>
            <GoMoveToTop />
          </IconButton>
        </Tooltip>
      </div>
    </footer>
  );
};

export default Footer;
