import TokenizeThis from "tokenize-this";

export default async function HandlePlayground(req, res) {
	if (req.method !== "POST") return res.status(405).end();
	const { code, answer } = req.body;

	var tokenizer = new TokenizeThis();

	const userCode = [];
	tokenizer.tokenize(code, function (codes) {
		userCode.push(codes);
	});
	const answerKey = [];
	tokenizer.tokenize(answer, function (answers) {
		answerKey.push(answers);
	});

	const isAnswerCorrect =
		JSON.stringify(answerKey).toLowerCase() ===
		JSON.stringify(userCode).toLowerCase();
	const message = isAnswerCorrect ? "Jawaban Benar 🎉" : "Jawaban Salah 😪";
	const condition = isAnswerCorrect ? "TRUE" : "FALSE";
	const description = isAnswerCorrect
		? "Silahkan Submit Jawaban Anda"
		: "Periksa Kembali Jawaban Anda";

	try {
		res.json({ message, condition, description });
	} catch (error) {
		res.json({ message: "Gagal Menjalankan Perintah", error });
	}
}
