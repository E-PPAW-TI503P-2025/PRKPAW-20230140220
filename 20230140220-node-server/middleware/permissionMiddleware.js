// --- File: middleware/permissionMiddleware.js (Perbaikan) ---

// Pastikan Anda telah menginstal: npm install jsonwebtoken
const jwt = require('jsonwebtoken'); 
// Ganti dengan KUNCI RAHASIA yang SAMA dengan yang Anda gunakan untuk membuat token
const SECRET_KEY = 'KUNCI_RAHASIA_ANDA'; 


exports.addUserData = (req, res, next) => {
    // 1. Ambil Token dari Header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Jika tidak ada token (misalnya, untuk route login/register)
        // Kita tetap lanjutkan, tetapi req.user akan null/undefined
        req.user = null; 
        console.log('Middleware: Tidak ada Token');
        return next();
    }

    const token = authHeader.split(' ')[1];

    // 2. Verifikasi dan Decode Token
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // 3. Tambahkan data user SAH ke req.user
        // Asumsi: Token Anda berisi { id, nama, role }
        req.user = { 
            id: decoded.id, 
            nama: decoded.nama, 
            role: decoded.role 
        };

        console.log(`Middleware: User Sah Ditemukan (Role: ${req.user.role})`);
        next();
    } catch (err) {
        // Jika Token tidak valid (expired, diubah, dll.)
        console.error('Middleware Error: Token tidak valid/kadaluarsa.', err.message);
        // Mengembalikan 401 Unauthorized, bukan 403 Forbidden
        return res.status(401).json({ message: 'Token tidak valid. Silakan login kembali.' });
    }
};

// Middleware isAdmin (Logicnya sudah benar, kita hanya tambahkan console log yang lebih jelas)
exports.isAdmin = (req, res, next) => {
    // req.user sekarang berasal dari decode token di addUserData
    if (req.user && req.user.role === 'admin') {
        console.log('Middleware: Akses Diberikan (Admin)');
        next();
    } else {
        // Akan terjadi 403 jika token valid tetapi role BUKAN 'admin'
        const currentRole = req.user ? req.user.role : 'Guest';
        console.log(`Middleware: Akses Ditolak (Role: ${currentRole})`);
        // Error 403 akan mencegah Mahasiswa mengakses route Admin (/daily)
        res.status(403).json({ message: 'Akses ditolak. Hanya Admin yang diizinkan.' });
    }
};