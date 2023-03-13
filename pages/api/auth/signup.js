import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { username, password } = data;

  /*
  if (password.trim().length < 7) {
    res.status(422).json({
      message:
        'Invalid input - password should be at least 7 characters long.',
    });
    return;
  }
  */

  const client = await clientPromise;
  const db = client.db("csci3180");
  const existingUser = await db
    .collection("user")
    .findOne({ username: username });

  if (existingUser) {
    res
      .status(200)
      .json({ user: null, message: `User "${username}" exists already!` });
    return;
  }

  const hashedPassword = await hash(password, 8);

  db.collection("user").insertOne({
    username: username,
    password: hashedPassword,
  });

  res.status(201).json({ user: username, message: "Created user!" });
}

export default handler;
