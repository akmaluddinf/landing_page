import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faXTwitter, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import { faTimes, faPenToSquare, faCertificate, faStethoscope, faGraduationCap, faBriefcase, faExchangeAlt, faUserTie, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import debounce from "lodash.debounce";
import Slider from 'react-slick';

const LandingPage = () => {

  const [nama, setNama] = useState('');
  const [nomorWhatsapp, setNomorWhatsapp] = useState('');
  // const [sekolahOptions, setSekolahOptions] = useState([]);
  const [selectedSekolah, setSelectedSekolah] = useState('');
  const [selectedSekolahLabel, setSelectedSekolahLabel] = useState('');
  const [selectedSekolahTag, setSelectedSekolahTag] = useState('');

  const apiUrl1 = process.env.REACT_APP_API_URL_1;
  const apiUrl2 = process.env.REACT_APP_API_URL_2;

  // Dummy data testimoni
  const testimonials = [
    {
      nama: "LAILA SOFWAN",
      fakultas: "Fakultas Hukum (FH)",
      foto: "/pmbleads/fh.jpg",
      pesan: "Kuliah di Fakultas Hukum UNPAS bikin saya lebih peka terhadap keadilan dan berani bersuara. Dosen-dosennya tegas tapi suportif banget!",
    },
    {
      nama: "ANNISA FITRI WIDIESTA",
      fakultas: "Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)",
      foto: "/pmbleads/fisip.jpg",
      pesan: "Belajar di FISIP UNPAS itu nggak cuma teori, tapi juga praktik langsung lewat berbagai event dan kegiatan sosial. Bener-bener nambah wawasan dan relasi!",
    },
    {
      nama: "ARDHIA PRAMESTI",
      fakultas: "Fakultas Teknik (FT)",
      foto: "/pmbleads/ft.jpg",
      pesan: "Fakultas Teknik UNPAS ngajarin saya untuk problem solving dan kerja tim. Nggak cuma soal mesin dan bangunan, tapi juga gimana berpikir kritis dan inovatif.",
    },
    {
      nama: "NUR SANIYAH",
      fakultas: "Fakultas Ekonomi dan Bisnis (FEB)",
      foto: "/pmbleads/feb.jpg",
      pesan: "Kuliah di FEB UNPAS bikin saya ngerti gimana dunia bisnis berjalan. Banyak banget dosen yang praktisi, jadi ilmunya langsung nyambung ke dunia kerja!",
    },
    {
      nama: "LISMAWATI SAEPUDIN",
      fakultas: "Fakultas Keguruan dan Ilmu Pendidikan (FKIP)",
      foto: "/pmbleads/fkip.jpg",
      pesan: "FKIP UNPAS ngajarin saya arti jadi pendidik sejati. Ilmunya aplikatif banget, ditambah pengalaman microteaching yang bikin siap terjun ke sekolah!",
    },
    {
      nama: "RENITA RAHMI NUR ISLAMI",
      fakultas: "Fakultas Ilmu Seni dan Sastra (FISS)",
      foto: "/pmbleads/fiss.jpg",
      pesan: "Sebagai mahasiswa seni, saya ngerasa dapet ruang bebas berekspresi. Dosen-dosennya apresiatif dan selalu dukung ide-ide kreatif mahasiswa 🎨.",
    },
    {
      nama: "ADIEKA RADITYA PUTRA DJATNIKA",
      fakultas: "Fakultas Kedokteran (FK)",
      foto: "/pmbleads/fk.jpg",
      pesan: "Perkuliahan di Fakultas Kedokteran UNPAS sangat menantang tapi seru! Fasilitas lab lengkap dan suasana belajar yang kolaboratif bikin prosesnya menyenangkan.",
    },
    {
      nama: "AHMAD DANI AKBAR WIJAYA",
      fakultas: "Program Pascasarjana (S2 - Magister Pendidikan Bahasan dan Sastra Indonesia)",
      foto: "/pmbleads/pbsi.jpg",
      pesan: "Program Pascasarjana UNPAS memberi pengalaman akademik dan profesional yang seimbang. Diskusinya seru banget, banyak insight praktis dari dosen dan teman sekelas!",
    },
    {
      nama: "HANA KRISNAMURTI",
      fakultas: "Program Pascasarjana (S3 - Doktor Ilmu Hukum)",
      foto: "/pmbleads/dih.jpg",
      pesan: "Belajar di Pascasarjana UNPAS bikin saya bisa mengaitkan teori hukum dengan kasus nyata. Lingkungannya akademis tapi tetap hangat dan suportif ❤️.",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

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

  // const handleChangeSekolah = (selectedOption) => {
  //   setSelectedSekolah(selectedOption ? selectedOption.value : null);
  // };

  const handleChangeSekolah = (selectedOption) => {
    // console.log(selectedOption);
    if (selectedOption) {
      const sekolahValue = selectedOption.value;
      const sekolahLabel = selectedOption.label;
      // Konversi ke huruf kecil + hapus karakter spesial
      const sekolahTag = sekolahValue.toLowerCase().replace(/[^a-z0-9]/g, ''); // hanya huruf a-z dan angka 0-9 yang tersisa
      setSelectedSekolah(sekolahValue);
      setSelectedSekolahLabel(sekolahLabel);
      setSelectedSekolahTag(sekolahTag);
    } else {
      setSelectedSekolah('');
      setSelectedSekolahLabel('');
      setSelectedSekolahTag('');
    }
  };

  const handleResetFormData = () => {
    setNama('');
    setNomorWhatsapp('');
    setSelectedSekolah('');
    setSelectedSekolahTag('');
  };

  const loadSekolahOptions = useCallback(async (inputValue) => {
    if (inputValue.length < 3) return [];
    try {
      const res = await axios.post(apiUrl1, { q: inputValue });

      if (res.data.success) {
        return res.data.sekolah.map((item) => ({
          value: item.Nama,
          label: `${item.NPSN} - ${item.Nama} - (${item.Kabupaten})`,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching sekolah:", error);
      return [];
    }
  }, [apiUrl1]);

  // Gunakan useMemo, bukan useCallback, agar debounce tidak berubah di setiap render
  const debouncedFetchSekolah = useMemo(
    () =>
      debounce((inputValue, callback) => {
        loadSekolahOptions(inputValue).then(callback);
      }, 1000),
    [loadSekolahOptions]
  );

  useEffect(() => {
    return () => {
      debouncedFetchSekolah.cancel(); // batalkan debounce jika komponen unmount
    };
  }, [debouncedFetchSekolah]);

  const handleSubmit = async () => {
    if (!nama || !nomorWhatsapp || !selectedSekolah) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Harap isi nama, nomor whatsApp, dan sekolah terlebih dahulu!',
        confirmButtonColor: '#198754'
      });
      return;
    }

    // ===== Validasi & Normalisasi Nomor WhatsApp =====
    let nomorValid = nomorWhatsapp.trim();

    if (nomorValid.startsWith("0")) {
      nomorValid = "+62" + nomorValid.slice(1);
    } else if (nomorValid.startsWith("62")) {
      nomorValid = "+" + nomorValid;
    } else if (!nomorValid.startsWith("+62")) {
      Swal.fire({
        icon: "error",
        title: "Format Tidak Valid",
        text: "Nomor WhatsApp harus dimulai dengan 0 atau 62",
        confirmButtonColor: "#198754",
      });
      return;
    }

    // ===== Validasi panjang setelah normalisasi =====
    const angkaOnly = nomorValid.replace(/^\+62/, "0");
    if (angkaOnly.length < 10 || angkaOnly.length > 13) {
      Swal.fire({
        icon: "error",
        title: "Nomor Tidak Valid",
        text: "Nomor WhatsApp harus memiliki 10–13 digit.",
        confirmButtonColor: "#198754",
      });
      return;
    }

    try {
      const response = await axios.post(apiUrl2, {
        nama,
        nomorWhatsapp: nomorValid,
        sekolah: selectedSekolah,
        sekolahTag: selectedSekolahTag
      });

      const result = response.data;

      if (result.success) {
        Swal.fire({
          icon: 'success',
          text: 'Terima kasih! Data kamu berhasil dikirim 😊',
          confirmButtonColor: '#198754'
        });

        // Tutup modal
        const modalEl = document.getElementById("modalForm");
        const modal = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
        modal.hide();

        window.location.href = "https://situ2.unpas.ac.id/spmbfront/jalur-seleksi";

        // Reset form
        handleResetFormData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: result.message,
          confirmButtonColor: "#198754",
        });
      }

    } catch (error) {
      // Tangani error dari axios
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
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "99vh",
          backgroundImage: "url('/pmbleads/gedungsate.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
          backgroundPosition: "top left",
          zIndex: -1
        }}
      ></div>
      <div className="container py-5 text-center">
        {/* Logo */}
        <div className="mb-3">
          <img
            src="/pmbleads/logounpasberdampak.png"
            alt="Logo UNPAS"
            width="300px"
            className="mb-2"
          />
        </div>

        {/* Judul */}
        <h3 className="fw-bold mb-3">
          Bikin Cerita Sukses Versimu, Mulai di Sini 🔥
        </h3>
        <p className="text-muted mb-4">
          “Tempat Dimana Generasi Hebat Lahir dan Berkarya”
        </p>

        {/* Tombol Brosur */}
        <button className="btn btn-main mb-4" data-bs-toggle="modal" data-bs-target="#modalForm">
          Daftar Sekarang
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
        {/* <div className="card-custom my-4">
        <h5 className="fw-bold">Apa Kata Mereka 💬</h5>
        <p className="testimonial mt-2">
          “Kuliah di UNPAS itu seru! Banyak event & peluang magang.”
        </p>
        <p className="text-muted">– Rani, FT 2023</p>
      </div> */}

        {/* Jalur */}
        <div className='row'>
          <div className='col-md-12'>
            <section className="mt-5 mb-5">
              <h4 className="fw-bold mb-4 text-center">🛤️ Jalur Pendaftaran UNPAS</h4>
              <p className="text-center mb-5 text-muted">
                UNPAS menyediakan berbagai jalur pendaftaran yang bisa kamu pilih sesuai latar belakang dan kebutuhanmu.
              </p>

              <div className="row g-4">
                {/* USM */}
                <div className="col-md-3 col-sm-6 col-12">
                  <div className="jalur-card">
                    {/* <FontAwesomeIcon icon={faPenToSquare} className="jalur-icon text-primary" /> */}
                    <img src="/pmbleads/icon_pmb_usm_unpas.png" alt="USM" style={{ width: "50px" }} />
                    <h5 className="mt-3 fw-bold">USM (Ujian Saringan Masuk)</h5>
                    <p className="text-muted">
                      Jalur seleksi mandiri melalui ujian tertulis yang diselenggarakan langsung oleh Universitas Pasundan.
                    </p>
                  </div>
                </div>

                {/* PMDK */}
                <div className="col-md-3 col-sm-6 col-12">
                  <div className="jalur-card">
                    {/* <FontAwesomeIcon icon={faCertificate} className="jalur-icon text-success" /> */}
                    <img src="/pmbleads/icon_pmb_pmdk_unpas.png" alt="PMDK" style={{ width: "50px" }} />
                    <h5 className="mt-3 fw-bold">PMDK</h5>
                    <p className="text-muted">
                      Jalur tanpa ujian bagi siswa berprestasi akademik maupun non-akademik dari sekolah asal.
                    </p>
                  </div>
                </div>

                {/* Kedokteran */}
                <div className="col-md-3 col-sm-6 col-12">
                  <div className="jalur-card">
                    {/* <FontAwesomeIcon icon={faStethoscope} className="jalur-icon text-danger" /> */}
                    <img src="/pmbleads/icon_pmb_kedokteran_unpas.png" alt="KEDOKTERAN" style={{ width: "50px" }} />
                    <h5 className="mt-3 fw-bold">Kedokteran</h5>
                    <p className="text-muted">
                      Jalur khusus Fakultas Kedokteran dengan seleksi akademik, psikotes, dan wawancara terintegrasi.
                    </p>
                  </div>
                </div>

                {/* RPL Transfer */}
                <div className="col-md-3 col-sm-6 col-12">
                  <div className="jalur-card">
                    {/* <FontAwesomeIcon icon={faExchangeAlt} className="jalur-icon text-info" /> */}
                    <img src="/pmbleads/icon_pmb_rpl_unpas.png" alt="RPL" style={{ width: "50px" }} />
                    <h5 className="mt-3 fw-bold">RPL Transfer</h5>
                    <p className="text-muted">
                      Jalur untuk mahasiswa pindahan dari perguruan tinggi lain dengan pengakuan mata kuliah sebelumnya.
                    </p>
                  </div>
                </div>

                {/* RPL Perolehan */}
                <div className="col-md-3 col-sm-6 col-12">
                  <div className="jalur-card">
                    {/* <FontAwesomeIcon icon={faBriefcase} className="jalur-icon text-warning" /> */}
                    <img src="/pmbleads/icon_pmb_rpl_unpas.png" alt="RPL" style={{ width: "50px" }} />
                    <h5 className="mt-3 fw-bold">RPL Perolehan</h5>
                    <p className="text-muted">
                      Jalur pengakuan atas pengalaman kerja, pelatihan, atau pembelajaran nonformal yang relevan.
                    </p>
                  </div>
                </div>

                {/* Pascasarjana */}
                <div className="col-md-3 col-sm-6 col-12">
                  <div className="jalur-card">
                    {/* <FontAwesomeIcon icon={faUserTie} className="jalur-icon text-secondary" /> */}
                    <img src="/pmbleads/icon_pmb_pascasarjana_unpas.png" alt="RPL" style={{ width: "50px" }} />
                    <h5 className="mt-3 fw-bold">Pascasarjana</h5>
                    <p className="text-muted">
                      Jalur khusus untuk program Magister dan Doktor bagi lulusan S1 yang ingin melanjutkan studi.
                    </p>
                  </div>
                </div>

                {/* Alumni */}
                <div className="col-md-3 col-sm-6 col-12">
                  <div className="jalur-card">
                    {/* <FontAwesomeIcon icon={faChalkboardTeacher} className="jalur-icon text-primary" /> */}
                    <img src="/pmbleads/icon_pmb_alumni_unpas.png" alt="RPL" style={{ width: "50px" }} />
                    <h5 className="mt-3 fw-bold">Alumni Pasundan</h5>
                    <p className="text-muted">
                      Jalur untuk program pendidikan profesi seperti Akuntansi, Hukum, atau Keguruan.
                    </p>
                  </div>
                </div>

                {/* KIP-Kuliah */}
                <div className="col-md-3 col-sm-6 col-12">
                  <div className="jalur-card">
                    {/* <FontAwesomeIcon icon={faGraduationCap} className="jalur-icon text-success" /> */}
                    <img src="/pmbleads/icon_pmb_kip_unpas.png" alt="RPL" style={{ width: "50px" }} />
                    <h5 className="mt-3 fw-bold">KIP-Kuliah</h5>
                    <p className="text-muted">
                      Jalur beasiswa penuh dari pemerintah bagi calon mahasiswa berprestasi dari keluarga kurang mampu.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>


        {/* Formulir */}

        <div className='row align-items-stretch flex-column flex-md-row' style={{ marginTop: "50px" }}>
          <div className='col-md-4 d-flex mb-4 mb-md-0'>
            <div className="w-100 d-flex flex-column justify-content-between">
              <h5 className="fw-bold mb-3">
                Daftar Sekarang dan Temukan Kampus Impianmu
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
                <div className="input-group mb-3 position-relative w-100">
                  <AsyncSelect
                    className="w-100"
                    cacheOptions
                    loadOptions={debouncedFetchSekolah}
                    value={selectedSekolah ? { value: selectedSekolah, label: selectedSekolahLabel } : null}
                    defaultOptions={false} // Tidak tampilkan apa-apa sebelum user mengetik
                    onChange={handleChangeSekolah}
                    placeholder="Nama sekolah / NPSN"
                    isClearable
                    styles={{
                      control: (base) => ({
                        ...base,
                        textAlign: 'left',
                        borderRadius: '10px',
                        borderColor: '#ced4da',
                        minHeight: '38px',
                      }),
                      singleValue: (base) => ({
                        ...base,
                        textAlign: 'left',
                      }),
                      input: (base) => ({
                        ...base,
                        textAlign: 'left',
                      }),
                      placeholder: (base) => ({
                        ...base,
                        textAlign: 'left',
                      }),
                      menu: (base) => ({
                        ...base,
                        textAlign: 'left', // pastikan isi dropdown rata kiri
                      }),
                      menuList: (base) => ({
                        ...base,
                        textAlign: 'left',
                      }),
                      option: (base, state) => ({
                        ...base,
                        textAlign: 'left',
                        backgroundColor: state.isFocused ? '#f8f9fa' : 'white',
                        color: 'black',
                        cursor: 'pointer',
                      }),
                    }}
                  />
                </div>

                <button type="button" className="btn btn-main w-100" onClick={handleSubmit}>
                  Daftar Sekarang
                </button>
              </form>
            </div>

          </div>
          <div className='col-md-8 d-flex'>
            <div className="card-custom mb-4 w-100 h-100 d-flex align-items-center justify-content-center">
              <img src="/pmbleads/pmb.png" alt="PMB" className="img-fluid rounded" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <div className="card-custom mt-5">
              <h4 className="fw-bold mb-4 text-center">❓ Pertanyaan yang Sering Diajukan (FAQ) Seputar PMB</h4>

              <div className="accordion" id="faqAccordion">
                {/* FAQ 1 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Kapan periode pendaftaran mahasiswa baru dimulai?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Pendaftaran mahasiswa baru Universitas Pasundan dibuka sepanjang tahun dengan beberapa gelombang penerimaan.
                      Informasi lengkap tentang jadwal tiap gelombang dapat dilihat di website resmi PMB UNPAS.
                    </div>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Bagaimana cara mendaftar secara online?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Kamu cukup mengisi formulir pendaftaran secara online di laman resmi PMB UNPAS,
                      kemudian mengunggah berkas yang diperlukan dan melakukan pembayaran biaya pendaftaran sesuai instruksi yang tertera.
                    </div>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Apa saja berkas yang perlu disiapkan untuk pendaftaran?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Dokumen yang biasanya dibutuhkan antara lain:
                      fotokopi ijazah atau surat keterangan lulus, KTP, pas foto terbaru,
                      serta bukti pembayaran biaya pendaftaran. Pastikan semua berkas discan dengan jelas.
                    </div>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Apakah tersedia jalur beasiswa untuk mahasiswa baru?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Ya! UNPAS menyediakan berbagai jalur beasiswa seperti Beasiswa Prestasi Akademik, Beasiswa Bidikmisi,
                      serta beasiswa dari mitra pemerintah dan swasta. Informasi lengkap bisa kamu lihat di bagian Beasiswa di website PMB.
                    </div>
                  </div>
                </div>

                {/* FAQ 5 */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Bagaimana jika saya kesulitan saat proses pendaftaran?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Tenang, tim PMB UNPAS siap membantu kamu!
                      Kamu bisa menghubungi layanan bantuan melalui WhatsApp, email, atau datang langsung ke kampus pusat UNPAS untuk pendampingan pendaftaran.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-6'>
            <div className="card-custom mt-5">
              <h4 className="fw-bold mb-4 text-center">Biaya Kuliah 🧮</h4>
              <br />
              {/* <div className="mt-5 mb-5">
            <h4 className="fw-bold mb-4 text-center">Biaya Kuliah 🧮</h4> */}
              <div>
                <div className="ratio ratio-16x9">
                  <iframe
                    src="/pmbleads/brosur.pdf" // ganti dengan path file PDF kamu
                    title="Brosur PMB UNPAS"
                    width="100%"
                    height="600px"
                  ></iframe>
                </div>
                <div className="text-center mt-3">
                  <a
                    href="/pmbleads/brosur.pdf" // ganti juga dengan path file PDF kamu
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-main"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-custom my-4">
          <h5 className="fw-bold mb-3">Apa Kata Mereka 💬</h5>
          <Slider {...sliderSettings}>
            {testimonials.map((item, index) => (
              <div key={index} className="testimonial-slide">
                <img src={item.foto} alt={item.nama} />
                <p className="testimonial-text">“{item.pesan}”</p>
                <p className="testimonial-name">{item.nama}</p>
                <p className="testimonial-fakultas">{item.fakultas}</p>
              </div>
            ))}
          </Slider>
        </div>


        {/* <!-- Modal add data --> */}
        <div className="modal fade" id="modalForm" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Data Endpoint</h1> */}
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Daftar Sekarang
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
                <div className="input-group mb-3 position-relative w-100">
                  <AsyncSelect
                    className="w-100"
                    cacheOptions
                    loadOptions={debouncedFetchSekolah}
                    value={selectedSekolah ? { value: selectedSekolah, label: selectedSekolahLabel } : null}
                    defaultOptions={false} // Tidak tampilkan apa-apa sebelum user mengetik
                    onChange={handleChangeSekolah}
                    placeholder="Nama sekolah / NPSN"
                    isClearable
                    styles={{
                      control: (base) => ({
                        ...base,
                        textAlign: 'left',
                        borderRadius: '10px',
                        borderColor: '#ced4da',
                        minHeight: '38px',
                      }),
                      singleValue: (base) => ({
                        ...base,
                        textAlign: 'left',
                      }),
                      input: (base) => ({
                        ...base,
                        textAlign: 'left',
                      }),
                      placeholder: (base) => ({
                        ...base,
                        textAlign: 'left',
                      }),
                      menu: (base) => ({
                        ...base,
                        textAlign: 'left', // pastikan isi dropdown rata kiri
                      }),
                      menuList: (base) => ({
                        ...base,
                        textAlign: 'left',
                      }),
                      option: (base, state) => ({
                        ...base,
                        textAlign: 'left',
                        backgroundColor: state.isFocused ? '#f8f9fa' : 'white',
                        color: 'black',
                        cursor: 'pointer',
                      }),
                    }}
                  />
                </div>

              </div>
              <div className="modal-footer">
                {/* <p>tag:{selectedSekolahTag}</p> */}
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleResetFormData}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <p className="mb-3">
            Universitas Pasundan - SPDPTIK, copyright &copy; 2025 ❤️
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
    </>
  )
}

export default LandingPage