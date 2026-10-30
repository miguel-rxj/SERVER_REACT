import db from './db.js'
 
// LEER (todos)
app.get('/api/productos', (req, res) => {
  res.json(db.prepare('SELECT * FROM productos').all())
})
 
// CREAR (solo administrador)
app.post('/api/productos', exigirLogin, exigirAdmin, (req, res) => {
  const { nombre, descripcion, precio, categoria, imagen, stock } = req.body
  if (!nombre || !(precio >= 0)) {
    return res.status(400).json({ error: 'Datos incompletos' })
  }
  const r = db.prepare(
    'INSERT INTO productos (nombre, descripcion, precio, categoria, imagen, stock) ' +
    'VALUES (?, ?, ?, ?, ?, ?)'
  ).run(nombre, descripcion, precio, categoria, imagen, stock ?? 0)
  res.status(201).json({ id: r.lastInsertRowid })
})
 
// ACTUALIZAR
app.put('/api/productos/:id', exigirLogin, exigirAdmin, (req, res) => {
  const { nombre, precio, stock } = req.body
  db.prepare('UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?')
    .run(nombre, precio, stock, req.params.id)
  res.json({ ok: true })
})
 
// ELIMINAR
app.delete('/api/productos/:id', exigirLogin, exigirAdmin, (req, res) => {
  db.prepare('DELETE FROM productos WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})
