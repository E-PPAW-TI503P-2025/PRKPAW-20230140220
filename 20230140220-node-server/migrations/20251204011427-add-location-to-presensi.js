'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Tambahkan kolom untuk Lokasi Check-In
    await queryInterface.addColumn('Presensis', 'latitude_in', {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true,
    });
    await queryInterface.addColumn('Presensis', 'longitude_in', {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true,
    });

    // 2. Tambahkan kolom untuk Lokasi Check-Out
    await queryInterface.addColumn('Presensis', 'latitude_out', {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true,
    });
    await queryInterface.addColumn('Presensis', 'longitude_out', {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true,
    });

    // ⚠️ CATATAN PENTING:
    // Ganti 'Presensis' dengan nama tabel yang benar di database Anda (bisa jadi 'presensis' atau 'presensi').
    // Secara default, Sequelize menggunakan bentuk jamak/plural ('Presensis').
  },

  down: async (queryInterface, Sequelize) => {
    // Fungsi 'down' digunakan untuk membatalkan (rollback) migrasi ini.
    await queryInterface.removeColumn('Presensis', 'latitude_in');
    await queryInterface.removeColumn('Presensis', 'longitude_in');
    await queryInterface.removeColumn('Presensis', 'latitude_out');
    await queryInterface.removeColumn('Presensis', 'longitude_out');
  }
};