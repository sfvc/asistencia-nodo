// lib/auth.ts
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export function getUserFromToken(): DecodedToken | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token) as DecodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
