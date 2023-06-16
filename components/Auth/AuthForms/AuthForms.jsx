import Button from "@/components/Layout/Button/Button";
import FormInput from "@/components/Layout/Input/FormInput";
import axios from "axios";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineUserAdd } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import * as Yup from "yup";

const initialValues = {
  login_email: "",
  login_password: "",
  full_name: "",
  signup_email: "",
  signup_password: "",
  signup_confirm_password: "",
};

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 20;

const AuthForms = (props) => {
  const { styles, csrfToken, providers, setLoading, callbackUrl } = props;
  const router = useRouter();
  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    full_name,
    signup_email,
    signup_password,
    signup_confirm_password,
  } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignUp = async ({ full_name, signup_email, signup_password }) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name: full_name,
        email: signup_email,
        password: signup_password,
      });
      setUser((prevUser) => ({
        ...prevUser,
      }));
      toast.success(data.message);

      let options = {
        redirect: false,
        email: signup_email,
        password: signup_password,
      };
      await signIn("credentials", options);

      await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 2000)),
        setUser(initialValues),
        router.push(callbackUrl || "/"),
      ]);
    } catch (error) {
      toast.error(error.response.data.message);
      setUser((prevUser) => ({
        ...prevUser,
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      let options = {
        redirect: false,
        email: login_email,
        password: login_password,
      };
      const res = await signIn("credentials", options);
      setUser({ ...user });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Successfully signed in!");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setUser(initialValues);
      router.push(callbackUrl || "/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Validation schema with Yup sign in
  const signInValidation = Yup.object().shape({
    login_email: Yup.string()
      .email("Please enter a valid email address...")
      .required("Email address is required..."),
    login_password: Yup.string()
      .required("Password is required...")
      .min(6, `Password is too short (minimun ${MIN_PASSWORD_LENGTH} characters)`)
      .max(20, `Password is too long (maximum ${MAX_PASSWORD_LENGTH} characters)`),
  });
  // Validation schema with Yup sign up
  const signUpValidation = Yup.object().shape({
    full_name: Yup.string()
      .min(2, "Name must be at least 2 letters long")
      .max(25, "Name must shorter than 25 letters")
      .required("Full name is required"),
    signup_email: Yup.string().email("Invalid email").required("Email is required"),
    signup_password: Yup.string()
      .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
      .max(MAX_PASSWORD_LENGTH, `Password must be at most ${MAX_PASSWORD_LENGTH} characters`)
      .required("Password is required"),
    signup_confirm_password: Yup.string()
      .oneOf([Yup.ref("signup_password"), null], "Your passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <>
      <div className={styles.signin__container}>
        <div className={styles.signin__form}>
          <h1>Sign in</h1>
          <p>Sign in with your account</p>
          <Formik
            enableReinitialize
            initialValues={{ login_email, login_password }}
            validationSchema={signInValidation}
            onSubmit={handleSignIn}
          >
            {(form) => (
              <Form method="post" action="/api/auth/signin/email">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
                <Button type="submit" style="primary">
                  Sign in <AiOutlineArrowRight />
                </Button>
                <div className={styles.forgot_password}>
                  <Link href="/auth/forgotpassword">Forgot your password?</Link>
                </div>
              </Form>
            )}
          </Formik>
          {/* Providers */}
          <div className={styles.signin__providers}>
            <span>or sign in with:</span>
            {Object.values(providers).map((provider) => {
              // skip credentials provider since we already have it above
              if (provider.id === "credentials") return;
              return (
                <div key={provider.id} className={styles.provider_container}>
                  <form method="post" action={`/api/auth/signin/${provider.name}`}>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <Button style="google" onClick={() => signIn(provider.id)}>
                      <FcGoogle /> Google account
                    </Button>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="vertical-line" />
      {/* Right */}
      <div className={styles.signin__container}>
        <div className={styles.signin__form}>
          <h1>Sign up</h1>
          <p>Sign up with credentials</p>
          <Formik
            enableReinitialize
            initialValues={{
              full_name,
              signup_email,
              signup_password,
              signup_confirm_password,
            }}
            validationSchema={signUpValidation}
            onSubmit={handleSignUp}
          >
            {(form) => (
              <Form>
                <FormInput
                  type="text"
                  icon="user"
                  name="full_name"
                  placeholder="Full name"
                  onChange={handleChange}
                />
                <FormInput
                  type="email"
                  icon="email"
                  name="signup_email"
                  placeholder="Email address"
                  onChange={handleChange}
                />
                <FormInput
                  type="password"
                  icon="password"
                  name="signup_password"
                  placeholder="Create password"
                  onChange={handleChange}
                />
                <FormInput
                  type="password"
                  icon="password"
                  name="signup_confirm_password"
                  placeholder="Confirm password"
                  onChange={handleChange}
                />
                <Button type="submit" style="primary">
                  Sign up <AiOutlineUserAdd />
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AuthForms;
