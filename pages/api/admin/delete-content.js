import prisma from "@/lib/prisma";

export default async function DeleteContent(req, res) {
  if (req.method !== "DELETE")
    return res.status(405).end("Method Tidak Diizinkan");
  const { slug } = req.query;

  try {
    const deleteMaterial = await prisma.content.delete({
      where: {
        Slug: slug,
      },
    });
    res.status(201).json({
      message: "Berhasil Menghapus Konten",
      deleteMaterial,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Menghapus Konten`,
      error,
    });
  }
}
