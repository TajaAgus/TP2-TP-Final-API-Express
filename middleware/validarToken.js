import jwt from "jsonwebtoken";

const validarToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const usuario = jwt.verify(token.split(" ")[1], "secretKey");
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token no es válido" });
  }
};

export default validarToken;
