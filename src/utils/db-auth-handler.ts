import clientPromise from "./mongodb";

export const findUserByEmail = async (email: string) => {
  return (await getDbCollection()).findOne({ email });
};

export const getDbCollection = async () => {
  const client = await clientPromise;
  return await client
    .db(String(process.env.MONGODB_DB_NAME))
    .collection(String(process.env.MONGODB_USERS_COLLECTION_NAME));
};
