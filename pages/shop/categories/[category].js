import Link from "next/link";
import Image from "next/image";
import connectToDatabase from "/lib/connectToDatabase";

export default function CategoryPage({ category, products }) {
  return (
    <div>
      <h1>{category.name}</h1>
      <Link href="/">
        <a href="">
          Back to Home
          <span className="material-symbols-outlined">arrow_back</span>
        </a>
      </Link>
      {products.map((product) => {
        return (
          <ul key={product._id} style={{ marginTop: "50px" }}>
            <li>{product.name}</li>
            <li>{product.brand}</li>
            <li>{product.price}</li>
            <li>{product.stock}</li>
            <li>
              <Link href={`/shop/products/${product._id}`}>
                <a>
                  {" "}
                  <Image
                    src={product.imageUrl}
                    width={100}
                    height={100}
                  ></Image>
                </a>
              </Link>
            </li>
            <li>{product.description}</li>
          </ul>
        );
      })}
    </div>
  );
}

export async function getStaticProps(context) {
  const category = await getCategoryData(context.params.category);
  const products = await getCategoryProducts(category._id);
  return {
    props: {
      category,
      products,
    },
  };
}

export async function getStaticPaths() {
  const slugs = await getCategorySlugs();
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          category: slug,
        },
      };
    }),
    fallback: true,
  };
}

async function getCategorySlugs() {
  const { db } = await connectToDatabase();
  const categories = await db
    .collection("categories")
    .find({}, { projection: { _id: 0, slug: 1 } })
    .toArray();
  return categories.map((cat) => cat.slug);
}

async function getCategoryData(slug) {
  const { db } = await connectToDatabase();
  const category = await db.collection("categories").findOne({ slug });
  return JSON.parse(JSON.stringify(category));
}

async function getCategoryProducts(categoryId) {
  const { db } = await connectToDatabase();
  const products = await db
    .collection("products")
    .find({ categoryId })
    .toArray();
  return JSON.parse(JSON.stringify(products));
}
