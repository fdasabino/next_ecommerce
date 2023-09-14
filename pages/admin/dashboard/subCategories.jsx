import AdminLayout from "@/components/Admin/AdminLayout/AdminLayout";
import { useRouter } from "next/router";

const AdminSubCategories = () => {
  const router = useRouter();
  const { pathname } = router;
  const path = pathname.split("/admin/dashboard")[1];
  return <AdminLayout path={path}></AdminLayout>;
};

export default AdminSubCategories;
