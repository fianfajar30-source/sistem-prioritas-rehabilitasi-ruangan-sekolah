import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createSekolah } from "../lib/api";

export default function InputData() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
  nama: "",
  alamat: "",
  jumlah_siswa: "",
  kondisi_fasilitas: "",
  jumlah_ruang_rusak: "",
  jarak_ke_kota: "",
  keamanan_bangunan: "",
  riwayat_bantuan: "",
});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    await createSekolah({
      ...form,
      jumlah_siswa: Number(form.jumlah_siswa),
      jumlah_ruang_rusak: Number(form.jumlah_ruang_rusak),
      jarak_ke_kota: Number(form.jarak_ke_kota),
    });

    navigate("/hasil");
  };

  return (
    <div className="app">
      <Navbar />

      <main className="form-page">
        <Link to="/" className="back-link">← KEMBALI</Link>

        <div className="page-code">/02 — REGISTRASI DATA</div>

        <h1>
          Form Registrasi <br />
          Sekolah.
        </h1>

        <p>
          Masukkan data kondisi sekolah secara akurat. Sistem akan menghitung
          skor urgensi dan menempatkan sekolah pada posisi yang tepat dalam
          Max-Heap.
        </p>

        <form onSubmit={submit} className="form-box">
          <div className="form-top">
            <span>FORM INPUT-01</span>
            <span>6 FIELDS</span>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/01</small>
              Nama Sekolah
            </div>

            <div className="field-input">
              <input
                name="nama"
                placeholder="SMP 01 Lamongan"
                value={form.nama}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/02</small>
              Alamat
            </div>

            <div className="field-input">
              <input
                name="alamat"
                placeholder="Jl. Provinsi Pantura"
                value={form.alamat}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/03</small>
              Siswa
            </div>

            <div className="field-input">
              <input
                type="number"
                name="jumlah_siswa"
                placeholder="320"
                value={form.jumlah_siswa}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/04</small>
              Kondisi
            </div>

            <div className="field-input">
              <select
                name="kondisi_fasilitas"
                value={form.kondisi_fasilitas}
                onChange={handleChange}
                required
              >
                <option value="">Pilih Kondisi</option>
                <option value="Rusak Berat">Rusak Berat</option>
                <option value="Rusak Sedang">Rusak Sedang</option>
                <option value="Rusak Ringan">Rusak Ringan</option>
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/05</small>
              Ruang Rusak
            </div>

            <div className="field-input">
              <input
                type="number"
                name="jumlah_ruang_rusak"
                placeholder="9"
                value={form.jumlah_ruang_rusak}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/06</small>
              Jarak Kota
            </div>

            <div className="field-input">
              <input
                type="number"
                name="jarak_ke_kota"
                placeholder="18"
                value={form.jarak_ke_kota}
                onChange={handleChange}
                required
              />
            </div>
          </div>
                  <div className="field-row">
          <div className="field-label">
            <small>/07</small>
            Keamanan
          </div>

          <div className="field-input">
            <select
              name="keamanan_bangunan"
              value={form.keamanan_bangunan}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Keamanan</option>
              <option value="Aman">Aman</option>
              <option value="Rawan">Rawan</option>
              <option value="Berbahaya">Berbahaya</option>
            </select>
          </div>
        </div>

        <div className="field-row">
          <div className="field-label">
            <small>/08</small>
            Riwayat Bantuan
          </div>

          <div className="field-input">
            <select
              name="riwayat_bantuan"
              value={form.riwayat_bantuan}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Riwayat</option>
              <option value="Belum Pernah">Belum Pernah</option>
              <option value="Pernah > 3 Tahun">Pernah &gt; 3 Tahun</option>
              <option value="Pernah < 3 Tahun">Pernah &lt; 3 Tahun</option>
            </select>
          </div>
        </div>
          <button className="form-submit">
            SIMPAN DATA
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}