let stats = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  currentStreak: 0,
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { won } = req.body;

    stats.gamesPlayed += 1;
    if (won) {
      stats.wins += 1;
      stats.currentStreak += 1;
    } else {
      stats.losses += 1;
      stats.currentStreak = 0;
    }

    return res.status(200).json(stats);
  }

  if (req.method === "GET") {
    return res.status(200).json(stats);
  }

  res.status(405).json({ error: "Method not allowed" });
}