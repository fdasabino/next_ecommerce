import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import User from "@/models/User";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const AdminUsers = ({ user }) => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];

  return (
    <AdminLayout path={path} user={user}>
      AdminUsers
    </AdminLayout>
  );
};

export default AdminUsers;

// server side code
export async function getServerSideProps(context) {
  await db.connectDB();
  const session = await getSession(context);
  try {
    const user = await User.findOne({ _id: session.user._id }).lean();
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
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
