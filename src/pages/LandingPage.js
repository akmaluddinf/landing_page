import React, { useState, useEffect } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faXTwitter, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const LandingPage = () => {

  const [nama, setNama] = useState('');
  const [nomorWhatsapp, setNomorWhatsapp] = useState('');

  //fungsi listerner modal
  useEffect(() => {
    const handleModalCleanup = () => {
      document.body.classList.remove("modal-open");
      document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
      document.body.style.overflow = "auto";
    };

    // pasang listener ke semua modal yang ada
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modalEl) => {
      modalEl.addEventListener("hidden.bs.modal", handleModalCleanup);
    });

    return () => {
      modals.forEach((modalEl) => {
        modalEl.removeEventListener("hidden.bs.modal", handleModalCleanup);
      });
    };
  }, []);

  const handleNamaChange = (e) => {
    // console.log(e.target.value);
    setNama(e.target.value);
  };

  const handleNomorWhatsappChange = (e) => {
    // console.log(e.target.value);
    setNomorWhatsapp(e.target.value);
  };

  const handleResetFormData = () => {
    setNama('');
    setNomorWhatsapp('');
  };

  const handleSubmit = async () => {
    if (!nama || !nomorWhatsapp) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Harap isi nama dan nomor WhatsApp terlebih dahulu!',
        confirmButtonColor: '#198754'
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/submitBrosur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, nomorWhatsapp }),
      });

      const result = await response.json();
      if (result.success) {
        Swal.fire({
          icon: 'success',
          text: 'Terima kasih! Data kamu berhasil dikirim 😊',
          confirmButtonColor: '#198754'
        });

        // tutup modal
        const modalEl = document.getElementById("modalForm");
        const modal = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
        modal.hide();

        // Trigger download brosur
        const link = document.createElement("a");
        link.href = process.env.PUBLIC_URL + "/brosur-unpas.pdf";
        link.download = "brosur-unpas.pdf"; // nama file hasil download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);


      } else {
        throw new Error("Gagal menyimpan data");
      }

      // Reset form
      handleResetFormData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat mengirim data.",
        confirmButtonColor: '#198754'
      });
    }
  };

  const clearSearchNama = () => {
    setNama('');
  };

  const clearSearchNomorWhatsapp = () => {
    setNomorWhatsapp('');
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
          <div className="input-group mb-3 position-relative w-100">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Nama"
              value={nama}
              onChange={handleNamaChange}
            />
            {nama && (
              <span className="input-group-text clear-icon" onClick={clearSearchNama} style={{ cursor: 'pointer', borderRadius: "0px 10px 10px 0px" }}>
                <FontAwesomeIcon
                  icon={faTimes}
                  data-toggle="tooltip"
                  title="Hapus Nama"
                  data-placement="top"
                />
              </span>
            )}
          </div>
          <div className="input-group mb-3 position-relative w-100">
            <input
              type="number"
              className="form-control custom-input"
              placeholder="Nomor Whatsapp"
              value={nomorWhatsapp}
              onChange={handleNomorWhatsappChange}
            />
            {nomorWhatsapp && (
              <span className="input-group-text clear-icon" onClick={clearSearchNomorWhatsapp} style={{ cursor: 'pointer', borderRadius: "0px 10px 10px 0px" }}>
                <FontAwesomeIcon
                  icon={faTimes}
                  data-toggle="tooltip"
                  title="Hapus Nomor Whatsapp"
                  data-placement="top"
                />
              </span>
            )}
          </div>

          <button type="button" className="btn btn-main w-100" onClick={handleSubmit}>
            Kirim & Dapatkan Brosur Sekarang
          </button>
        </form>
      </div>

      {/* <!-- Modal add data --> */}
      <div className="modal fade" id="modalForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Data Endpoint</h1> */}
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Isi Data Kamu Untuk Dapatkan Brosur 📩
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleResetFormData}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3 position-relative w-100">
                <input type="text" className="form-control custom-input" placeholder="Nama" value={nama} onChange={handleNamaChange} />
                {nama && (
                  <span className="input-group-text clear-icon" onClick={clearSearchNama} style={{ cursor: 'pointer', borderRadius: "0px 10px 10px 0px" }}>
                    <FontAwesomeIcon icon={faTimes} data-toggle="tooltip" title="Hapus Nama" data-placement="top" />
                  </span>
                )}
              </div>
              <div className="input-group mb-3 position-relative w-100">
                <input type="number" className="form-control custom-input" placeholder="Nomor Whatsapp" value={nomorWhatsapp} onChange={handleNomorWhatsappChange} />
                {nomorWhatsapp && (
                  <span className="input-group-text clear-icon" onClick={clearSearchNomorWhatsapp} style={{ cursor: 'pointer', borderRadius: "0px 10px 10px 0px" }}>
                    <FontAwesomeIcon icon={faTimes} data-toggle="tooltip" title="Hapus Nomor Whatsapp" data-placement="top" />
                  </span>
                )}
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleResetFormData}>Cancel</button>
              <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
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