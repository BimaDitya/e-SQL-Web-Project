import prisma from "@/lib/prisma";

export default async function AddContent(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { material, question, answer, score, title, slug } = req.body;

  function capitalizeText(text) {
    const words = text.split("-");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    );
    const result = capitalizedWords.join(" ");
    return result;
  }

  try {
    const addExercise = await prisma.exercise.create({
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
      message: "Berhasil Menambahkan Latihan",
      addExercise,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Menambahkan Latihan`,
      content: capitalizeText(slug),
      error,
    });
  }
}
