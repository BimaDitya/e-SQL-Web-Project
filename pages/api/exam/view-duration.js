import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function ViewResult(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const auth = await authorization(req, res);

  const { test } = req.query;

  function proper(text) {
    if (text && text.length > 0) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    } else {
      return text;
    }
  }

  const properTest = proper(test);
  try {
    const viewDurations = await prisma.durations.findFirst({
      where: {
        FK_Account: auth.id,
        Test: properTest,
      },
    });
    res.status(200).json({
      message: "Berhasil Mengambil Durasi",
      viewDurations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal Mengambil Durasi",
      error,
    });
  } finally {
    await prisma.$disconnect();
  }
}
