import { Router } from 'express'
import prisma from '../prisma.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

// Todas as rotas de tarefas exigem login
router.use(authMiddleware)

// ── Helper: sincroniza tarefas que passaram do prazo ─────────────────────────
async function sincronizarAtrasadas(userId) {
  await prisma.task.updateMany({
    where: { userId, status: 'PENDENTE', dueDate: { lt: new Date() } },
    data: { status: 'ATRASADA' },
  })
}

// ── GET /api/tasks ─────────────────────────────────────────────────────────────
// Query params opcionais:
//   ?status=PENDENTE|CONCLUIDA|ATRASADA
//   ?period=today|tomorrow|upcoming
router.get('/', async (req, res) => {
  const { status, period } = req.query

  try {
    await sincronizarAtrasadas(req.userId)

    const now = new Date()
    const hoje = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const amanha = new Date(hoje); amanha.setDate(hoje.getDate() + 1)
    const depoisDeAmanha = new Date(hoje); depoisDeAmanha.setDate(hoje.getDate() + 2)

    const where = { userId: req.userId }

    if (status && ['PENDENTE', 'CONCLUIDA', 'ATRASADA'].includes(status)) {
      where.status = status
    }

    if (period === 'today')    where.dueDate = { gte: hoje, lt: amanha }
    if (period === 'tomorrow') where.dueDate = { gte: amanha, lt: depoisDeAmanha }
    if (period === 'upcoming') where.dueDate = { gte: depoisDeAmanha }

    const tasks = await prisma.task.findMany({ where, orderBy: { dueDate: 'asc' } })
    res.json({ tasks })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar tarefas.' })
  }
})

// ── GET /api/tasks/today ──────────────────────────────────────────────────────
// Tarefas de hoje
router.get('/today', async (req, res) => {
  try {
    await sincronizarAtrasadas(req.userId)
    const now = new Date()
    const hoje = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const amanha = new Date(hoje); amanha.setDate(hoje.getDate() + 1)

    const tasks = await prisma.task.findMany({
      where: { userId: req.userId, dueDate: { gte: hoje, lt: amanha } },
      orderBy: { dueDate: 'asc' },
    })
    res.json({ tasks })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar tarefas de hoje.' })
  }
})

// ── GET /api/tasks/tomorrow ───────────────────────────────────────────────────
// Tarefas de amanhã
router.get('/tomorrow', async (req, res) => {
  try {
    await sincronizarAtrasadas(req.userId)
    const now = new Date()
    const hoje = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const amanha = new Date(hoje); amanha.setDate(hoje.getDate() + 1)
    const depoisDeAmanha = new Date(hoje); depoisDeAmanha.setDate(hoje.getDate() + 2)

    const tasks = await prisma.task.findMany({
      where: { userId: req.userId, dueDate: { gte: amanha, lt: depoisDeAmanha } },
      orderBy: { dueDate: 'asc' },
    })
    res.json({ tasks })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar tarefas de amanhã.' })
  }
})

// ── GET /api/tasks/upcoming ───────────────────────────────────────────────────
// Próximas tarefas (após amanhã)
router.get('/upcoming', async (req, res) => {
  try {
    await sincronizarAtrasadas(req.userId)
    const now = new Date()
    const hoje = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const depoisDeAmanha = new Date(hoje); depoisDeAmanha.setDate(hoje.getDate() + 2)

    const tasks = await prisma.task.findMany({
      where: { userId: req.userId, dueDate: { gte: depoisDeAmanha } },
      orderBy: { dueDate: 'asc' },
    })
    res.json({ tasks })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar próximas tarefas.' })
  }
})

// ── GET /api/tasks/:id ────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const task = await prisma.task.findFirst({ where: { id, userId: req.userId } })
    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' })
    res.json({ task })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar tarefa.' })
  }
})

// ── POST /api/tasks ───────────────────────────────────────────────────────────
// Body: { title, subject, dueDate, description? }
router.post('/', async (req, res) => {
  const { title, subject, description, dueDate } = req.body

  if (!title || !subject || !dueDate) {
    return res.status(400).json({ error: 'Título, matéria e data/hora limite são obrigatórios.' })
  }

  try {
    const dueDateParsed = new Date(dueDate)
    if (isNaN(dueDateParsed)) {
      return res.status(400).json({ error: 'Data/hora inválida.' })
    }

    const status = dueDateParsed < new Date() ? 'ATRASADA' : 'PENDENTE'

    const task = await prisma.task.create({
      data: {
        title,
        subject,
        description: description || null,
        dueDate: dueDateParsed,
        status,
        userId: req.userId,
      },
    })

    res.status(201).json({ message: 'Tarefa criada com sucesso!', task })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao criar tarefa.' })
  }
})

// ── PUT /api/tasks/:id ────────────────────────────────────────────────────────
// Body: { title?, subject?, description?, dueDate? }
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const { title, subject, description, dueDate } = req.body

  try {
    const existente = await prisma.task.findFirst({ where: { id, userId: req.userId } })
    if (!existente) return res.status(404).json({ error: 'Tarefa não encontrada.' })

    const data = {}
    if (title)               data.title = title
    if (subject)             data.subject = subject
    if (description !== undefined) data.description = description
    if (dueDate) {
      const parsed = new Date(dueDate)
      if (isNaN(parsed)) return res.status(400).json({ error: 'Data/hora inválida.' })
      data.dueDate = parsed
      if (existente.status !== 'CONCLUIDA') {
        data.status = parsed < new Date() ? 'ATRASADA' : 'PENDENTE'
      }
    }

    const task = await prisma.task.update({ where: { id }, data })
    res.json({ message: 'Tarefa atualizada!', task })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao atualizar tarefa.' })
  }
})

// ── PATCH /api/tasks/:id/concluir ─────────────────────────────────────────────
// Body: { concluida: true | false }
// true  → marca como CONCLUIDA
// false → desfaz (volta para PENDENTE ou ATRASADA conforme o prazo)
router.patch('/:id/concluir', async (req, res) => {
  const id = parseInt(req.params.id)
  const { concluida } = req.body

  try {
    const existente = await prisma.task.findFirst({ where: { id, userId: req.userId } })
    if (!existente) return res.status(404).json({ error: 'Tarefa não encontrada.' })

    const now = new Date()
    const status = concluida
      ? 'CONCLUIDA'
      : existente.dueDate < now ? 'ATRASADA' : 'PENDENTE'

    const task = await prisma.task.update({
      where: { id },
      data: {
        status,
        completedAt: concluida ? now : null,
      },
    })

    res.json({ message: concluida ? 'Tarefa concluída!' : 'Tarefa desmarcada.', task })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao atualizar tarefa.' })
  }
})

// ── DELETE /api/tasks/:id ─────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const existente = await prisma.task.findFirst({ where: { id, userId: req.userId } })
    if (!existente) return res.status(404).json({ error: 'Tarefa não encontrada.' })

    await prisma.task.delete({ where: { id } })
    res.json({ message: 'Tarefa deletada.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao deletar tarefa.' })
  }
})

export default router
