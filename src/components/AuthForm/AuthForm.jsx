import { useState } from "react";
import { registerUser, loginUser } from "../../services/auth";
import "./AuthForm.css";

export function AuthForm({ onAuthSuccess, onPlayAsGuest }) {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        // TODO 1: call registerUser, then switch mode to "login"
        // so they log in with the account they just made
        await registerUser(username,email,password);
        setMode("register");
        
      } else {
        // TODO 2: call loginUser, which returns { token, user }.
        // Call onAuthSuccess(user, token) with that result.
        const result = await loginUser(email,password);
        onAuthSuccess(result.user,result.token)

        
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="category-title" >HangMan</h1>
    <div className="auth-form">
      <h2>{mode === "login" ? "Log In" : "Create Account"}</h2>

      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "..." : mode === "login" ? "Log In" : "Create Account"}
        </button>
      </form>

      <button
        className="auth-switch"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setError("");
        }}
      >
        {mode === "login" ? "Need an account? Register" : "Already have an account? Log in"}
      </button>

      <button className="auth-guest" onClick={onPlayAsGuest}>
        Play as guest
      </button>
    </div>
    </div>
  );
}