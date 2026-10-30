import express from 'express'
import cors from 'cors'
 
const app = express()
app.use(cors())            // permite que React (otro puerto) nos consulte
app.use(express.json())    // permite leer JSON enviado por el cliente
 
const productos = [
  { id: 1, nombre: 'Café de altura 250 g', precio: 28.5, categoria: 'Café' },
  { id: 2, nombre: 'Taza de cerámica', precio: 22, categoria: 'Accesorios' },
]
 
app.get('/api/productos', (req, res) => {
  res.json(productos)
})
 
app.get('/api/productos/:id', (req, res) => {
  const producto = productos.find((p) => p.id === Number(req.params.id))
  if (!producto) return res.status(404).json({ error: 'No existe' })
  res.json(producto)
})
 
app.post('/api/contacto', (req, res) => {
  console.log('Mensaje:', req.body)
  res.status(201).json({ ok: true })
})
 
app.listen(3001, () => console.log('API lista en http://localhost:3001'))
