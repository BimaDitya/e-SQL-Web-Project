import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function HandleAddScore(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const auth = await authorization(req, res);
  const { exercise } = req.query;
  const { score } = req.body;
  const authId = auth.id;
  try {
    const submitScore = await prisma.score.update({
      where: {
        FK_Account: authId,
        Exercise: exercise + ` User ${auth.id}`,
      },
      data: {
        Exercise: exercise + ` User ${auth.id}`,
        FK_Account: authId,
        Score: score,
      },
    });
    res.status(201).json({
      message: "Berhasil Mengirim Jawaban",
      submitScore,
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
