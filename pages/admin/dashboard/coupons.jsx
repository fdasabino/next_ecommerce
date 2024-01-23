import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import CouponsList from "@/components/Admin/CouponsList/CouponsList";
import CreateCoupon from "@/components/Admin/CreateCoupon/CreateCoupon";
import Coupon from "@/models/Coupon";
import User from "@/models/User";
import styles from "@/styles/pages/AdminCoupons.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminCoupons = ({ user, coupons }) => {
    const router = useRouter();
    const { pathname } = router;
    const path = pathname.split("/admin/dashboard")[1];
    const [data, setData] = useState(coupons);

    return (
        <div className={styles.admin_coupons}>
            <AdminLayout
                path={path}
                user={user}>
                <CreateCoupon setData={setData} />
                <CouponsList
                    data={data}
                    setData={setData}
                />
            </AdminLayout>
        </div>
    );
};

export default AdminCoupons;

// server side code
export async function getServerSideProps(context) {
    db.connectDB();
    const session = await getSession(context);
    try {
        const user = await User.findOne({ _id: session.user._id }).lean();
        const coupons = await Coupon.find({}).sort({ createdAt: 1 }).lean();
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                coupons: JSON.parse(JSON.stringify(coupons)),
            },
        };
    } catch (error) {
        return {
            props: {
                error: "Something went wrong",
            },
        };
    } finally {
        db.disconnectDB();
    }
}
