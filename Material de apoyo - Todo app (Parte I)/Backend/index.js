import express from "express"
import cors from "cors"
import { Pool } from "pg"
import { nanoid } from "nanoid"

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// conexión a PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "likeme",
  password: "isabella",
  port: 5432,
});

// Ruta GET
app.get("/posts", async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM posts")
    client.release()
    res.json(result.rows)
  } catch (err) {
    console.error('Error al obtener posts', err)
    res.status(500).json({ error: 'Error al obtener posts' })
  }
})

// Ruta POST
app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion } = req.body
  const likes = 0
  const id = nanoid()

  try {
    const client = await pool.connect()
    const result = await client.query(
      "INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, titulo, img, descripcion, likes]
    )
    client.release()
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('Error al insertar nuevo post', err)
    res.status(500).json({ error: 'Error al insertar nuevo post' })
  }
})

// servidor
app.listen(port, () => {
  console.log(`Servidor Like Me corriendo en http://localhost:${port}`)
})
