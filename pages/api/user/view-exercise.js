import prisma from "@/lib/prisma";

export default async function HandleViewExercise(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const { queryMaterial, queryExercise } = req.query;

  try {
    const viewExercise = await prisma.material.findUnique({
      where: {
        Slug: queryMaterial,
      },
      include: {
        Exercise: {
          where: {
            Slug: queryExercise,
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
