import { Router } from 'express'
import prisma from '../prisma.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()
router.use(authMiddleware)

// ── GET /api/progress ─────────────────────────────────────────────────────────
// Retorna as tarefas do usuário para o frontend calcular o progresso
router.get('/', async (req, res) => {
  try {
    // Busca TODAS as tarefas do usuário logado
    const tasks = await prisma.task.findMany({
      where: { 
        userId: req.userId 
      }
    })

    // Devolve a array de tarefas exata que o seu componente pede
    res.json({ tasks })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar tarefas para o progresso.' })
  }
})

export default router