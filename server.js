// server.js
import express from 'express'
import cors from 'cors'
import db from './db.js'
import { exigirLogin, exigirAdmin } from './auth.js'

const app = express()
app.use(cors())           // permite que React (otro puerto) nos consulte
app.use(express.json())   // permite leer JSON enviado por el cliente

// ---------- PRODUCTOS ----------

// LEER (todos)
app.get('/api/productos', (req, res) => {
  res.json(db.prepare('SELECT * FROM productos').all())
})

// LEER (uno)
app.get('/api/productos/:id', (req, res) => {
  const producto = db
    .prepare('SELECT * FROM productos WHERE id = ?')
    .get(req.params.id)
  if (!producto) return res.status(404).json({ error: 'No existe' })
  res.json(producto)
})

// CREAR (solo administrador)
app.post('/api/productos', exigirLogin, exigirAdmin, (req, res) => {
  const { nombre, descripcion, precio, categoria, imagen, stock } = req.body
  if (!nombre || !(precio >= 0)) {
    return res.status(400).json({ error: 'Datos incompletos' })
  }
  const r = db
    .prepare(
      'INSERT INTO productos (nombre, descripcion, precio, categoria, imagen, stock) ' +
        'VALUES (?, ?, ?, ?, ?, ?)'
    )
    .run(nombre, descripcion, precio, categoria, imagen, stock ?? 0)
  res.status(201).json({ id: r.lastInsertRowid })
})

// ACTUALIZAR (solo administrador)
app.put('/api/productos/:id', exigirLogin, exigirAdmin, (req, res) => {
  const { nombre, precio, stock } = req.body
  db.prepare(
    'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?'
  ).run(nombre, precio, stock, req.params.id)
  res.json({ ok: true })
})

// ELIMINAR (solo administrador)
app.delete('/api/productos/:id', exigirLogin, exigirAdmin, (req, res) => {
  db.prepare('DELETE FROM productos WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

// ---------- CONTACTO ----------

app.post('/api/contacto', (req, res) => {
  console.log('Mensaje:', req.body)
  res.status(201).json({ ok: true })
})

// ---------- ARRANQUE ----------

app.listen(3001, () => console.log('API lista en http://localhost:3001'))