import AuthForms from "@/components/Auth/AuthForms/AuthForms";
import AuthHeader from "@/components/Auth/AuthHeader/AuthHeader";
import Loader from "@/components/Layout/Loader/Loader";
import styles from "@/styles/pages/SignIn.module.scss";
import { getCsrfToken, getProviders, getSession } from "next-auth/react";
import { useState } from "react";

const SignIn = ({ providers, callbackUrl, csrfToken }) => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <AuthHeader />
                    <div className={styles.signin}>
                        <AuthForms
                            styles={styles}
                            csrfToken={csrfToken}
                            providers={providers}
                            setLoading={setLoading}
                            callbackUrl={callbackUrl}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default SignIn;

export async function getServerSideProps(context) {
    const { req, query } = context;
    const { callbackUrl } = query;
    try {
        const session = await getSession({ req });
        const csrfToken = await getCsrfToken(context);
        const providers = await getProviders();

        if (session) {
            return {
                redirect: {
                    destination: callbackUrl,
                },
            };
        }
        return {
            props: { providers, csrfToken, callbackUrl },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { providers: [] },
        };
    }
}
