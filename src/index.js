import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import taskRoutes from './routes/tasks.js'
import progressRoutes from './routes/progress.js'

const app = express()
const PORT = 3002

// ── Middlewares ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: '*', // em produção, troca pelo domínio do frontend
  credentials: true,
}))
app.use(express.json())

// ── Health check ───────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'NeuroFocus API rodando!' })
})

// ── Rotas ──────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/progress', progressRoutes)

// ── 404 ────────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' })
})

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Erro interno do servidor' })
})

app.listen(PORT, () => {
  console.log(`✅ NeuroFocus API rodando em http://localhost:${PORT}`)
})
