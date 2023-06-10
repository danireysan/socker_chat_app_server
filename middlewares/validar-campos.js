const { validationResult } = require("express-validator");

const validarCampos = (err, req, res, next) => {
  const errores = validationResult(req);

  console.log(err);
  
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errores: errores.mapped(),
    });
  }

  next();
};

module.exports = { validarCampos };
