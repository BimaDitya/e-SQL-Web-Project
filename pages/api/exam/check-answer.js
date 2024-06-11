import TokenizeThis from "tokenize-this";

export default async function HandleCheck(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, answer } = req.body;

  const Tokenizer = new TokenizeThis();

  const userAnswer = [];
  if (code) {
    Tokenizer.tokenize(code, function (codes) {
      userAnswer.push(codes);
    });
  }
  const correctAnswer = [];
  if (answer) {
    Tokenizer.tokenize(answer, function (answers) {
      correctAnswer.push(answers);
    });
  }
  const isCorrect =
    JSON.stringify(userAnswer).toLowerCase() ===
    JSON.stringify(correctAnswer).toLowerCase();

  const title = isCorrect ? "Jawaban Benar ✔️" : "Jawaban Salah ❌";
  const status = isCorrect ? "TRUE" : "FALSE";
  const description = isCorrect
    ? "Silahkan Submit Jawaban Anda"
    : "Periksa Kembali Jawaban Anda";

  try {
    res.status(200).json({ title, status, description });
  } catch (error) {
    res.status(500).json({
      message: "Gagal Menjalankan Perintah",
    });
  }
}
