import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function ViewProgress(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const auth = await authorization(req, res);
  const { materialId } = req.query;

  const viewProgress = await prisma.account.findMany({
    where: {
      Id: auth.id,
    },
    include: {
      Progress: {
        where: {
          FK_Material: parseInt(materialId),
        },
      },
      _count: {
        select: {
          Progress: {
            where: {
              FK_Material: parseInt(materialId),
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
