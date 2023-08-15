import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function ViewStatus(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const auth = await authorization(req, res);
  const queryContent = req.query.queryContent;
  const queryMaterial = req.query.queryMaterial;

  const viewStatus = await prisma.material.findMany({
    where: {
      Slug: queryMaterial,
      AND: {
        Progress: {
          every: {
            FK_Account: auth.id,
          },
        },
      },
    },
    include: {
      Progress: {
        where: {
          Slug: queryContent,
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
    viewStatus,
  });
}
