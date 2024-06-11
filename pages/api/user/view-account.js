import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function ViewAccount(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const auth = await authorization(req, res);

  try {
    const viewProfile = await prisma.account.findUnique({
      where: {
        Email: auth.email,
      },
      include: {
        Profile: true,
        Score: true,
      },
    });
    res.status(200);
    res.json({
      data: viewProfile,
    });
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }
}
