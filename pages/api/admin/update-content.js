import prisma from "@/lib/prisma";

export default async function UpdateContent(req, res) {
  if (req.method !== "PATCH") return res.status(405).end();

  const { title, slug, content, material } = req.body;
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
    const updateContent = await prisma.content.update({
      where: {
        Slug: params,
      },
      data: {
        Title: title,
        Slug: slug,
        Content: content,
        FK_Material: parseInt(material),
      },
    });
    res.status(201).json({
      message: "Berhasil Memperbarui Konten",
      updateContent,
    });
  } catch (error) {
    res.status(500).json({
      message: `Gagal Memperbarui Konten`,
      content: capitalizeText(slug),
      error,
    });
  }
}
