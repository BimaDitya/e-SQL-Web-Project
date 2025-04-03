import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';

export default async function authorization(req, res) {
    return await new Promise(resolve => {
        const { authorization } = req.headers
        if (!authorization) return res.status(401).end('Otorisasi Invalid')

        const authSplit = authorization.split(' ')
        const [authType, authToken] = [authSplit[0], authSplit[1]]
        if (authType !== 'Bearer')
            return res.status(401).end('Tipe Autentikasi Invalid')

        jwt.verify(
            authToken,
            process.env.SECRET_KEY,
            function (error, decoded) {
                if (!error) {
                  return resolve(decoded)
                } else {
                  return res.status(401).end("Token Invalid")
                }
            },
        )
    })
}
