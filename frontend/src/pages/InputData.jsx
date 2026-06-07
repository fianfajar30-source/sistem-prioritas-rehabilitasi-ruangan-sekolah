import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createSekolah } from "../lib/api";

export default function InputData() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    jumlah_siswa: "",
    kebutuhan_lab_ipa: "Tidak Butuh",
    kebutuhan_tik: "Tidak Butuh",
    kebutuhan_buku_perpustakaan: "Tidak Butuh",
    kondisi_sarpras: "Baik",
    jarak_ke_kota: "",
    riwayat_bantuan: "Belum Pernah",
  });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const submit = async (e) => {
      e.preventDefault();

      await createSekolah({
        ...formData,
        jumlah_siswa: Number(formData.jumlah_siswa),
        jarak_ke_kota: Number(formData.jarak_ke_kota),
      });

      navigate("/hasil");
    };
  return (
    <div className="app">
      <Navbar />

      <main className="form-page">
        <Link to="/" className="back-link">
          ← KEMBALI
        </Link>

        <div className="page-code">/02 — REGISTRASI DATA</div>

        <h1>
          Form Registrasi <br />
          Sekolah.
        </h1>

        <p>
          Masukkan data kebutuhan sekolah sesuai indikator DAK SMP. Sistem akan
          menghitung skor urgensi berdasarkan kebutuhan Lab IPA, TIK, buku
          perpustakaan, kondisi sarpras, jumlah siswa, jarak, dan riwayat bantuan.
        </p>

        <form onSubmit={submit} className="form-box">
          <div className="form-top">
            <span>FORM INPUT-01</span>
            <span>9 FIELDS</span>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/01</small>
              Nama Sekolah
            </div>

            <div className="field-input">
              <input
                name="nama"
                placeholder="SDN 01 Cipanas"
                value={formData.nama}
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
                placeholder="Jl. Raya Desa Cipanas"
                value={formData.alamat}
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
                value={formData.jumlah_siswa}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/04</small>
              Kondisi Sarana Prasarana
            </div>

            <div className="field-input">
              <select
                name="kondisi_sarpras"
                value={formData.kondisi_sarpras}
                onChange={handleChange}
              >
                <option value="Baik">Baik</option>
                <option value="Kurang">Kurang</option>
                <option value="Rusak Ringan">Rusak Ringan</option>
                <option value="Rusak Berat">Rusak Berat</option>
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/05</small>
              Kebutuhan Lab IPA
            </div>

            <div className="field-input">
              <select
                name="kebutuhan_lab_ipa"
                value={formData.kebutuhan_lab_ipa}
                onChange={handleChange}
              >
                <option value="Tidak Butuh">Tidak Butuh</option>
                <option value="Butuh">Butuh</option>
                <option value="Sangat Butuh">Sangat Butuh</option>
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/06</small>
              Kebutuhan TIK
            </div>

            <div className="field-input">
              <select
                name="kebutuhan_tik"
                value={formData.kebutuhan_tik}
                onChange={handleChange}
              >
                <option value="Tidak Butuh">Tidak Butuh</option>
                <option value="Butuh">Butuh</option>
                <option value="Sangat Butuh">Sangat Butuh</option>
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/07</small>
              Buku Perpustakaan
            </div>

            <div className="field-input">
              <select
                name="kebutuhan_buku_perpustakaan"
                value={formData.kebutuhan_buku_perpustakaan}
                onChange={handleChange}
              >
                <option value="Tidak Butuh">Tidak Butuh</option>
                <option value="Butuh">Butuh</option>
                <option value="Sangat Butuh">Sangat Butuh</option>
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/08</small>
              Jarak Kota
            </div>

            <div className="field-input">
              <input
                type="number"
                name="jarak_ke_kota"
                placeholder="18"
                value={formData.jarak_ke_kota}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <small>/09</small>
              Riwayat Bantuan
            </div>

            <div className="field-input">
              <select
                name="riwayat_bantuan"
                value={formData.riwayat_bantuan}
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