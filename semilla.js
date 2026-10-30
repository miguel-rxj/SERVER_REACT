import db from './db.js'
 
const insertar = db.prepare(
  'INSERT INTO productos (nombre, descripcion, precio, categoria, imagen, stock) ' +
  'VALUES (?, ?, ?, ?, ?, ?)'
)
 
insertar.run('Café de altura 250 g', 'Tostado artesanal', 28.5, 'Café',
  'https://picsum.photos/seed/cafe/400/300', 40)
insertar.run('Taza de cerámica', 'Hecha a mano', 22, 'Accesorios',
  'https://picsum.photos/seed/taza/400/300', 25)
 
console.log('Datos de ejemplo cargados')
