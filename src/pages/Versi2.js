import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Versi2 = () => {

  const [nim, setNim] = useState('');
  const [found, setFound] = useState(false);
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State untuk modal

  const apiUrl1 = process.env.REACT_APP_API_URL_1;
  const apiUrl2 = process.env.REACT_APP_API_URL_2;

  const closeModal = () => {
    setShowModal(false); // Tutup modal
  };

  const handleNimChange = (e) => {
    setNim(e.target.value);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSearchClick = async () => {
    try {
      if (!nim) {
        Swal.fire({
          title: 'NIM TIDAK BOLEH KOSONG!',
          text: 'PESERTA WISUDA GELOMBANG II TAHUN AKADEMIK 2024/2025',
          imageUrl: '/wisuda/logo_unpas_akre_mbkm_biru.png',
          imageHeight: 100,
          imageAlt: 'Logo',
          confirmButtonColor: '#0d6efd'
        });
        return;
      }

      setLoading(true);
      const response = await axios.post(apiUrl1, { nim });
      const responseData = response.data;

      if (responseData.found) {
        setMahasiswa(responseData.mahasiswa);
        setFound(true);
        setLoading(false);
        setShowModal(true);
      } else {
        setLoading(false);
        setFound(false);
        setMahasiswa(null);
        setShowModal(false);
        Swal.fire({
          title: 'NIM TIDAK TERDAFTAR!',
          text: 'PESERTA WISUDA GELOMBANG II TAHUN AKADEMIK 2024/2025',
          imageUrl: '/wisuda/logo_unpas_akre_mbkm_biru.png',
          imageHeight: 100,
          imageAlt: 'Logo',
          confirmButtonColor: '#0d6efd'
        });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setFound(false);
      setMahasiswa(null);
      setShowModal(false);
      Swal.fire({
        title: 'TERJADI KESALAHAN SAAT MENGAMBIL DATA!',
        text: 'PESERTA WISUDA GELOMBANG II TAHUN AKADEMIK 2024/2025',
        imageUrl: '/wisuda/logo_unpas_akre_mbkm_biru.png',
        imageHeight: 100,
        imageAlt: 'Logo',
        confirmButtonColor: '#0d6efd'
      });
    }
  };

  const handleDownloadClick = async () => {
    try {
      const response = await axios.post(apiUrl2, { nim }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `BUKTI_WISUDA_${nim}.pdf`);
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(url);
      link.remove();

      Swal.fire({
        title: `BUKTI REGISTRASI WISUDA DENGAN NIM: ${nim} BERHASIL DIUNDUH!`,
        text: 'PESERTA WISUDA GELOMBANG II TAHUN AKADEMIK 2024/2025',
        imageUrl: '/wisuda/logo_unpas_akre_mbkm_biru.png',
        imageHeight: 100,
        imageAlt: 'Logo',
        confirmButtonColor: '#0d6efd'
      });

      setNim('')
      setFound(false)
      setMahasiswa(null)
      setShowModal(false)

    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'TERJADI KESALAHAN SAAT MENGUNDUH DOKUMEN!',
        text: 'PESERTA WISUDA GELOMBANG II TAHUN AKADEMIK 2024/2025',
        imageUrl: '/wisuda/logo_unpas_akre_mbkm_biru.png',
        imageHeight: 100,
        imageAlt: 'Logo',
        confirmButtonColor: '#0d6efd'
      });
    }
  };

  const clearSearchNIM = () => {
    setNim('');
    setFound(false);
    setMahasiswa(null);
  }

  return (
    <>
      <img src='/wisuda/background_mobile.png' className='bg-image2' alt='' style={{maxWidth: "-webkit-fill-available" }} />
      <img src='/wisuda/background_desktop.png' className='bg-image' alt='' style={{maxWidth: "-webkit-fill-available" }} />
      <div className='container-fluid' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="custom-card p-5 shadow">
          <div className='row' style={{ textAlign: "center" }}>
            <div className='col-lg-12'>
              <img src='/wisuda/logo_unpas_akre_mbkm_putih.png' className="img-fluid" alt='' style={{ width: '250px', height: 'auto', marginBottom: '-20px', marginTop: '-20px' }} />
            </div>
            <div className='col-lg-12' style={{color: "white", textShadow: "1px 3px 5px black", backgroundColor: "#00000066", borderRadius: "10px" }}>
              <p style={{ marginBottom: '10px', marginTop: "10px", fontWeight: 900, fontSize: "14px" }}>PESERTA WISUDA GELOMBANG II TAHUN AKADEMIK 2024/2025</p>
            </div>
          </div>
          <form className="d-flex flex-column align-items-center" style={{paddingTop: "20px"}}>
            <div className="input-group position-relative w-100">
              <input
                type="number"
                className="form-control custom-input"
                placeholder="Masukkan NIM"
                value={nim}
                onChange={handleNimChange}
                onKeyDown={handleEnterKeyPress}
              />
              {nim && (
                <span className="input-group-text clear-icon" onClick={clearSearchNIM} style={{ cursor: 'pointer', borderRadius: "0px 10px 10px 0px" }}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    data-toggle="tooltip"
                    title="Hapus Pencarian NIM"
                    data-placement="top"
                  />
                </span>
              )}
              <div className="underline"></div>
            </div>

            <div className='row' style={{ marginTop: "10px", marginBottom: "0px" }}>
              <div className='col-lg-12' style={{ display: 'flex', justifyContent: 'center' }}>
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-dark" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status"> Loading...</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <button type="button" className="btn custom-btn mt-4 px-5 py-2" onClick={handleSearchClick}>
              Cari
            </button>
          </form>
        </div>

      </div>

      {/* <!-- Modal --> */}
      {showModal &&
        <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{ overflow: "hidden" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h5 className="modal-title">Data Wisudawan/Wisudawati</h5> */}
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* Display data if found */}
                {found && mahasiswa ? (
                  <div style={{ marginTop: '10px' }}>
                    {mahasiswa.map((mahasiswa, index) => (
                      <div className="table-responsive" key={index}>
                        <table className="table" style={{ fontSize: '11px' }}>
                          <thead>
                            <tr>
                              <th style={{ textAlign: 'center', width: '100%', fontSize: '15px', fontWeight: 900 }} scope="col" colSpan={2}>Data Wisudawan/Wisudawati</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th style={{ textAlign: 'left' }} scope="col">Nama</th>
                              <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa.nama}</th>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left' }} scope="col">Program Studi</th>
                              <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa.programStudi}</th>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left' }} scope="col">Fakultas</th>
                              <th style={{ textAlign: 'left' }} scope="col">: {mahasiswa.fakultas}</th>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left' }} scope="col">Waktu Gladi Resik</th>
                              <th style={{ textAlign: 'left' }} scope="col">: Jum'at, 23 Mei 2025, 13.30 WIB s.d. Selesai</th>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left' }} scope="col">Waktu Pelaksanaan</th>
                              <th style={{ textAlign: 'left' }} scope="col">: Sabtu, 24 Mei 2025, 07.00 WIB s.d. Selesai</th>
                            </tr>
                            <tr>
                              <th style={{ textAlign: 'left' }} scope="col">Lokasi Wisuda</th>
                              <th style={{ textAlign: 'left' }} scope="col">: Sasana Budaya Ganesha (SABUGA)</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="modal-footer" style={{ justifyContent: "center" }}>
                <button type="button" className="btn btn-success" onClick={handleDownloadClick}>Download Bukti Registrasi Wisuda</button>
              </div>
            </div>
          </div>
        </div>
      }


      <footer>
        <span className="website" style={{ fontSize: '12px' }}>
          &copy; 2025&nbsp;<b><a href="https://www.unpas.ac.id/" target="_blank" rel="noreferrer">
            Universitas Pasundan
          </a></b>&nbsp;-&nbsp;
          <b><a href="https://bti.unpas.ac.id/" target="_blank" rel="noreferrer">
            SPDPTIK
          </a></b>&nbsp;-&nbsp;
          <span>
            All Rights Reserved&nbsp;-&nbsp;
          </span>
          <b><a href="https://www.unpas.ac.id/?page_id=58414" target="_blank" rel="noreferrer">
            Privacy and Copyright
          </a></b>
          <b> - Made with <span style={{ color: 'red' }}>❤</span>
          </b>
        </span>

        <br />

        <span className="sosial-media">
          <a href="https://www.instagram.com/univ_pasundan/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} style={{ marginRight: '5px' }} />
            univ_pasundan
          </a>
          <a href="https://web.facebook.com/universitaspasundan" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebook} style={{ marginRight: '5px' }} />
            Universitas Pasundan
          </a>
          <a href="https://twitter.com/univ_pasundan" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} style={{ marginRight: '5px' }} />
            univ_pasundan
          </a>
          <a href="https://www.tiktok.com/@univ_pasundan" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTiktok} style={{ marginRight: '5px' }} />
            univ_pasundan
          </a>
          <a href="https://www.youtube.com/c/UniversitasPasundanOfficial" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faYoutube} style={{ marginRight: '5px' }} />
            Universitas Pasundan Official
          </a>
        </span>
      </footer>

    </>
  )
}

export default Versi2