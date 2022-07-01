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
  const categorySlug = query.category;
  const brandSlug = query.brand;
  try {
    const products = await getSearchResults(term, categorySlug, brandSlug);
    return {
      props: {
        query: term,
        products: products,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

async function getSearchResults(
  term = "",
  categorySlug = null,
  brandSlug = null
) {
  const { db } = await connectToDatabase();

  let options = {
    name: { $regex: term, $options: "i" },
  };

  if (categorySlug) {
    const category = await db
      .collection("categories")
      .findOne({ slug: categorySlug });
    if (category) {
      options.categoryId = category._id.toString();
    } else {
      throw "category not found";
    }
  }

  if (brandSlug) {
    const brand = await db
      .collection("brands")
      .findOne({ slug: brandSlug });
    if (brand) {
      options["brand.id"] = brand._id.toString();
    } else {
      throw "brand not found";
    }
  }

  console.log("sdfdsfdsf")
  console.log("sdfdsfdsf")
  console.log("sdfdsfdsf")
  console.log("sdfdsfdsf")
  console.log(options);

  const results = await db.collection("products").find(options).toArray();
  return JSON.parse(JSON.stringify(results));
}
