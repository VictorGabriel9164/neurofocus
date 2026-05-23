import { Router } from 'express'
import prisma from '../prisma.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.use(authMiddleware)

// ── GET /api/tasks ─────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  const { status } = req.query

  try {
    const where = { userId: req.userId }

    if (status && ['PENDENTE', 'CONCLUIDA'].includes(status)) {
      where.state = status
    }

    const tasks = await prisma.task.findMany({ 
      where, 
      orderBy: { createdAt: 'desc' } 
    })
    res.json({ tasks })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar tarefas.' })
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
router.post('/', async (req, res) => {
  const { title, description, date, time } = req.body

  if (!title) {
    return res.status(400).json({ error: 'O título é obrigatório.' })
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        date: date || null,
        time: time || null,
        state: 'PENDENTE',
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
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const { title, description, date, time, state } = req.body

  try {
    const existente = await prisma.task.findFirst({ where: { id, userId: req.userId } })
    if (!existente) return res.status(404).json({ error: 'Tarefa não encontrada.' })

    const data = {}
    if (title) data.title = title
    if (description !== undefined) data.description = description
    if (date !== undefined) data.date = date
    if (time !== undefined) data.time = time
    if (state && ['PENDENTE', 'CONCLUIDA'].includes(state)) data.state = state

    const task = await prisma.task.update({ where: { id }, data })
    res.json({ message: 'Tarefa atualizada!', task })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao atualizar tarefa.' })
  }
})

// ── PATCH /api/tasks/:id/concluir ─────────────────────────────────────────────
router.patch('/:id/concluir', async (req, res) => {
  const id = parseInt(req.params.id)
  const { concluida } = req.body

  try {
    const existente = await prisma.task.findFirst({ where: { id, userId: req.userId } })
    if (!existente) return res.status(404).json({ error: 'Tarefa não encontrada.' })

    const state = concluida ? 'CONCLUIDA' : 'PENDENTE'

    const task = await prisma.task.update({
      where: { id },
      data: {
        state,
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