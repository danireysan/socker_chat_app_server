/* 

    path: /api/login
*/

const { Router } = require("express");
const { crearUsuario, login, renewToken } = require("../controllers/auth_controllers");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/renovar-jwt");

const router = Router();

router.post(
  "/new",
  [
    // middlewares
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
  ],
  login
);

router.get("/renew", validarJWT,renewToken);

module.exports = router;
