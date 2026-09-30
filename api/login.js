import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getSql } from "./_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

    

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const sql = getSql();
    
    const rows = await sql`SELECT id ,username , email , password_hash FROM users WHERE email = ${email}`;
    const user = rows[0];

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
        }

   
    const passwordMatches = await bcrypt.compare(password,user.password_hash);

    if (!user || !passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    
    const token =jwt.sign(
        {
            userId: user.id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
    )

    return res.status(200).json({
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}