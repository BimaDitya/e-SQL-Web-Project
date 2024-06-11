import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function HandleTime(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const auth = await authorization(req, res);
  const { timer, test, start } = req.body;

  function proper(text) {
    if (text && text.length > 0) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    } else {
      return text;
    }
  }
  const end = new Date(req.body.end).toISOString();

  const properTest = proper(test);

  try {
    const times = await prisma.durations.create({
      data: {
        FK_Account: auth.id,
        Test: properTest,
        Start_Time: start,
        End_Time: end,
        Duration: timer,
      },
    });
    res.status(200).json({
      message: "Berhasil Mengumpulkan Tes",
      times,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal Mengumpulkan Tes",
      error,
    });
  } finally {
    await prisma.$disconnect();
  }
}
