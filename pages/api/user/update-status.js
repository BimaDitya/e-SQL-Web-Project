import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";

export default async function UpdateStatus(req, res) {
  if (req.method !== "PATCH") return res.status(405).end();
  const auth = await authorization(req, res);
  const queryMaterial = req.query.queryMaterial;
  const queryContent = req.query.queryContent;

  const updateStatus = await prisma.progress.create({
    data: {
      Slug: `${queryContent}-user-${auth.id}`,
      FK_Material: parseInt(queryMaterial),
      FK_Account: auth.id,
      Complete: "TRUE",
    },
  });
  res.status(200).json({
    message: "Update Progress Berhasil!",
    updateStatus,
  });
}
