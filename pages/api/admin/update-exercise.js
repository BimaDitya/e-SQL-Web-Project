import prisma from "@/lib/prisma";

export default async function UpdateContent(req, res) {
  if (req.method !== "PATCH") return res.status(405).end();

  const { question, material, answer, score, title, slug } = req.body;
  const { params } = req.query;

  function capitalizeText(text) {
    const words = text.split("-");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    );
    const result = capitalizedWords.join(" ");
    return result;
  }

  try {
    const updateExercise = await prisma.exercise.update({
      where: {
        Slug: params,
      },
      data: {
        FK_Material: parseInt(material),
        Score: parseFloat(score),
        Question: question,
        Answer: answer,
        Title: title,
        Slug: slug,
      },
    });
    res.status(201).json({
      message: "Berhasil Memperbarui Latihan",
      updateExercise,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Memperbarui Latihan`,
      content: capitalizeText(slug),
      error,
    });
  }
}
