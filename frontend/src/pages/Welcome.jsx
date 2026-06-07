import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Welcome() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-left">
            <div className="mini-title">
              /01 — PROJEK STRUKTUR DATA <span>KELOMPOK 10</span>
            </div>

            <h1>
              Sistem <br />
              Prioritas <span>Alokasi Sumber Daya Sekolah Menggunakan</span> <br />
              Metode Max-Heap.
            </h1>

            <p>
                Sistem ini membantu mengurutkan prioritas sekolah berdasarkan kebutuhan
                sarana pendidikan menggunakan algoritma Max-Heap. Penilaian dilakukan
                berdasarkan jumlah siswa, kebutuhan Laboratorium IPA, kebutuhan TIK,
                kebutuhan buku perpustakaan, kondisi sarana prasarana, jarak sekolah,
                dan riwayat bantuan sebelumnya.
            </p>

            <div className="buttons">
              <Link to="input" className="btn-dark">
                INPUT DATA SEKOLAH →
              </Link>

              <Link to="/hasil" className="btn-light">
                LIHAT PRIORITAS →
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="image-card">
              <h5 className="label">FIG.01 / MAX-HEAP TREE</h5>

              <img
                src="https://static.prod-images.emergentagent.com/jobs/54718a06-8b66-47a0-8264-8137f7836d90/images/ff6e7d165ccd137945b8e159e942da700ecb03282468124ac07aa9da6cadcc9a.png"
                alt="Max Heap Tree"
              />

              <div className="root-label">ROOT = HIGHEST PRIORITY</div>

              <div className="card-footer">
                <div>
                  <small>TIME</small>
                  <h2>O(log n)</h2>
                </div>

                <div>
                  <small>SORT</small>
                  <h2>Heapsort</h2>
                </div>

                <div>
                  <small>STRUKTUR</small>
                  <h2>Binary</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="marquee-strip">
          <span>MAX-HEAP</span>
          <span>DAK</span>
          <span>SKOR PRIORITAS</span>
          <span>ALOKASI SUMBER DAYA</span>
        </section>

        <section className="algorithm-section">
          <span className="section-code">/02 — ALGORITMA</span>

          <h2>
            Bagaimana <br />
            Max-Heap <br />
            Bekerja.
          </h2>

          <div className="algorithm-grid">
            <div className="algorithm-card">
              <small>01</small>
              <h3>Insert ke Heap</h3>
              <p>
                Setiap data sekolah masuk ke struktur heap binary lengkap.
                Operasi heapify-up O(log n) memastikan invariant heap.
              </p>
            </div>

            <div className="algorithm-card">
              <small>02</small>
              <h3>Skor Urgensi</h3>
              <p>
                Skor dihitung dari beberapa faktor terbobot, yaitu jumlah siswa,
                kebutuhan Lab IPA, kebutuhan TIK, kebutuhan buku perpustakaan,
                kondisi sarana prasarana, jarak ke kota, dan riwayat bantuan.
              </p>
            </div>

            <div className="algorithm-card">
              <small>03</small>
              <h3>Root = Prioritas</h3>
              <p>
                Sekolah pada posisi root heap memiliki skor prioritas tertinggi
                berdasarkan kebutuhan sarana pendidikan dan akan muncul pertama
                dalam daftar rekomendasi.
              </p>
            </div>

            <div className="algorithm-card">
              <small>04</small>
              <h3>Heapsort</h3>
              <p>
                Ekstraksi berurutan dari root menghasilkan daftar prioritas
                terurut menurun secara dinamis dan transparan.
              </p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="team-head">
            <h2>Kelompok 10.</h2>
            <span>03 ANGGOTA / 01 PROJEK</span>
          </div>

          <div className="team-grid">
            <div className="team-card active">
              <small>/01</small>
              <h3>Gustavolta <br /> Khizqi Ismail</h3>
              <div className="team-meta">
                <span>NIM<br />25032014025</span>
                <span>ALGORITHM<br />LEAD</span>
              </div>
            </div>

            <div className="team-card">
              <small>/02</small>
              <h3>M. Fajar <br /> Novyanto</h3>
              <div className="team-meta">
                <span>NIM<br />25032014084</span>
                <span>FRONTEND<br />ENGINEER</span>
              </div>
            </div>

            <div className="team-card">
              <small>/03</small>
              <h3>Angga Farel <br /> Kusuma</h3>
              <div className="team-meta">
                <span>NIM<br />25032014017</span>
                <span>IMPLEMENTASI<br /></span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div>/ MULAI PRIORITAS</div>
          <h2>
            Urutkan kebutuhan sekolah. <br />
            <span>Dukung pemerataan pendidikan.</span>
          </h2>

          <Link to="/input" className="cta-button">
            INPUT DATA SEKARANG →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}