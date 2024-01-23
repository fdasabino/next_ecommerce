import AuthHeader from "@/components/Auth/AuthHeader/AuthHeader";
import Button from "@/components/Layout/Button/Button";
import FormInput from "@/components/Layout/Input/FormInput";
import Loader from "@/components/Layout/Loader/Loader";
import styles from "@/styles/pages/ResetPassword.module.scss";
import axios from "axios";
import { Form, Formik } from "formik";
import jwt from "jsonwebtoken";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import * as Yup from "yup";

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 20;

const ResetPassword = ({ userId }) => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const passwordValidation = Yup.object().shape({
        new_password: Yup.string()
            .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
            .max(MAX_PASSWORD_LENGTH, `Password must be at most ${MAX_PASSWORD_LENGTH} characters`)
            .required("Password is required"),
        confirm_password: Yup.string()
            .oneOf([Yup.ref("new_password"), null], "Your passwords must match")
            .required("Confirm password is required"),
    });

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put("/api/auth/resetpassword", {
                userId,
                password,
            });
            let options = {
                redirect: false,
                email: data.email,
                password,
            };

            await signIn("credentials", options);
            toast.success(data.message);
            setTimeout(() => {
                setLoading(false);
                router.push("/");
            }, 2000);
            return () => clearTimeout();
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <AuthHeader />
                    <div className={styles.resetpassword}>
                        <div className={styles.resetpassword__container}>
                            <div className={styles.resetpassword__form}>
                                <h1>Reset password</h1>
                                <p>Enter your new password</p>
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        new_password: password,
                                        confirm_password: confirmPassword,
                                    }}
                                    validationSchema={passwordValidation}
                                    onSubmit={handleSubmit}>
                                    {(form) => (
                                        <Form>
                                            <FormInput
                                                type="password"
                                                icon="password"
                                                name="new_password"
                                                placeholder="Enter new password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <FormInput
                                                type="password"
                                                icon="password"
                                                name="confirm_password"
                                                placeholder="Confirm new password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <Button
                                                type="submit"
                                                style="primary">
                                                Reset password <AiOutlineArrowRight />
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ResetPassword;

export async function getServerSideProps(context) {
    const { token, req } = context.params;

    // Check if token is still valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_RESET_TOKEN_SECRET);
        const { exp } = decoded;
        const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

        if (exp < currentTime) {
            // Token has expired, redirect to the home page, send message to user
            return {
                redirect: {
                    destination: "/",
                },
            };
        }

        const session = await getSession({ req });
        if (session) {
            // User is already authenticated, redirect to the home page
            return {
                redirect: {
                    destination: "/",
                },
            };
        }

        const userId = decoded.id;

        return {
            props: {
                userId,
            },
        };
    } catch (error) {
        // Invalid token or error occurred during verification, handle accordingly (e.g., redirect to an error page)
        return {
            redirect: {
                destination: "/",
            },
        };
    }
}
