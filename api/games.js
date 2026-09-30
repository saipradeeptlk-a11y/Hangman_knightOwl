import { getSql } from "./_db.js";
import { getUserId } from "./auth.js";

export default async function handler(req, res) {
  

  const userId = getUserId(req);
  if(!userId){
    return res.status(401).json({error:"Not logged in"});
  }

   const sql = getSql(); 

  
  if(req.method === "POST"){

  const { category, word, won, wrongGuesses } = req.body;
  if (
    !category ||
    !word ||
    typeof won !== "boolean" ||
    !Number.isInteger(wrongGuesses) ||
    wrongGuesses < 0 ||
    wrongGuesses > 6
  ) {
    return res.status(400).json({ error: "Invalid game data" });
  }

  try {
    const sql = getSql();
    
    const rows = await sql `INSERT INTO games (user_id,category,word,won,wrong_guesses) values (${userId},${category},${word},${won},${wrongGuesses}) RETURNING user_id, category, word, won, wrong_guesses ` 

    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
  if(req.method === "GET"){

    try{
    const sql = getSql();
    
    const userSpecificRows = await sql `SELECT  user_id ,category,word,won,wrong_guesses,played_at FROM games WHERE user_id = ${userId} ORDER BY played_at DESC LIMIT 20`;
    return res.status(200).json(userSpecificRows);

    }catch(err){
        console.error(err);
        return res.status(500).json({error : "Something went wrong"});

    }


  }

  
    
  return res.status(405).json({ error: "Method not allowed" });
  
}
