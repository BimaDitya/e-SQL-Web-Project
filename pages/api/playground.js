import prisma from "@/lib/prisma";
import TokenizeThis from "tokenize-this";
import authorization from "@/middleware/authorization";

export default async function HandlePlayground(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const auth = await authorization(req, res);
  const { code, answer, trial } = req.body;
  const { exercise } = req.query;

  let Tokenizer = new TokenizeThis();

  const userCode = [];
  if (code) {
    Tokenizer.tokenize(code, function (codes) {
      userCode.push(codes);
    });
  }

  const answerKey = [];
  if (answer) {
    Tokenizer.tokenize(answer, function (answers) {
      answerKey.push(answers);
    });
  }
  const isCorrectAnswer =
    JSON.stringify(userCode).toLowerCase() ===
    JSON.stringify(answerKey).toLowerCase();
  const message = isCorrectAnswer ? "Jawaban Benar ✔️" : "Jawaban Salah ❌";
  const condition = isCorrectAnswer ? "TRUE" : "FALSE";
  const description = isCorrectAnswer
    ? "Silahkan Submit Jawaban Anda"
    : "Periksa Kembali Jawaban Anda";

  try {
    await prisma.score.upsert({
      where: {
        FK_Account: auth.id,
        Exercise: exercise + ` User ${auth.id}`,
      },
      update: {
        Trial: {
          increment: trial,
        },
      },
      create: {
        FK_Account: auth.id,
        Exercise: exercise + ` User ${auth.id}`,
        Trial: trial,
      },
    });
    res.status(200).json({ message, condition, description });
  } catch (error) {
    res.status(500).json({ message: "Gagal Menjalankan Perintah", error });
  } finally {
    await prisma.$disconnect();
  }
}
