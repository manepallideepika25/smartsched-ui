"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { registerUser } from "../services/authService";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await registerUser({ name, email, password });
      alert("Registration Successful! Please log in.");
      router.push("/");
    } catch (error) {
      alert("Error registering user");
      console.error(error)
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Register</Typography>
      <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
      <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
      <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
      <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
      <Button href="/">Already have an account? Login</Button>
    </Container>
  );
}
