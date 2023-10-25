import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function ViewStatus(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const auth = await authorization(req, res);
  const queryContent = req.query.queryContent;
  const properQuery = queryContent
    .replace(/-/g, " ")
    .replace(/(^|\s)([a-z])/g, (match) => match.toUpperCase());

  const viewStatus = await prisma.account.findUnique({
    where: {
      Id: auth.id,
    },
    include: {
      Progress: {
        where: {
          Slug: `${properQuery} User ${auth.id}`,
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
