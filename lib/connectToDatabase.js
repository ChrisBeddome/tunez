import clientPromise from "/lib/mongodb";

export default async function connectToDatabase(dbName = process.env.MONGODB_DB) {
  const connection = await clientPromise
  const db = connection.db(dbName);
  return {
    db,
    connection
  };
}

