import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function HandleAddScore(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const auth = await authorization(req, res);
  const { exercise } = req.query;
  const authId = auth.id;
  const score = req.body;

  try {
    const submitScore = await prisma.score.create({
      data: {
        FK_Account: authId,
        Exercise: exercise,
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
  }
}
