import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function HandleRegistration(req, res) {
	if (req.method !== "POST") return res.status(405).end();

	const { email, password } = req.body;
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	try {
		const registration = await prisma.account.create({
			data: {
				Email: email.toLowerCase(),
				Password: hash,
			},
		});
		res.status(201);
		res.json({
			Message: "Registrasi Akun Berhasil",
			registration,
		});
	} catch (error) {
		res.status(401);
		res.json({
			Message: `Email ${email.toUpperCase()} Telah Terdaftar`,
			error,
		});
	}
}
