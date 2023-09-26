import prisma from "@/lib/prisma";
import authorization from "@/middleware/authorization";
export default async function UpdateProfile(req, res) {
  if (req.method !== "PATCH") return res.status(405).end();

  const auth = await authorization(req, res);
  const authId = auth.id;

  const { firstName, lastName, school } = req.body;
  const updateProfile = await prisma.profile.upsert({
    where: {
      FK_Account: authId
    },
    update: {
      FirstName: firstName,
      LastName: lastName,
      School: school,
    },
    create: {
      FK_Account: authId,
      FirstName: firstName,
      LastName: lastName,
      School: school,
    },
  });
  res.status(200);
  res.json({
    data: updateProfile,
    verify: authId,
  });
}
