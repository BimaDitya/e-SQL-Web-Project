import prisma from "@/lib/prisma";

export default async function UpdateMaterial(req, res) {
  if (req.method !== "PATCH") return res.status(405).end();

  const { title, slug, desc } = req.body;
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
    const updateMaterial = await prisma.material.update({
      where: {
        Slug: params,
      },
      data: {
        Title: title,
        Slug: slug,
        Desc: desc,
      },
    });
    res.status(201).json({
      message: "Berhasil Memperbarui Materi",
      updateMaterial,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Memperbarui Materi`,
      content: capitalizeText(slug),
      error,
    });
  }
}
