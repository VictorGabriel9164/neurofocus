import { Router } from 'express'
import prisma from '../prisma.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()
router.use(authMiddleware)

// ── Helper: datas do período ──────────────────────────────────────────────────
function datasDoperiodo(periodo) {
  const now = new Date()
  const hoje = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (periodo === 'hoje') {
    const fim = new Date(hoje); fim.setDate(fim.getDate() + 1)
    return { inicio: hoje, fim }
  }
  if (periodo === 'semana') {
    const inicio = new Date(hoje)
    inicio.setDate(inicio.getDate() - inicio.getDay()) // domingo
    const fim = new Date(inicio); fim.setDate(fim.getDate() + 7)
    return { inicio, fim }
  }
  if (periodo === 'mes') {
    const inicio = new Date(now.getFullYear(), now.getMonth(), 1)
    const fim = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    return { inicio, fim }
  }
  return null
}

// ── Helper: sincroniza atrasadas ──────────────────────────────────────────────
async function sincronizarAtrasadas(userId) {
  await prisma.task.updateMany({
    where: { userId, status: 'PENDENTE', dueDate: { lt: new Date() } },
    data: { status: 'ATRASADA' },
  })
}

// ── GET /api/progress ─────────────────────────────────────────────────────────
// Resumo geral de todas as tarefas do usuário
router.get('/', async (req, res) => {
  try {
    await sincronizarAtrasadas(req.userId)

    const [concluidas, emAndamento, atrasadas, total] = await Promise.all([
      prisma.task.count({ where: { userId: req.userId, status: 'CONCLUIDA' } }),
      prisma.task.count({ where: { userId: req.userId, status: 'PENDENTE' } }),
      prisma.task.count({ where: { userId: req.userId, status: 'ATRASADA' } }),
      prisma.task.count({ where: { userId: req.userId } }),
    ])

    res.json({
      resumo: {
        concluidas,
        emAndamento,
        atrasadas,
        total,
        percentualConcluido: total > 0 ? Math.round((concluidas / total) * 100) : 0,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar progresso.' })
  }
})

// ── GET /api/progress/periodo?periodo=hoje|semana|mes ─────────────────────────
// Resumo filtrado por período
router.get('/periodo', async (req, res) => {
  const { periodo } = req.query

  if (!['hoje', 'semana', 'mes'].includes(periodo)) {
    return res.status(400).json({ error: 'Use: ?periodo=hoje, semana ou mes' })
  }

  try {
    await sincronizarAtrasadas(req.userId)

    const { inicio, fim } = datasDoperiodo(periodo)
    const base = { userId: req.userId, dueDate: { gte: inicio, lt: fim } }

    const [concluidas, emAndamento, atrasadas, total] = await Promise.all([
      prisma.task.count({ where: { ...base, status: 'CONCLUIDA' } }),
      prisma.task.count({ where: { ...base, status: 'PENDENTE' } }),
      prisma.task.count({ where: { ...base, status: 'ATRASADA' } }),
      prisma.task.count({ where: base }),
    ])

    res.json({
      periodo,
      resumo: {
        concluidas,
        emAndamento,
        atrasadas,
        total,
        percentualConcluido: total > 0 ? Math.round((concluidas / total) * 100) : 0,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar progresso por período.' })
  }
})

// ── GET /api/progress/materias?periodo=hoje|semana|mes ────────────────────────
// Progresso agrupado por matéria (período é opcional)
router.get('/materias', async (req, res) => {
  const { periodo } = req.query

  try {
    await sincronizarAtrasadas(req.userId)

    const where = { userId: req.userId }
    if (periodo && ['hoje', 'semana', 'mes'].includes(periodo)) {
      const { inicio, fim } = datasDoperiodo(periodo)
      where.dueDate = { gte: inicio, lt: fim }
    }

    const tasks = await prisma.task.findMany({
      where,
      select: { subject: true, status: true },
    })

    // Agrupa por matéria
    const mapa = {}
    for (const t of tasks) {
      if (!mapa[t.subject]) {
        mapa[t.subject] = { concluidas: 0, emAndamento: 0, atrasadas: 0, total: 0 }
      }
      mapa[t.subject].total++
      if (t.status === 'CONCLUIDA') mapa[t.subject].concluidas++
      else if (t.status === 'PENDENTE') mapa[t.subject].emAndamento++
      else if (t.status === 'ATRASADA') mapa[t.subject].atrasadas++
    }

    const materias = Object.entries(mapa).map(([materia, dados]) => ({
      materia,
      ...dados,
      percentualConcluido: dados.total > 0 ? Math.round((dados.concluidas / dados.total) * 100) : 0,
    })).sort((a, b) => b.percentualConcluido - a.percentualConcluido)

    res.json({ materias })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar progresso por matérias.' })
  }
})

export default router
