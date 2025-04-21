import express from 'express'
import cors from 'cors'

import postsRoutes from './routes/possts.routes.js'
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

app.use(postsRoutes)

app.listen(PORT, console.log(`🍒 Server http://localhost:${PORT}`))