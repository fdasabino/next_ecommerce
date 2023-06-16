import AuthHeader from "@/components/Auth/AuthHeader/AuthHeader";
import Button from "@/components/Layout/Button/Button";
import FormInput from "@/components/Layout/Input/FormInput";
import styles from "@/styles/pages/ForgotPassword.module.scss";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailValidation = Yup.object().shape({
    email_address: Yup.string()
      .email("Please enter a valid email address...")
      .required("👇 Please enter your email address"),
  });

  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <>
      <AuthHeader />
      <div className={styles.forgotpassword}>
        <div className={styles.forgotpassword__container}>
          <div className={styles.forgotpassword__form}>
            <h1>Forgot password</h1>
            <p>Enter your email address, to receive the instructions</p>
            <Formik
              enableReinitialize
              initialValues={{ email_address: email }}
              validationSchema={emailValidation}
              onSubmit={handleSubmit}
            >
              {(form) => (
                <Form>
                  <FormInput
                    type="email"
                    icon="email"
                    name="email_address"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" style="primary">
                    Send link <AiOutlineArrowRight />
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
