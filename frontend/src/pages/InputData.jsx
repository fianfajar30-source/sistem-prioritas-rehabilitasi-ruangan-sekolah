import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createSekolah } from "../lib/api";

export default function InputData() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    jumlah_siswa: "",

    nama_bangunan: "",
    tahun_pembangunan: "",
    luas_bangunan: "",
    jumlah_lantai: "",
    jumlah_ruang: "",
    kondisi_bangunan: "Tidak Ada Kerusakan",

    jenis_prasarana: "",
    nama_ruang: "",
    panjang_ruang: "",
    lebar_ruang: "",
    luas_ruang: "",
    kapasitas_ruang: "",

    judul_buku_pustaka: "",
    mata_pelajaran: "",
    judul_buku: "",
    jumlah_buku: "",

    riwayat_bantuan: "Belum Pernah",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const submit = async (e) => {
    e.preventDefault();

    await createSekolah({
      ...formData,
      jumlah_siswa: Number(formData.jumlah_siswa),
      tahun_pembangunan: Number(formData.tahun_pembangunan),
      luas_bangunan: Number(formData.luas_bangunan),
      jumlah_lantai: Number(formData.jumlah_lantai),
      jumlah_ruang: Number(formData.jumlah_ruang),
      panjang_ruang: Number(formData.panjang_ruang),
      lebar_ruang: Number(formData.lebar_ruang),
      luas_ruang: Number(formData.luas_ruang),
      kapasitas_ruang: Number(formData.kapasitas_ruang),
      jumlah_buku: Number(formData.jumlah_buku),
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
          Masukkan data sekolah berdasarkan menu Dapodik. Form dibagi menjadi
          dua tahap agar input data lebih ringkas dan mudah dibaca.
        </p>

        <form
          onSubmit={step === 1 ? nextStep : submit}
          className="form-box"
        >
          <div className="form-top">
            <span>
              {step === 1
                ? "FORM 1 — DATA SEKOLAH & BANGUNAN"
                : "FORM 2 — DATA RUANG & BUKU"}
            </span>
            <span>{step}/2</span>
          </div>

          {step === 1 && (
            <>
              <div className="field-row">
                <div className="field-label">
                  <small>/01</small>
                  Nama Sekolah
                </div>

                <div className="field-input">
                  <input
                    name="nama"
                    placeholder="SMP Negeri 1 Sugio"
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
                    placeholder="Jl. Pendidikan"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/03</small>
                  Jumlah Siswa
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
                  Nama Bangunan
                </div>

                <div className="field-input">
                  <input
                    name="nama_bangunan"
                    placeholder="GEDUNG B"
                    value={formData.nama_bangunan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/05</small>
                  Tahun Pembangunan
                </div>

                <div className="field-input">
                  <input
                    type="number"
                    name="tahun_pembangunan"
                    placeholder="2014"
                    value={formData.tahun_pembangunan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/06</small>
                  Luas Bangunan
                </div>

                <div className="field-input">
                  <input
                    type="number"
                    step="0.01"
                    name="luas_bangunan"
                    placeholder="443.7"
                    value={formData.luas_bangunan}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/07</small>
                  Jumlah Lantai
                </div>

                <div className="field-input">
                  <input
                    type="number"
                    name="jumlah_lantai"
                    placeholder="2"
                    value={formData.jumlah_lantai}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/08</small>
                  Jumlah Ruang
                </div>

                <div className="field-input">
                  <input
                    type="number"
                    name="jumlah_ruang"
                    placeholder="11"
                    value={formData.jumlah_ruang}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/09</small>
                  Kondisi Bangunan
                </div>

                <div className="field-input">
                  <select
                    name="kondisi_bangunan"
                    value={formData.kondisi_bangunan}
                    onChange={handleChange}
                    required
                  >
                    <option value="Tidak Ada Kerusakan">
                      Tidak Ada Kerusakan
                    </option>
                    <option value="Rusak Ringan">Rusak Ringan</option>
                    <option value="Rusak Sedang">Rusak Sedang</option>
                    <option value="Rusak Berat">Rusak Berat</option>
                  </select>
                </div>
              </div>

              <button className="form-submit" type="submit">
                LANJUT FORM 2 →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="field-row">
                <div className="field-label">
                  <small>/11</small>
                  Jenis Prasarana
                </div>

                <div className="field-input">
                  <input
                    name="jenis_prasarana"
                    placeholder="Ruang Teori/Kelas"
                    value={formData.jenis_prasarana}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/12</small>
                  Nama Ruang
                </div>

                <div className="field-input">
                  <input
                    name="nama_ruang"
                    placeholder="R. Kelas 7E"
                    value={formData.nama_ruang}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/13</small>
                  Panjang Ruang
                </div>

                <div className="field-input">
                  <input
                    type="number"
                    step="0.01"
                    name="panjang_ruang"
                    placeholder="9.25"
                    value={formData.panjang_ruang}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/14</small>
                  Lebar Ruang
                </div>

                <div className="field-input">
                  <input
                    type="number"
                    step="0.01"
                    name="lebar_ruang"
                    placeholder="9.17"
                    value={formData.lebar_ruang}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/15</small>
                  Luas Ruang
                </div>

                <div className="field-input">
                  <input
                    type="number"
                    step="0.01"
                    name="luas_ruang"
                    placeholder="84.82"
                    value={formData.luas_ruang}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/16</small>
                  Kapasitas Ruang
                </div>

                <div className="field-input">
                  <input
                    type="number"
                    name="kapasitas_ruang"
                    placeholder="32"
                    value={formData.kapasitas_ruang}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/17</small>
                  Judul Buku Pustaka
                </div>

                <div className="field-input">
                  <input
                    name="judul_buku_pustaka"
                    placeholder="Alat Kesehatan & Penyelidikan"
                    value={formData.judul_buku_pustaka}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/18</small>
                  Mata Pelajaran
                </div>

                <div className="field-input">
                  <input
                    name="mata_pelajaran"
                    placeholder="Ilmu Pengetahuan Alam"
                    value={formData.mata_pelajaran}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/19</small>
                  Judul Buku
                </div>

                <div className="field-input">
                  <input
                    name="judul_buku"
                    placeholder="Buku IPA SMP"
                    value={formData.judul_buku}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/20</small>
                  Jumlah Buku
                </div>

                <div className="field-input">
                  <input
                    type="number"
                    name="jumlah_buku"
                    placeholder="50"
                    value={formData.jumlah_buku}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field-label">
                  <small>/21</small>
                  Riwayat Bantuan
                </div>

                <div className="field-input">
                  <select
                    name="riwayat_bantuan"
                    value={formData.riwayat_bantuan}
                    onChange={handleChange}
                    required
                  >
                    <option value="Belum Pernah">Belum Pernah</option>
                    <option value="Pernah > 3 Tahun">
                      Pernah &gt; 3 Tahun
                    </option>
                    <option value="Pernah < 3 Tahun">
                      Pernah &lt; 3 Tahun
                    </option>
                  </select>
                </div>
              </div>

              <div className="buttons">
                <button
                  type="button"
                  className="btn-light"
                  onClick={prevStep}
                >
                  ← KEMBALI FORM 1
                </button>

                <button className="form-submit" type="submit">
                  SIMPAN DATA
                </button>
              </div>
            </>
          )}
        </form>
      </main>

      <Footer />
    </div>
  );
}