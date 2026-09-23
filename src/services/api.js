export async function recordGameResult(won) {
  try {
    const res = await fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ won }),
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to record stats:", err);
    return null;
  }
}