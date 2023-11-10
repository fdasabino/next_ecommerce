import Head from "next/head";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import styles from "./ProfileLayout.module.scss";

const ProfileLayout = ({ children, user, path }) => {
    return (
        <>
            <Head>
                <title>{`Profile | ${user.name}`}</title>
                <meta name="description" content={`${user.name}'s profile...`} />
            </Head>
            <ProfileHeader user={user} path={path} />
            <div className={styles.profile_layout}>{children}</div>
        </>
    );
};

export default ProfileLayout;
