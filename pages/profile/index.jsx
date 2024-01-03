import OrderCard from "@/components/Profile/OrderCard/OrderCard";
import ProfileLayout from "@/components/Profile/ProfileLayout/ProfileLayout";
import Order from "@/models/Order";
import styles from "@/styles/pages/Profile.module.scss";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Profile = ({ user, orders }) => {
    const router = useRouter();
    const { pathname } = router;
    const path = pathname;
    return (
        <ProfileLayout
            user={user}
            path={path}>
            <div className={styles.profile}>
                <div className={styles.profile__heading}>
                    <h2>Latest orders</h2>
                </div>
                <div className={styles.profile__orders}>
                    {orders
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 6)
                        .map((order) => (
                            <OrderCard
                                key={order._id}
                                order={order}
                            />
                        ))}
                </div>
            </div>
        </ProfileLayout>
    );
};

export default Profile;

export async function getServerSideProps(context) {
    const { query, req } = context;
    const session = await getSession({ req });
    const { user } = session;
    const tab = query.tab || 0;
    const orders = await Order.find({ user: user._id });

    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
            orders: JSON.parse(JSON.stringify(orders)),
            tab,
        },
    };
}
