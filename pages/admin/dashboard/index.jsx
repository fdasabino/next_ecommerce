import AdminCard from "@/components/Admin/AdminCard/AdminCard";
import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import AdminOrderCard from "@/components/Admin/AdminOrderCard/AdminOrderCard";
import AdminUserCard from "@/components/Admin/AdminUserCard/AdminUserCard";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import styles from "@/styles/pages/AdminDashboard.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaThList } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { ImUsers } from "react-icons/im";
import { SlHandbag } from "react-icons/sl";

const AdminDashboard = ({ user, users, orders, products }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname;

  const totalEarnings = orders.reduce((acc, order) => acc + order.total, 0);
  const formattedEarnings = totalEarnings.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const recentUsers = users.slice(0, 4);
  const recentOrders = orders.slice(0, 4);

  return (
    <AdminLayout path={path} user={user}>
      <div className={styles.admin_dashboard}>
        <div className={styles.heading}>
          <h2>Admin Summary</h2>
        </div>
        <div className={styles.cards}>
          <AdminCard icon={<GiTakeMyMoney />} title="Total earnings" count={formattedEarnings} />
          <AdminCard icon={<ImUsers />} title="Users" count={users.length} />
          <AdminCard icon={<SlHandbag />} title="Orders" count={orders.length} />
          <AdminCard icon={<FaThList />} title="Products" count={products.length} />
        </div>

        <div className={styles.data}>
          <div className={styles.heading}>
            <h2>{orders.length > 0 ? "Recent Orders" : "No orders to show"}</h2>
            {orders.length > 0 && <Link href={"/admin/dashboard/orders"}>View all</Link>}
          </div>
          {orders.length > 0 && (
            <div className={styles.orders}>
              {recentOrders.map((order) => (
                <AdminOrderCard key={order._id} order={order} />
              ))}
            </div>
          )}

          <div className={styles.heading}>
            <h2>{users.length > 0 ? "Recent users" : "No users to show"}</h2>
            {users.length > 0 && <Link href={"/admin/dashboard/users"}>View all</Link>}
          </div>
          {users.length > 0 && (
            <div className={styles.users}>
              {recentUsers.map((user) => (
                <AdminUserCard key={user._id} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

// server side code
export async function getServerSideProps(context) {
  db.connectDB();
  const session = await getSession(context);
  try {
    const user = await User.findOne({ _id: session.user._id }).lean();
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    const products = await Product.find({}).lean();
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate({ path: "user", model: User })
      .lean();

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        users: JSON.parse(JSON.stringify(users)),
        orders: JSON.parse(JSON.stringify(orders)),
        products: JSON.parse(JSON.stringify(products)),
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
