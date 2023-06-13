import FormInput from "@/components/Layout/Input/FormInput";
import styles from "@/styles/SignIn.module.scss";
import { Form, Formik } from "formik";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";

const SignIn = () => {
  return (
    <div className={styles.signin}>
      <div className={styles.signin__container}>
        <div className={styles.signin__header}>
          <div className={styles.back__svg}>
            <BiLeftArrowAlt />
          </div>
          <span>
            Find the best prices and the best brands! <Link href="/">Explore our store</Link>
          </span>
        </div>
        <div className={styles.signin__form}>
          <h1>Sign in</h1>
          <p>Sign in with your account</p>
          <Formik>
            {(form) => (
              <Form>
                <FormInput icon="password" placeholder="Enter your password" />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
