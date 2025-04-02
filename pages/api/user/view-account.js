import prisma from '@/lib/prisma'
import authorization from '@/middleware/authorization'

export default async function ViewAccount(req, res) {
    if (req.method !== 'GET') return res.status(405).end()
    const auth = await authorization(req, res)
    const accountEmail = auth.email

    try {
        const viewProfile = await prisma.account.findUnique({
            where: {
                Email: accountEmail,
            },
            include: {
                Profile: true,
                Score: true,
            },
        })
        return res.status(200).json({
            data: viewProfile,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Internal Server Error',
        })
    } finally {
        await prisma.$disconnect()
    }
}
