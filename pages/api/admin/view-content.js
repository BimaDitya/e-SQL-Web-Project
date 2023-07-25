import prisma from "@/lib/prisma";

export default async function ViewContent(req, res) {
	if (req.method !== "GET")
		return res.status(405).end("Method Tidak Diizinkan");
	try {
		const viewContent = await prisma.content.findMany({
			include: {
				Material: {
					select: {
						Title: true,
					},
				},
			},
		});
		res.status(201).json({
			message: "Berhasil Menampilkan Konten",
			viewContent,
		});
	} catch (error) {
		res.status(500).json({
			message: `Gagal Menampilkan Konten`,
			error,
		});
	}
}
