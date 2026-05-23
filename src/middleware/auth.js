import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET || "neurofocus_segredo_super_seguro_123"

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido. Faça login primeiro.' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    req.userName = decoded.name
    next()
  } catch (err) {
    console.error("the token was been rejected:", err.message)
    return res.status(401).json({ error: 'Token inválido ou expirado. Faça login novamente.' })
  }
}