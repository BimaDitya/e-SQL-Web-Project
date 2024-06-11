import prisma from "@/lib/prisma";

export default async function HandleViewExams(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const viewExams = await prisma.exams.findMany({});
    res.status(201).json({
      message: "Berhasil Memuat Tes",
      viewExams,
    });
    await prisma.$disconnect();
  } catch (error) {
    res.status(500).json({
      message: "Gagal Memuat Tes",
      error,
    });
    await prisma.$disconnect();
  }
}
