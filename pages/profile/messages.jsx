import ProfileLayout from "@/components/Profile/ProfileLayout/ProfileLayout";
import styles from "@/styles/pages/Profile.module.scss";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Messages = ({ user }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname;

  return (
    <ProfileLayout
      user={user}
      path={path}>
      <div className={styles.profile}>Profile</div>
    </ProfileLayout>
  );
};

export default Messages;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  const { user } = session;
  const tab = query.tab || 0;

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      tab,
    },
  };
}
