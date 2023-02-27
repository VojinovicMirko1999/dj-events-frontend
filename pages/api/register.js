/* eslint-disable import/no-anonymous-default-export */
import { API_URL } from "@/config/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { user } = req.body;
    const { username, password, email } = user;
    const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await strapiRes.json();

    console.log({ username, email, password });
    console.log(data.error);

    if (strapiRes.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // a week,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ user: data.user });
    } else {
      res.status(data.error.status).json({ message: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
