const { response } = require("express");

const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response, next) => {
  
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email }).exec();
    
    if (existeEmail != null) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }
    
    const usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Generar JWT
    const token = await generarJWT(usuario.id);

    await usuario.save();
    res.json({
      ok: true,
      usuario,
      token,
    });

  } catch (error) {

    console.log(error);
    req.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuarioDb = await Usuario.findOne({ email }).exec();
    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuarioDb.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password no válido 123123",
      });
    }

    // Generar JWT
    const token = await generarJWT(usuarioDb.id);


    return  res.json({  
      ok: true,
      usuario: usuarioDb,
      msg: "login",
      token,
    });
  } catch (error) {
    req.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

  
}

const renewToken = async (req, res = response) => { 

  const uid = req.uid;

  const token = await generarJWT(uid);

  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    usuario,
    token
  });
}

module.exports = { crearUsuario, login, renewToken };
