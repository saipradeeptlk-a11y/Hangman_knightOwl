
import jwt from "jsonwebtoken";

export function getUserId(req) {
  const header = req.headers.authorization;
  console.log("DEBUG header received:", header);

  if (!header || !header.startsWith("Bearer ")) {
    return null;
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload.userId;
  } catch (err) {
    console.log("DEBUG jwt.verify failed:", err.message);
    return null;
  }
}
