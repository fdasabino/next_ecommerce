import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import { useRouter } from "next/router";
import React from "react";

const AdminCategories = () => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];

  return <AdminLayout path={path}>AdminCategories</AdminLayout>;
};

export default AdminCategories;
