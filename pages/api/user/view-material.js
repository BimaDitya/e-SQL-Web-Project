import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function ViewMaterial(req, res) {
  if (req.method !== "GET") return res.end("Method Tidak Diizinkan");
  const auth = await authorization(req, res);

  const viewMaterial = await prisma.material.findMany({
    include: {
      _count: { select: { Content: true } },
      Progress: {
        where: {
          FK_Account: auth.id,
        },
      },
      Content: true,
      Exercise: true,
    },
  });
  res.status(200).json({
    message: "Berhasil Menampilkan Materi",
    viewMaterial,
  });
}
