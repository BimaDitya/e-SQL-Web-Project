import prisma from "@/lib/prisma";

export default async function HandleViewMaterial(req, res) {
  if (req.method !== "GET")
    return res.status(405).end("Method Tidak Diizinkan");
  try {
    const viewMaterial = await prisma.material.findMany({
      include: {
        _count: { select: { Content: true } },
        Content: true,
      },
    });
    res.status(201).json({
      message: "Berhasil Menampilkan Materi",
      viewMaterial,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Menampilkan Materi`,
      error,
    });
  }
}
