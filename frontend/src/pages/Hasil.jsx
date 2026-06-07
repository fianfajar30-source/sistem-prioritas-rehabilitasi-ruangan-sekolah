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
  const [view, setView] = useState(1);

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

  const skorTertinggi =
    data.length > 0 ? data[0].skor_urgensi : 0;

  const totalSiswa = data.reduce(
    (total, item) => total + Number(item.jumlah_siswa || 0),
    0
  );

  const totalRuang = data.reduce(
    (total, item) => total + Number(item.jumlah_ruang || 0),
    0
  );

  const totalBuku = data.reduce(
    (total, item) => total + Number(item.jumlah_buku || 0),
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
              Alokasi Sumber Daya.
            </h1>

            <p>
              Data sekolah diurutkan berdasarkan skor prioritas menggunakan
              struktur data Max-Heap. Sekolah pada rank pertama merupakan root
              Max-Heap atau sekolah dengan skor prioritas tertinggi.
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
            <small>Total Ruang</small>
            <h2>{totalRuang}</h2>
            <span>Unit</span>
          </div>
        </section>

        <div className="hasil-actions" style={{ marginBottom: "30px" }}>
          <button
            className={view === 1 ? "btn-dark" : "btn-light"}
            onClick={() => setView(1)}
          >
            DATA SEKOLAH & BANGUNAN
          </button>

          <button
            className={view === 2 ? "btn-dark" : "btn-light"}
            onClick={() => setView(2)}
          >
            DATA RUANG & BUKU
          </button>
        </div>

        {view === 1 && (
          <section className="table">
            <div className="table-head">
              <span>Rank</span>
              <span>Nama Sekolah</span>
              <span>Alamat</span>
              <span>Siswa</span>
              <span>Bangunan</span>
              <span>Tahun</span>
              <span>Luas Bangunan</span>
              <span>Lantai</span>
              <span>Ruang</span>
              <span>Kondisi</span>
              <span>Riwayat</span>
              <span>Skor</span>
            </div>

            {data.map((item, index) => (
              <div
                key={item.id}
                className={`table-row ${index === 0 ? "top-rank" : ""}`}
              >
                <span>{index + 1}</span>
                <span>{item.nama}</span>
                <span>{item.alamat}</span>
                <span>{item.jumlah_siswa}</span>
                <span>{item.nama_bangunan}</span>
                <span>{item.tahun_pembangunan}</span>
                <span>{item.luas_bangunan}</span>
                <span>{item.jumlah_lantai}</span>
                <span>{item.jumlah_ruang}</span>
                <span>{item.kondisi_bangunan}</span>
                <span>{item.riwayat_bantuan}</span>
                <span>{item.skor_urgensi}</span>
              </div>
            ))}
          </section>
        )}

        {view === 2 && (
          <section className="table">
            <div className="table-head">
              <span>Rank</span>
              <span>Nama Sekolah</span>
              <span>Jenis Prasarana</span>
              <span>Nama Ruang</span>
              <span>Panjang</span>
              <span>Lebar</span>
              <span>Luas Ruang</span>
              <span>Kapasitas</span>
              <span>Buku Pustaka</span>
              <span>Mapel</span>
              <span>Judul Buku</span>
              <span>Jumlah Buku</span>
              <span>Skor</span>
            </div>

            {data.map((item, index) => (
              <div
                key={item.id}
                className={`table-row ${index === 0 ? "top-rank" : ""}`}
              >
                <span>{index + 1}</span>
                <span>{item.nama}</span>
                <span>{item.jenis_prasarana}</span>
                <span>{item.nama_ruang}</span>
                <span>{item.panjang_ruang} m</span>
                <span>{item.lebar_ruang} m</span>
                <span>{item.luas_ruang} m²</span>
                <span>{item.kapasitas_ruang}</span>
                <span>{item.judul_buku_pustaka}</span>
                <span>{item.mata_pelajaran}</span>
                <span>{item.judul_buku}</span>
                <span>{item.jumlah_buku}</span>
                <span>{item.skor_urgensi}</span>
              </div>
            ))}
          </section>
        )}

        <div className="hasil-note">
          <p>
            Total buku tercatat: <strong>{totalBuku}</strong> eksemplar.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}