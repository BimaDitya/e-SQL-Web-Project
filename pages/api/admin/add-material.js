import prisma from "@/lib/prisma";

export default async function AddMaterial(req, res) {
  if (req.method !== "POST")
    return res.status(405).end("Method Tidak Diizinkan");
  try {
    const { title, slug, desc } = req.body;
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
      error,
    });
  }
}
