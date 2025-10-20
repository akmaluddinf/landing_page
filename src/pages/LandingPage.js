import React, { useState } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faXTwitter, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {

  const [nama, setNama] = useState('');
  const [nomorWhatsapp, setNomorWhatsapp] = useState('');

  const handleNamaChange = (e) => {
    console.log(e.target.value);
    setNama(e.target.value);
  };

  const handleNomorWhatsappChange = (e) => {
    console.log(e.target.value);
    setNomorWhatsapp(e.target.value);
  };

  return (
    <div className="container py-5 text-center">
      {/* Logo */}
      <div className="mb-3">
        <img
          src="/landing_page/logo_unpas.png"
          alt="Logo UNPAS"
          width="80"
          className="mb-2"
        />
      </div>

      {/* Judul */}
      <h3 className="fw-bold mb-3">
        Langkah Awal Menuju Kampus Impianmu 🎓
      </h3>
      <p className="text-muted mb-4">
        Cari kampus yang seru, unggul, dan banyak peluang beasiswa? UNPAS
        jawabannya!
      </p>

      {/* Tombol Brosur */}
      <button className="btn btn-main mb-4" data-bs-toggle="modal" data-bs-target="#modalForm">
        📩 Dapatkan Brosur Digital
      </button>

      {/* Fitur */}
      <div className="row justify-content-center">
        {[
          "Akreditasi Unggul A",
          "Banyak Beasiswa",
          "Lokasi Strategis",
          "Dosen Ramah Mahasiswa",
          "Link Magang Nasional",
          "Lulusan Kompetitif",
        ].map((item, index) => (
          <div key={index} className="col-6 col-md-4">
            <div className="feature-box">{item}</div>
          </div>
        ))}
      </div>

      {/* Testimoni */}
      <div className="card-custom my-4">
        <h5 className="fw-bold">Apa Kata Mereka 💬</h5>
        <p className="testimonial mt-2">
          “Kuliah di UNPAS itu seru! Banyak event & peluang magang.”
        </p>
        <p className="text-muted">– Rani, FT 2023</p>
      </div>

      {/* Formulir */}
      <div className="card-custom mb-4">
        <h5 className="fw-bold mb-3">
          Isi Data Kamu Untuk Dapatkan Brosur 📩
        </h5>
        <form>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={handleNamaChange}
          />
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Nomor WhatsApp"
            value={nomorWhatsapp}
            onChange={handleNomorWhatsappChange}
          />
          <button type="button" className="btn btn-main w-100">
            Kirim & Dapatkan Brosur Sekarang
          </button>
        </form>
      </div>

      {/* <!-- Modal Add Data Wisuda --> */}
      <div className="modal fade" id="modalForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Data Endpoint</h1> */}
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Isi Data Kamu Untuk Dapatkan Brosur 📩
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='row'>
                <div className='col-12' style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                  <div className="input-group mb-3" style={{ width: '100%', marginTop: '0px' }}>
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="nama" placeholder="nama" value={nama} onChange={handleNamaChange} />
                      <label htmlFor="nama">Nama<span className='text-danger'>*</span></label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-12' style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
                  <div className="input-group mb-3" style={{ width: '100%', marginTop: '-20px' }}>
                    <div className="form-floating mb-3">
                      <input type="number" className="form-control" id="nomorWhatsapp" placeholder="nomorWhatsapp" value={nomorWhatsapp} onChange={handleNomorWhatsappChange} />
                      <label htmlFor="nim">Nomor Whatsapp<span className='text-danger'>*</span></label>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p className="mb-3">
          UNPAS — Kampus Unggul, Dekat di Hati Mahasiswa ❤️
        </p>
        <div className="social-icons d-flex justify-content-center gap-3">
          <a href="https://www.instagram.com/univ_pasundan" className="text-dark social-link" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://www.facebook.com/universitaspasundan" className="text-dark social-link" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="https://x.com/univ_pasundan" className="text-dark social-link" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} size="lg" />
          </a>
          <a href="https://www.tiktok.com/@univ_pasundan" className="text-dark social-link" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTiktok} size="lg" />
          </a>
          <a href="https://www.youtube.com/@UniversitasPasundanOfficial" className="text-dark social-link" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} size="lg" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage