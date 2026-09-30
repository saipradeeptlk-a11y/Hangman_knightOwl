import { getSql } from "./_db.js";
import { getUserId } from "./auth.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
    

  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    const sql = getSql();
    // TODO 1: select just the "won" column for this user's games, newest first
    const rows = await sql`SELECT won FROM games WHERE user_id = ${userId} ORDER BY played_at DESC  `

    const gamesPlayed = rows.length;
     
    
    // TODO 2: count how many rows have won === true
    const wins = (rows .filter((item)=> 
      item.won === true
    )).length;

    const losses = gamesPlayed - wins;
    const winRate = gamesPlayed === 0 ? 0 : Math.round((wins / gamesPlayed) * 100);

    // TODO 3: current streak = wins in a row starting from the newest game,
    // stopping at the first loss
    let currentStreak = 0;
    for(let i =0 ; i < rows.length ; i++){
       if(rows[i].won === true){
        currentStreak = currentStreak +1;

       }
       if(rows[i].won === false){
        break;
       }


    }
    

    // TODO 4: best streak = the longest run of wins anywhere in the list
    let bestStreak = 0;
    let counter = 0;
    for(let i =0 ; i < rows.length ; i++){
        if(rows[i].won === true){
        counter = counter +1;
        
        }
        if(rows[i].won === false){
          if(bestStreak < counter ){
            bestStreak = counter;
          }
          counter = 0;
        }
    }
    if(bestStreak < counter ){
            bestStreak = counter;
          }
    

    return res.status(200).json({
      gamesPlayed,
      wins,
      losses,
      winRate,
      currentStreak,
      bestStreak,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}