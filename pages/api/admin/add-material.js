import prisma from "@/lib/prisma";

export default async function AddMaterial(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, slug, desc } = req.body;

  function capitalizeText(text) {
    const words = text.split("-");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    );
    const result = capitalizedWords.join(" ");
    return result;
  }

  try {
    const addMaterial = await prisma.material.create({
      data: {
        Title: title,
        Slug: slug,
        Desc: desc,
      },
    });
    res.status(201).json({
      message: "Berhasil Menambahkan Materi",
      addMaterial,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Menambahkan Materi`,
      content: capitalizeText(slug),
      error,
    });
  }
}
