"use client";

export const dynamic = "force-dynamic";

import { useState, useContext } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/AuthContext";
import { loginUser } from "./services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      auth?.login(res.data.token);
      alert("🎉 Login successful! Redirecting...");
      router.replace("/dashboard");
    } catch (_error) {
      alert("❌ Login failed. Check your credentials.");
      console.error(_error);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/login-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(60%)",
          zIndex: -1,
        }}
      />

      {/* Login Box */}
      <Paper
        elevation={5}
        sx={{
          padding: "40px",
          maxWidth: "400px",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary">
          SmartSched
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: "20px", fontStyle: "italic" }}>
          &quot;Schedule interviews effortlessly with SmartSched.&quot;
        </Typography>
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ marginTop: "10px" }}>
          Login
        </Button>
        <Button fullWidth href="/register" sx={{ marginTop: "10px", textTransform: "none" }}>
          New User? Register
        </Button>
      </Paper>
    </Box>
  );
}
