import NewProductForm from "/components/products/NewProductForm";

export default function NewProductPage() {
  return (
    <NewProductForm />
  );
}

import AdminLayout from "/components/layouts/Admin";
NewProductPage.getLayout = () => AdminLayout;