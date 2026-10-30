import db from './db.js'

const insertar = db.prepare(
  'INSERT INTO productos (nombre, descripcion, precio, categoria, imagen, stock) ' +
  'VALUES (?, ?, ?, ?, ?, ?)'
)

insertar.run('Café de altura 250 g', 'Tostado artesanal', 28.5, 'Café',
  '/img/Café de altura 250g.jpg', 40)
insertar.run('Taza de cerámica', 'Hecha a mano', 22, 'Accesorios',
  '/img/Taza de cerámica.jpg', 25)
insertar.run('Cacao orgánico 200 g', 'Sin azúcar añadida', 19.9, 'Cacao',
  '/img/Cacao orgánico 200g.jpg', 30)
insertar.run('Prensa francesa', 'Para preparar café en casa', 65, 'Accesorios',
  '/img/Prensa francesa.jpg', 15)

console.log('Datos de ejemplo cargados')