import prisma from "@/lib/prisma";

export default async function DeleteContent(req, res) {
  if (req.method !== "DELETE")
    return res.status(405).end("Method Tidak Diizinkan");
  const { slug } = req.query;

  try {
    const deleteExercise = await prisma.exercise.delete({
      where: {
        Slug: slug,
      },
    });
    res.status(201).json({
      message: "Berhasil Menghapus Latihan",
      deleteExercise,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Menghapus Latihan`,
      error,
    });
  }
}
