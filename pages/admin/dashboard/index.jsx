import AdminCard from "@/components/Admin/AdminCard/AdminCard";
import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import styles from "@/styles/pages/AdminDashboard.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
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

  return (
    <AdminLayout path={path} user={user}>
      <div className={styles.admin_dashboard}>
        <div className={styles.cards}>
          <AdminCard icon={<GiTakeMyMoney />} title="Total earnings" count={formattedEarnings} />
          <AdminCard icon={<ImUsers />} title="Users" count={users.length} />
          <AdminCard icon={<SlHandbag />} title="Orders" count={orders.length} />
          <AdminCard icon={<FaThList />} title="Products" count={products.length} />
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
    const users = await User.find({}).lean();
    const orders = await Order.find().populate({ path: "user", model: User }).lean();
    const products = await Product.find({}).lean();
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
