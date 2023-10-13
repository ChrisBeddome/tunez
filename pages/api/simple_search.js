import connectToDatabase from "/lib/connectToDatabase";

export default async function handler(req, res) {
  const { query } = req.query;
  const results = await getSearchResults(query);
  res.end(JSON.stringify({ results }));
}

async function getSearchResults(query) {
  const { db } = query && (await connectToDatabase());
  return {
    products: query
      ? (await searchProducts(query, db)).map(serializeProduct)
      : [],
    categories: query
      ? (await searchCategories(query, db)).map(serializeCategory)
      : [],
    brands: query
      ? (await searchBrands(query, db)).map(serializeBrand)
      : [],
  };
}

async function searchProducts(query, db) {
  return await db
    .collection("products")
    .find({ name: { $regex: query, $options: "i" } })
    .limit(10)
    .toArray();
}

async function searchCategories(query, db) {
  return await db
    .collection("categories")
    .find({ name: { $regex: query, $options: "i" } })
    .limit(5)
    .toArray();
}
async function searchBrands(query, db) {
  return await db
    .collection("brands")
    .find({ name: { $regex: query, $options: "i" } })
    .limit(5)
    .toArray();
}

function serializeProduct(product) {
  return {
    _id: product._id,
    name: product.name,
    thumbnailUrl: product.thumbnailUrl,
    link: `/shop/products/${product._id}`,
  };
}

function serializeCategory(category) {
  return {
    _id: category._id,
    name: category.name,
    thumbnailUrl: category.iconUrl,
    link: `/shop/search?category=${category.slug}`,
  };
}

function serializeBrand(brand) {
  return {
    _id: brand._id,
    name: brand.name,
    thumbnailUrl: brand.thumbnailUrl,
    link: `/shop/search?brand=${brand.slug}`,
  };
}