import prisma from "@/lib/prisma";

export default async function AddContent(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { title, slug, content, material } = req.body;

  function capitalizeText(text) {
    const words = text.split("-");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    );
    const result = capitalizedWords.join(" ");
    return result;
  }

  try {
    const addContent = await prisma.content.create({
      data: {
        Title: title,
        Slug: slug,
        Content: content,
        FK_Material: parseInt(material),
      },
    });
    res.status(201).json({
      message: "Berhasil Menambahkan Konten",
      addContent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal Menambahkan Konten",
      content: capitalizeText(slug),
      error,
    });
  }
}
