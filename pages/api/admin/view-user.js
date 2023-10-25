import prisma from "@/lib/prisma";
export default async function ViewUser(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const viewUser = await prisma.account.findMany({
    include: {
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
      Profile: true,
      Progress: {
        select: {
          Start_Time: true,
          End_Time: true,
          Complete: true,
          Material: true,
          Slug: true,
        },
      },
      Score: {
        select: {
          Exercise: true,
          Score: true,
          SubmittedAt: true,
          Trial: true,
        },
      },
    },
  });
  res.status(200);
  res.json({
    data: viewUser,
  });
}
