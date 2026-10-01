import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // On first load, restore any saved session from localStorage
  useEffect(() => {
    // TODO 1: read "authUser" and "authToken" from localStorage.
    // If both exist, JSON.parse the user and call setUser/setToken.
    const authUser = localStorage.getItem("authUser");
    const authToken = localStorage.getItem("authToken");
    if(authUser && authToken){
        setUser(JSON.parse(authUser));
        setToken((authToken));
    }
    
    
  }, []);

  function login(userData, tokenValue) {
    setUser(userData);
    setToken(tokenValue);
    // TODO 2: save both to localStorage. Remember localStorage only
    // stores strings, so the user object needs JSON.stringify.
    localStorage.setItem("authUser",JSON.stringify(userData));
    localStorage.setItem("authToken",(tokenValue));
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken")
    
  }

  return { user, token, login, logout };
}