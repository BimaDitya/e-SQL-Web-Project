import prisma from "@/lib/prisma";

export default async function DeleteMaterial(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();
  const { params } = req.query;

  try {
    const deleteMaterial = await prisma.material.delete({
      where: {
        Id: parseInt(params),
      },
    });
    res.status(201).json({
      message: "Berhasil Menghapus Materi",
      deleteMaterial,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Menghapus Materi`,
      error,
    });
  }
}
