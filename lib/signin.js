import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

async function checkCredentials({ username, password }) {
  if (username == password) {
    return {
      name: username,
      id: 1,
      type: "normal",
    };
  }

  const client = await clientPromise;
  const db = client.db("csci3180");
  const existingUser = await db
    .collection("user")
    .findOne({ username: username });
  if (!existingUser) {
    return null;
  }

  const hashedPassword = await hash(password, 8);

  if (hashedPassword === existingUser.password) {
    return {
      name: username,
      id: 1,
      type: "normal",
    };
  } else {
    return null;
  }
}

export default checkCredentials;
