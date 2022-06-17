import Hero from "/components/Hero/Hero";
import connectToDatabase from "/lib/connectToDatabase";

export default function HomePage({ categories }) {
  return <Hero categories={categories} />;
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
