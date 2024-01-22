import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function HandleViewScore(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const auth = await authorization(req, res);
  const { exercise } = req.query;
  const authId = auth.id;

  try {
    const submitScore = await prisma.score.findMany({
      where: {
        FK_Account: authId,
        Exercise: exercise + ` User ${auth.id}`,
      },
    });
    const sumScore = await prisma.score.aggregate({
      where: {
        FK_Account: authId,
      },
      _sum: {
        Score: true,
      },
    });
    res.status(201).json({
      message: "Berhasil Mengirim Jawaban",
      submitScore,
      sumScore,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Mengirim Jawaban`,
      error,
    });
  } finally {
    await prisma.$disconnect();
  }
}
