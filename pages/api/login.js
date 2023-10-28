import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async function HandleLogin(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body;

  // Check Account
  const accounts = await prisma.account.findUnique({
    where: {
      Email: email,
    },
  });
  if (!accounts)
    return res.status(401).end(`Email ${email.toUpperCase()} Tidak Terdaftar`);

  // Verify Password
  const verify = await bcrypt.compare(password, accounts.Password);
  if (!verify) return res.status(401).end("Kata Sandi Yang Dimasukkan Salah");

  const token = jwt.sign(
    {
      id: accounts.Id,
      email: accounts.Email,
      role: accounts.Role,
    },
    // Secret Key
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      maxAge: 60 * 60 * 24,
      path: "/",
    }),
  );
  res.status(200).json({
    email: accounts.Email,
    message: "Login Berhasil",
    token,
  });
}
