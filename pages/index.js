import Hero from "/components/Hero/Hero";
import SearchBar from "/components/SearchBar/SearchBar";

import connectToDatabase from "/lib/connectToDatabase";

export default function HomePage({ categories }) {
  return (
    <>
      <Hero categories={categories} />
      <SearchBar />
    </>
  );
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
  const categories = await db
    .collection("categories")
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return categories;
}
