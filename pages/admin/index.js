import Link from "next/link";

export default function AdminPage() {
  return (
    <Link href="/admin/products/new"><a>Add product</a></Link>
  );
}

import AdminLayout from "/components/layouts/Admin";
AdminPage.getLayout = () => AdminLayout;