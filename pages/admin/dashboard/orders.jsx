import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import OrderList from "@/components/Admin/OrdersList/OrderList";
import Order from "@/models/Order";
import User from "@/models/User";
import styles from "@/styles/pages/AdminOrders.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const AdminOrders = ({ user, orders }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];

  return (
    <AdminLayout path={path} user={user}>
      <div className={styles.admin_orders}>
        <OrderList orders={orders} />
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;

// server side code
export async function getServerSideProps(context) {
  await db.connectDB();
  const session = await getSession(context);
  try {
    const user = await User.findOne({ _id: session.user._id }).lean();
    const orders = await Order.find({})
      .populate({ path: "user", model: User })
      .sort({ createdAt: -1 })
      .lean();
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        orders: JSON.parse(JSON.stringify(orders)),
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Something went wrong",
      },
    };
  } finally {
    await db.disconnectDB();
  }
}
