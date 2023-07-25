import prisma from "@/lib/prisma";

export default async function ViewMaterial(req, res) {
	if (req.method !== "GET")
		return res.status(405).end("Method Tidak Diizinkan");
	const queryMaterial = req.query.queryMaterial;

	// try {
	const viewMaterial = await prisma.material.findUnique({
		where: {
			Slug: queryMaterial,
		},
		include: {
			_count: { select: { Content: true } },
			Content: true,
			Progress: true,
			Exercise: true,
		},
	});
	res.status(200).json({
		message: "Berhasil Menampilkan Materi",
		viewMaterial,
	});
	// } catch (error) {
	// 	res.status(500).json({
	// 		message: `Gagal Menampilkan Materi`,
	// 		error,
	// 	});
	// }
}
