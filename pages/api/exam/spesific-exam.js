import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function HandleViewExams(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const { slug } = req.query;

  const auth = await authorization(req, res);

  try {
    const viewExams = await prisma.exams.findUnique({
      where: {
        Slug: slug,
      },
    });
    res.status(201).json({
      message: "Berhasil Memuat Soal Tes",
      viewExams,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal Memuat Soal Tes",
      error,
    });
  } finally {
    await prisma.$disconnect();
  }
}
