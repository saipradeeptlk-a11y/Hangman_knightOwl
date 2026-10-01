export async function registerUser(username, email, password) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  return data;
}

export async function loginUser(email, password) {
  // TODO 1: same shape as registerUser, but POST to /api/login
  // with { email, password }
  const response = await fetch("/api/login",{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({email,password})
  })

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.error || "login failed");
  }
  
  return data;
  
}