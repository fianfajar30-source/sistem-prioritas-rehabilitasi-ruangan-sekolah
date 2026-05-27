import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  listSekolah,
  resetSekolah,
} from "../lib/api";

export default function Hasil() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await listSekolah();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReset = async () => {
    await resetSekolah();
    fetchData();
  };

  const totalSekolah = data.length;
  const skorTertinggi = data.length > 0 ? data[0].skor_urgensi : 0;

  const totalSiswa = data.reduce(
    (total, item) => total + item.jumlah_siswa,
    0
  );

  const totalRuangRusak = data.reduce(
    (total, item) => total + item.jumlah_ruang_rusak,
    0
  );

  return (
    <div className="app">
      <Navbar />

      <main className="hasil-page">
        <Link to="/" className="back-link">
          ← KEMBALI
        </Link>

        <div className="page-code">
          /03 — HASIL PRIORITAS
        </div>

        <div className="hasil-top">
          <div>
            <h1>
              Prioritas <br />
              Rehabilitasi Ruangan.
            </h1>

            <p>
               Data sekolah diurutkan berdasarkan skor urgensi menggunakan struktur 
               data Max-Heap. Sekolah pada rank pertama merupakan root Max-Heap atau
               sekolah dengan tingkat urgensi tertinggi.
            </p>
          </div>

          <div className="hasil-actions">
            <button className="btn-light" onClick={fetchData}>
              REFRESH
            </button>

            <Link to="/input" className="btn-dark">
              + TAMBAH DATA
            </Link>

            <button className="btn-red" onClick={handleReset}>
              RESET DATA
            </button>
          </div>
        </div>

        <section className="stats">
          <div className="stat-card">
            <small>Total Sekolah</small>
            <h2>{totalSekolah}</h2>
            <span>Entry</span>
          </div>

          <div className="stat-card active">
            <small>Skor Tertinggi</small>
            <h2>{skorTertinggi}</h2>
            <span>Poin</span>
          </div>

          <div className="stat-card">
            <small>Total Siswa</small>
            <h2>{totalSiswa}</h2>
            <span>Orang</span>
          </div>

          <div className="stat-card">
            <small>Ruang Rusak</small>
            <h2>{totalRuangRusak}</h2>
            <span>Unit</span>
          </div>
        </section>

        <section className="table">
          <div className="table-head">
            <span>Rank</span>
            <span>Nama Sekolah</span>
            <span>Alamat</span>
            <span>Siswa</span>
            <span>Kondisi</span>
            <span>R.Rusak</span>
            <span>Jarak</span>
            <span>Keamanan</span>
            <span>Riwayat</span>
            <span>Skor</span>
          </div>

          {data.map((item, index) => (
            <div
              key={item.id}
              className={`table-row ${index === 0 ? "top-rank" : ""}`}>
              <span>{index + 1}</span>
              <span>{item.nama}</span>
              <span>{item.alamat}</span>
              <span>{item.jumlah_siswa}</span>
              <span>{item.kondisi_fasilitas}</span>
              <span>{item.jumlah_ruang_rusak}</span>
              <span>{item.jarak_ke_kota} km</span>
              <span>{item.keamanan_bangunan}</span>
              <span>{item.riwayat_bantuan}</span>
              <span>{item.skor_urgensi}</span>
            </div>
          ))}
        </section>
      </main>
asdzzm., 
      <Footer />
    </div>
  );
}