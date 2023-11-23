import { toggleExpandableSidebar } from "@/redux-store/expandableSidebarSlice";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import styles from "./ProfileLayout.module.scss";

const ProfileLayout = ({ children, user, path }) => {
    const expandableSidebar = useSelector((state) => state.expandableSidebar);
    const { isExpanded } = expandableSidebar;
    const dispatch = useDispatch();

    const toggleSidebar = () => {
        dispatch(toggleExpandableSidebar());
    };

    return (
        <>
            <Head>
                <title>{`Profile | ${user.name}`}</title>
                <meta name="description" content={`${user.name}'s profile...`} />
            </Head>

            <div className={styles.profile_layout}>
                {isExpanded && <div className={styles.overlay} onClick={toggleSidebar} />}
                <ProfileSideBar isExpanded={isExpanded} toggleSidebar={toggleSidebar} path={path} />
                <ProfileHeader
                    user={user}
                    path={path}
                    toggleSidebar={toggleSidebar}
                    isExpanded={isExpanded}
                />
                <div className={styles.profile_layout__main}>{children}</div>
            </div>
        </>
    );
};

export default ProfileLayout;
