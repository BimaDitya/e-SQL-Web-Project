import cookie from "cookie";
export default async function HandleLogout(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      maxAge: -1,
      path: "/",
    }),
  );
  res.status(200);
  res.json({
    message: "Logout Berhasil",
  });
  await prisma.$disconnect();
}
