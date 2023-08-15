import prisma from "@/lib/prisma";

export default async function HandleViewExercise(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  try {
    const viewExercise = await prisma.exercise.findMany({
      include: {
        Material: {
          select: {
            Title: true,
          },
        },
      },
    });
    res.status(201).json({
      message: "Berhasil Menampilkan Latihan Materi",
      viewExercise,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Menampilkan Latihan Materi`,
      error,
    });
  }
}
