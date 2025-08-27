const jwt = require ('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = function (req, res, next) {
    const tokenHeader = req.header ('Authorization');
    if (!tokenHeader || !tokenHeader.startsWith ('Bearer ')) {
        return res.status (401).json ({ message: 'Acesso negado. Token inválido.'});
    }
     const token = tokenHeader.split (' ')[1];
      try {
        const decoded = jwt.verify (token, JWT_SECRET);
        req.usuario = decoded;
        next();
      } catch (error) {
         res.status (401).json ({ message: 'Acesso negado. Token inválido.'});
      }
    };