import connectToDatabase from "/lib/connectToDatabase";

export default async function handler(req, res) {
  const { query } = req.query;
  let results;

  if (query) {
    const { db } = await connectToDatabase();
    results = {
      products: (
        await db
          .collection("products")
          .find({ name: { $regex: query, $options: "i" } })
          .limit(10)
          .toArray()
      ).map((product) => {
        return {
          _id: product._id,
          name: product.name,
          thumbnailUrl: product.imageUrl,
          link: `/shop/products/${product._id}`
        };
      }),
      categories: (
        await db
          .collection("categories")
          .find({ name: { $regex: query, $options: "i" } })
          .limit(5)
          .toArray()
      ).map((category) => {
        return {
          _id: category._id,
          name: category.name,
          thumbnailUrl: category.iconUrl,
          link: `/shop/categories/${category.slug}`
        };
      }),
    };
  } else {
    results = {
      products: [],
      categories: [],
    };
  }

  res.end(JSON.stringify({ results }));
}
