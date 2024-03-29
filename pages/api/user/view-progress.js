import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function ViewProgressAll(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const auth = await authorization(req, res);

  const viewProgress = await prisma.account.findMany({
    where: {
      Id: auth.id,
    },
    include: {
      Progress: {
        where: {
          FK_Account: auth.id,
        },
      },
      _count: {
        select: {
          Progress: {
            where: {
              Complete: {
                equals: "TRUE",
              },
            },
          },
        },
      },
    },
  });
  res.status(200).json({
    viewProgress,
  });
  await prisma.$disconnect();
}
