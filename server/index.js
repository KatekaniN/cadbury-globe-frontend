import express from 'express'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'
import { detectMood } from './vision.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5174
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: clientOrigin }))
app.use(express.json())

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } })

app.get('/health', (_req, res) => res.json({ ok: true }))

app.post('/detect-mood', upload.single('selfie'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

    // Try Google Vision if credentials exist; fallback to JOY
    const mood = await detectMood(req.file.buffer).catch(() => 'joy')
    res.json({ mood })
  } catch (e) {
    console.error('detect-mood error', e)
    res.status(500).json({ error: 'Failed to analyze image' })
  }
})

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
