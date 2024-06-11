import prisma from "@/lib/prisma";

export default async function ViewContent(req, res) {
  if (req.method !== "GET")
    return res.status(405).end("Method Tidak Diizinkan");
  const { params } = req.query;

  try {
    const viewContent = await prisma.content.findMany({
      where: {
        Slug: params,
      },
    });
    res.json({
      message: "Berhasil Menampilkan Materi",
      viewContent,
    });
    await prisma.$disconnect();
  } catch (error) {
    res.json({
      message: `Gagal Menampilkan Materi`,
      error,
    });
    await prisma.$disconnect();
  }
}
