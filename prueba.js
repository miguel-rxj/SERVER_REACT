import db from './db.js'

db.prepare("UPDATE productos SET nombre = 'PRUEBA DESDE LA DB' WHERE id = 1").run()
console.log('Listo')