import Image from "next/image";
import { ObjectId } from "mongodb";
import connectToDatabase from "/lib/connectToDatabase";

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <ul>
        <li>{product.brand}</li>
        <li>{product.price}</li>
        <li>{product.stock}</li>
        <li>
          <Image src={product.imageUrl} width={100} height={100}></Image>
        </li>
        <li>{product.description}</li>
      </ul>
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const id = ObjectId(context.params.id);
    const product = await getProductData(id);
    return {
      props: {
        product,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const ids = await getProductIds();
  return {
    paths: ids.map((id) => {
      return {
        params: {
          id,
        },
      };
    }),
    fallback: "blocking",
  };
}

async function getProductIds() {
  const { db } = await connectToDatabase();
  const products = await db
    .collection("products")
    .find({}, { projection: { _id: 1 } })
    .toArray();
  return JSON.parse(JSON.stringify(products.map((product) => product._id)));
}

async function getProductData(id) {
  const { db } = await connectToDatabase();
  const product = await db
    .collection("products")
    .findOne({ _id: id }, { projection: { _id: 0 } });
  if (product) {
    return product;
  } else {
    throw "Product not found"
  }
}
