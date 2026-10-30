// auth.js
export function exigirLogin(req, res, next) {
  const rol = req.headers['x-usuario-rol']
  if (!rol) {
    return res.status(401).json({ error: 'Debes iniciar sesión' })
  }
  req.usuario = { rol }
  next()
}

export function exigirAdmin(req, res, next) {
  if (req.usuario?.rol !== 'admin') {
    return res.status(403).json({ error: 'Solo administradores' })
  }
  next()
}