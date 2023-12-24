import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function HandleExamination(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const auth = await authorization(req, res);
  const { test, slug, status, answer } = req.body;

  function proper(text) {
    if (text && text.length > 0) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    } else {
      return text;
    }
  }
  const properTest = proper(test);

  try {
    const submit = await prisma.results.create({
      data: {
        Slug: `${test}-${slug}-${auth.id}`,
        FK_Account: auth.id,
        Test: properTest,
        Complete: status,
        Answer: answer,
      },
    });
    res.status(200).json({
      message: "Berhasil Mengirim Jawaban",
      submit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal Mengirim Jawaban",
      error,
    });
  } finally {
    await prisma.$disconnect();
  }
}
