import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function UpdateStatus(req, res) {
  if (req.method !== "PATCH") return res.status(405).end();
  const auth = await authorization(req, res);
  const queryMaterial = req.query.queryMaterial;
  const queryContent = req.query.queryContent;
  const properQuery = queryContent
    .replace(/-/g, " ")
    .replace(/(^|\s)([a-z])/g, (match) => match.toUpperCase());

  const studyStart = new Date(req.body.studyStart).toISOString();
  const studyEnd = new Date(req.body.studyEnd).toISOString();

  const updateStatus = await prisma.progress.create({
    data: {
      Slug: `${properQuery} User ${auth.id}`,
      FK_Material: parseInt(queryMaterial),
      Start_Time: studyStart,
      End_Time: studyEnd,
      FK_Account: auth.id,
      Complete: "TRUE",
    },
  });
  res.status(200).json({
    message: "Update Progress Berhasil!",
    updateStatus,
  });
}
