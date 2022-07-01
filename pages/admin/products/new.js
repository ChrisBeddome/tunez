import NewProductForm from "/components/products/NewProductForm";
import connectToDatabase from "/lib/connectToDatabase";

export default function NewProductPage({ categories }) {
  return <NewProductForm categories={categories} />;
}

export async function getStaticProps() {
  return {
    props: {
      categories: await getCategories(),
    },
  };
}

async function getCategories() {
  const { db } = await connectToDatabase();
  const categories = await db.collection("categories").find().toArray();
  return JSON.parse(JSON.stringify(categories));
}

import AdminLayout from "/components/layouts/Admin";
NewProductPage.getLayout = () => AdminLayout;
