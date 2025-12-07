const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require('dotenv').config(); // <--- Wajib ada biar bisa baca .env
const JWT_SECRET = process.env.JWT_SECRET; // <--- Pa

// REGISTER
exports.register = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    if (!nama || !email || !password || !role) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    // Cek role valid
    if (!["admin", "mahasiswa"].includes(role)) {
      return res.status(400).json({ message: "Role tidak valid" });
    }

    // Cek email sudah terdaftar
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email sudah digunakan" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nama,
      email,
      password: hashed,
      role,
    });

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: newUser.id,
        nama: newUser.nama,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Email tidak ditemukan" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Password salah" });

    // Buat token
    const token = jwt.sign(
      { id: user.id, nama: user.nama, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};