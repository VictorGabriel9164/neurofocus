import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prisma.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// ── POST /api/auth/registrar ──────────────────────────────────────────────────
// Body: { name, email, password }
router.post('/registrar', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' })
  }

  try {
    const existe = await prisma.user.findUnique({ where: { email } })
    if (existe) {
      return res.status(409).json({ error: 'Este e-mail já está cadastrado.' })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hash },
      select: { id: true, name: true, email: true, createdAt: true },
    })

    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ message: 'Conta criada com sucesso!', token, user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao criar conta.' })
  }
})

// ── POST /api/auth/login ──────────────────────────────────────────────────────
// Body: { email, password }
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' })
    }

    const senhaCorreta = await bcrypt.compare(password, user.password)
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos.' })
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao fazer login.' })
  }
})

// ── GET /api/auth/me  (rota protegida) ───────────────────────────────────────
// Retorna os dados do usuário autenticado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true, createdAt: true },
    })
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' })
    res.json({ user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar usuário.' })
  }
})

export default router
