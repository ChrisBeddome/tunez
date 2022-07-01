import Link from "next/link";
import Image from "next/image";

import connectToDatabase from "/lib/connectToDatabase";

export default function SearchResultsPage({ query, products }) {
  return (
    <div>
      <h1>
        Search results for <strong>{query}</strong>
      </h1>
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
            <li>{product.brand.name}</li>
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

export async function getServerSideProps({ query }) {
  const term = query.term || "";
  const products = await getSearchResults(term);
  return {
    props: {
      query: term,
      products: products,
    },
  };
}

async function getSearchResults(term) {
  const { db } = await connectToDatabase();
  const results =  await db
    .collection("products")
    .find({ name: { $regex: term, $options: "i" } })
    .toArray();
  return JSON.parse(JSON.stringify(results));
}
