import Button from "@/components/Layout/Button/Button";
import FormInput from "@/components/Layout/Input/FormInput";
import styles from "@/styles/pages/SignIn.module.scss";
import { Form, Formik } from "formik";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";

const initialValues = {
  login_email: "",
  login_password: "",
};

const SignIn = ({ providers }) => {
  const MIN_PASSWORD_LENGTH = 6;
  const MAX_PASSWORD_LENGTH = 20;

  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Validation schema with Yup
  const signInValidation = Yup.object().shape({
    login_email: Yup.string()
      .email("Please enter a valid email address...")
      .required("Email address is required..."),
    login_password: Yup.string()
      .required("Password is required...")
      .min(6, `Password is too short (minimun ${MIN_PASSWORD_LENGTH} characters)`)
      .max(20, `Password is too long (maximum ${MAX_PASSWORD_LENGTH} characters)`),
  });

  console.log(providers);
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
          <Formik
            enableReinitialize
            initialValues={{ login_email, login_password }}
            validationSchema={signInValidation}
          >
            {(form) => (
              <Form>
                <FormInput
                  type="email"
                  icon="email"
                  name="login_email"
                  placeholder="Email address"
                  onChange={handleChange}
                />
                <FormInput
                  type="password"
                  icon="password"
                  name="login_password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <Button>
                  Sign in <AiOutlineArrowRight />
                </Button>
                <div className={styles.forgot_password}>
                  <Link href="/forgot-password">Forgot your password?</Link>
                </div>
              </Form>
            )}
          </Formik>
          <div className={styles.signin__providers}>
            <span>Or sign in with</span>
            {Object.values(providers).map((provider) => (
              <div key={provider.id} className={styles.provider_container}>
                <Button type="google" onClick={() => signIn(provider.id)}>
                  <FcGoogle /> Google sign in
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

export async function getServerSideProps() {
  try {
    const providers = await getProviders();

    return {
      props: { providers },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { providers: [] }, // return empty providers array if there's an error
    };
  }
}
