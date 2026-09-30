import bcrypt from "bcryptjs";
import { getSql } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

    

  const { username, email, password } = req.body;

  if (!username || !email || !password || password.length < 8) {
    return res.status(400).json({ error: "Username, email and a password of 8+ characters are required" });
  }

    try {
    const sql = getSql();
    const passwordHash = await bcrypt.hash(password, 10);

    const rows = await sql`
      INSERT INTO users (username, email, password_hash)
      VALUES (${username}, ${email}, ${passwordHash})
      RETURNING id, username, email
    `;

    return res.status(201).json(rows[0]);
  
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Username or email already in use" });
    }
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}