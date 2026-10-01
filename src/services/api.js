export async function recordGameResult(token,{category, word, won, wrongGuesses}) {
  try {
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}`},
      body: JSON.stringify({
        category,
        word,
        won,
        wrongGuesses,
      }),
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to record stats:", err);
    return null;
  }
}

export async function fetchStats(token){
  try{
    const res = await fetch("/api/stats",{
      method:"GET",
      headers:{ Authorization: `Bearer ${token}` },
      
    });
    return await res.json();

  }catch(err){
    console.error("Failed to fetch the stats:",err);
    return null;
  }
}