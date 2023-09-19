import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function ViewProgressAF(req, res) {
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
          FK_Material: 5,
        },
      },
      _count: {
        select: {
          Progress: {
            where: {
              FK_Material: 5,
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
}
